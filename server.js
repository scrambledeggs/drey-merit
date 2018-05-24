const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const path = require('path');
const uuid = require("uuid");

//MODELS
require('./models/user');
require('./models/items');
require("./services/passport");

//mongoose.Promise = global.Promise;
//from mlab.com, the standard MongoDB URI that we created
mongoose.connect(keys.mongoURI);

//================================
//log prefix to identify errors easily
const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error:'));


//START SET UP SESSIONS for mongo
app.use(session({
	genid: function(req) {
		return uuid(); 
	},
	secret: keys.cookieKey,
	//record the session only if the user adds a product to the cart
	saveUninitialized: false,
	//session wont be resaved if it didn't change
	resave: false,
	//2 days in ms
	cookie: {maxAge: 1000*60*60*24*2},
	unset: 'destroy',
	//save a store session in mongodb and set an expression timer for it
	//when the session expires, the session data will automatically be removed from the database 
	//ttl is time to leave 
	//normally in an ecommerce you want to keep these sessions for 2 or more weeks
	store: new MongoStore({mongooseConnection: db , ttl: 2*24*60*60})
}))
//================================
//END OF SET UP SESSIONS for mongo

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
//require the ROUTES function/s and immediately calls that function
//this is a valid js syntax

require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
// require("./routes/cartRoutes")(app);

//route handling for production only. there are some routes that can be handled by express server, some can be answered by the css/js files from the build and some routes that can only be resolved by index.html
if (process.env.NODE_ENV === 'production') {
	//Express will serve up production assets
	//like our main.js file, main.css file!
	app.use(express.static('client/build'));

	//Express will serve up the index.html file
	//if it doesn't recognize the route
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//just in case a user will try to access using postman or any API development environment
app.get("*", (req, res) => {
    res.send("Ooooops! Error 404: You're trying to access a page that doesn't exist.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, process.env.IP, () => {
	console.log("BOOKY SERVER STARTED");
});


