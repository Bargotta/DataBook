const path = require('path');
const express = require('express');
const db = require('./database');
const app = express();

var mongoose = require('mongoose');
// Connection URL
const url = "mongodb://localhost:27017/community"
// Use connect method to connect to the server
mongoose.Promise = global.Promise;
// Connect to db
mongoose.connect(url, { useMongoClient: true }, function(err, db) {
    if (err) return console.error(err);
});

app.use(express.static('./build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

/************************************************************************
* COMMUNITY REST API
************************************************************************/

/* ---------------------- READ: get items from db ---------------------- */
// get all users
app.get('/api/users', (req, res) => {
	db.getAllUsers(res);
});

// get all projects
app.get('/api/projects', (req, res) => {
	db.getAllProjects(function(projects) {
		res.json(projects);
	});
});

/* ---------------------- UPDATE: add items to db ---------------------- */
// update a user's first name (Remove in production)
app.get('/api/updateUser', (req, res) => {
	var query = req.query.query;
	var update = req.query.update;
	User.findOneAndUpdate({"name.first": query}, { $set: {"name.first": update}}, {new: true}, function(err, doc){
	    if (err) console.log("Something wrong when updating data!");
	    console.log("New user: " + doc);
	});

	res.send("User updated");
});

/* ---------------------- DELETE: delete items in db ---------------------- */
/*

...

*/

/* ---------------------- INITIALIZE DATABASE ---------------------- */
// initialise db with sample data (Remove in production)
app.get('/api/init', (req, res) => {
  db.sampleDb();

	res.send("Sample DB initialized");
});

// start up server
app.listen(3000, function () {
	console.log("Listening on port 3000");
});
