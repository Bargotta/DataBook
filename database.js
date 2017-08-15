/************************************************************************
* DB HELPER FUNCTIONS
************************************************************************/
var models = require('./schema');

User = models.User;
Project = models.Project;

/* ---------------------- CREATE: add items to db ---------------------- */
// create a user
var createUser = function(firstName, lastName, year) {
    var newUser = new User({
  		name 	: {
  			first : firstName,
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

module.exports.createUser = createUser;
module.exports.createProject = createProject;

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

module.exports.getAllUsers = getAllUsers;
module.exports.getAllProjects = getAllProjects;

/* ---------------------- UPDATE: update items in db ---------------------- */
/*

...

*/

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

module.exports.deleteAllUsers = deleteAllUsers;
module.exports.deleteAllProjects = deleteAllProjects;

/* -------------------- SAMPLE: add sample items in db -------------------- */
// initialize db with sample data (Not used in production)
var sampleDb = function() {
	// reset db
	deleteAllUsers();
	deleteAllProjects();

	// add sample data
	var user1 = createUser('Aaron', 'Bargotta', 19);
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
                            user5);
  proj3Members.map(function (member) {
    member.projects.push(proj3);
    member.save();
  });

  var proj4Members = [user7, user8, user9, user10];
  var proj4 = createProject('proj4',
                            'Sample project #4.',
                            proj4Members,
                            user8);
  proj4Members.map(function (member) {
    member.projects.push(proj4);
    member.save();
  });

  var proj5Members = [user1, user11];
  var proj5 = createProject('proj5',
                            'Sample project #5.',
                            proj5Members,
                            user1);
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
                            user12);
  proj7Members.map(function (member) {
    member.projects.push(proj7);
    member.save();
  });

  var proj8Members = [user11];
  var proj8 = createProject('proj8',
                            'Sample project #8.',
                            proj8Members,
                            user11);
  proj8Members.map(function (member) {
    member.projects.push(proj8);
    member.save();
  });

  console.log('sample db initialized!');
}

module.exports.sampleDb = sampleDb;
