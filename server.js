const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

/************************************************************************
* COMMUNITY REST API
************************************************************************/

/* ---------------------- READ: get items from db ---------------------- */
// get all users
app.get('/api/users', (req, res) => {
	getAllUsers(function (users) {
		var allUserInfo = [];
		var i = users.length;
		users.map(function (user) {
			User.findOne({_id: user._id}).populate('projects').exec(function (err, u) {
				userInfo = {
							'id' 		: u.id,
							'first'		: u.name.first,
							'last'		: u.name.last,
							'year'		: u.year,
							'projects'	: [],
							'joined'	: u.joined
						};
        // get the projects that user is a member of
				if (u.projects.length) {
					u.projects.map(function (project) {
						userInfo.projects.push(project.name);
					});
				}

				allUserInfo.push(userInfo);

				// return once all info has been collected
				--i;
				if (i <= 0) {
					res.json(allUserInfo);
				}
			});
		});
	});
});

// get all projects
app.get('/api/projects', (req, res) => {
	getAllProjects(function (projects) {
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
// initialise sample db (Remove in production)
app.get('/api/init', (req, res) => {
	// reset db
	deleteAllUsers();
	deleteAllProjects();

	// add sample data
	var user1 = createUser('Aaron', 'Bargotta', 20);
	var user2 = createUser('Bill', 'Johnson', 19);
	var user3 = createUser('Sam', 'Tran', 18);
	var user4 = createUser('Sarah', 'Kelly', 21);
  var user5 = createUser('Rosie', 'Morris', 20);
  var user6 = createUser('Paul', 'Davis', 20);
  var user7 = createUser('Kevin', 'Fuller', 18);
  var user8 = createUser('Lindsey', 'Miller', 20);
  var user9 = createUser('Erik', 'Clarke', 20);
  var user10 = createUser('Madison', 'Murphy', 19);
  var user11 = createUser('Victor', 'Anderson', 19);
  var user12 = createUser('Monica', 'Watson', 20);

	var proj1Members = [user1, user2, user3];
	var proj1 = createProject('recal',
                  				  'A course selection tool.',
                  				  proj1Members,
                  				  user1);
	proj1Members.map(function (member) {
		member.projects.push(proj1);
		member.save();
	});

  var proj2Members = [user2, user3, user5, user6];
	var proj2 = createProject('proj2',
                  				  'Sample project #2.',
                  				  proj2Members,
                  				  user2);
	proj2Members.map(function (member) {
		member.projects.push(proj2);
		member.save();
	});

  var proj3Members = [user1, user5];
  var proj3 = createProject('proj3',
                            'Sample project #3.',
                            proj3Members,
                            user2);
  proj3Members.map(function (member) {
    member.projects.push(proj3);
    member.save();
  });

  var proj4Members = [user7, user8, user9, user10];
  var proj4 = createProject('proj4',
                            'Sample project #4.',
                            proj4Members,
                            user2);
  proj4Members.map(function (member) {
    member.projects.push(proj4);
    member.save();
  });

  var proj5Members = [user1, user11];
  var proj5 = createProject('proj5',
                            'Sample project #5.',
                            proj5Members,
                            user2);
  proj5Members.map(function (member) {
    member.projects.push(proj5);
    member.save();
  });

  var proj6Members = [user2, user3, user7, user12];
  var proj6 = createProject('proj6',
                            'Sample project #6.',
                            proj6Members,
                            user2);
  proj6Members.map(function (member) {
    member.projects.push(proj6);
    member.save();
  });

  var proj7Members = [user12];
  var proj7 = createProject('proj7',
                            'Sample project #7.',
                            proj7Members,
                            user2);
  proj7Members.map(function (member) {
    member.projects.push(proj7);
    member.save();
  });

  var proj8Members = [user11];
  var proj8 = createProject('proj8',
                            'Sample project #8.',
                            proj8Members,
                            user2);
  proj8Members.map(function (member) {
    member.projects.push(proj8);
    member.save();
  });

	res.send("Sample DB initialised");
});

// start up server
app.listen(3000, function () {
	console.log("Listening on port 3000");
});

/************************************************************************
* MONGO SHCEMA
************************************************************************/
var mongoose = require('mongoose');

// Connection URL
const url = "mongodb://localhost:27017/community"

// Use connect method to connect to the server
mongoose.Promise = global.Promise;

mongoose.connect(url, { useMongoClient: true }, function(err, db) {
    if (err) return console.error(err);
});

var Schema = mongoose.Schema;

// ---------------------- SCHEMA's ----------------------

// create a user schema
var userSchema = new Schema({
	name		: {
		first	: String,
		last	: String
	},
	projects	: [ {type : Schema.Types.ObjectId, ref : 'Project'} ],
	year		: Number,
	joined		: { type: Date, default: Date.now }
});

userSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});

// create project schema
var projectSchema = new Schema({
	name	: String,
	desc	: String,
	members	: [ {type : Schema.Types.ObjectId, ref : 'User'} ],
	manager	: {type : Schema.Types.ObjectId, ref : 'User'},
	link	: String,
	created	: { type: Date, default: Date.now }
});

// ---------------------- / SCHEMA's ----------------------

var User = mongoose.model('User', userSchema);
var Project = mongoose.model('Project', projectSchema);

exports.User = User;
exports.Project = Project;

// allows them to be used outside of this module
module.exports = User;
module.exports = Project;

/************************************************************************
* DB HELPER FUNCTIONS
************************************************************************/
/* ---------------------- CREATE: add items to db ---------------------- */
// create a user
var createUser = function(firstName, lastName, year) {
    var newUser = new User({
		name 	: {
			first 	: firstName,
			last 	: lastName
		},
		year	: year
    });

    // call the built-in save method to save to the database
    newUser.save(function(err) {
        if (err) return console.error(err);
    });
    console.log(newUser.fullName + " added to db...");
    return newUser;
}

// create a project
var createProject = function(name, desc, members, manager, link) {
	var newProject = new Project({
		name	: name,
		desc	: desc,
		members	: members,
		manager	: manager,
		link	: link
	});

    // call the built-in save method to save to the database
    newProject.save(function(err) {
        if (err) return console.error(err);
    });
    console.log(newProject.name + " added to db...");
    return newProject;
}

/* ---------------------- READ: get items from db ---------------------- */
// get all users
var getAllUsers = function(callback) {
    User.find({}, function(err, users) {
        if (err) return console.error(err);
        callback(users)
    });
}

// get all projects
var getAllProjects = function(callback) {
    Project.find({}, function(err, projects) {
        if (err) return console.error(err);
        callback(projects)
    });
}

/* ---------------------- DELETE: delete items in db ---------------------- */
// delete all the users
var deleteAllUsers = function() {
    User.remove({}, function(err) {
        if (err) console.error(err);
    });
    console.log("All users deleted!")
}

// delete all the projects
var deleteAllProjects = function() {
    Project.remove({}, function(err) {
        if (err) console.error(err);
    });
    console.log("All projects deleted!")
}
