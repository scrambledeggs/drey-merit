const mongoose = require('mongoose');
const Users = mongoose.model('users');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {

	//GET USERS
	app.get('/api/users', (req, res) => {
		Users.find((err,users) => {
			if (err) {
				console.log("# API GET USERS: ", err);
			}
			res.json(users);
		})
	});

	//UPDATE INCREMENT/DECREMENT USERS
	app.put("/api/users/:_id", requireLogin, function(req,res){
		Users.findByIdAndUpdate(req.params.id, {$inc:{ credits: req.body.score}}, function(err, updatedUser){
			if(err){
				// console.log(req.body.score);
				console.log("# API UPDATE USERS: ", err);
			} else {
			res.json;
			}
	});
});

};