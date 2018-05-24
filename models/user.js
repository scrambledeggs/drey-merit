const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
	googleId: String,
	googleFname: String,
	googleLname: String,
	googleEmail: String,
	credits: { type: Number, default: 10 } 
});

mongoose.model('users', userSchema);