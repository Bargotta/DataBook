/************************************************************************
* DB HELPER FUNCTIONS
************************************************************************/
var models = require('./schema');

User = models.User;
Project = models.Project;

/* ---------------------- CREATE: add items to db ---------------------- */
// create a user
function createUser(firstName, lastName, year) {
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
function createProject(name, desc, members, manager, link) {
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
// get info for all users
function getAllUsers(res) {
    User.find({}, function(err, users) {
        if (err) return console.error(err);
        formatUsersInfo(res, users);
    });
}

// get info for userId
function getUser(userId, res) {
    User.find({_id : userId}, function(err, users) {
        if (err) return console.error(err);
        formatUsersInfo(res, users);
    });
}

// get info for all projects
function getAllProjects(callback) {
    Project.find({}, function(err, projects) {
        if (err) return console.error(err);
        callback(projects)
    });
}

// get info for projectId
function getProject(projectId, callback) {
    Project.find({_id : projectId}, function(err, projects) {
        if (err) return console.error(err);
        callback(projects)
    });
}

/* ---------------------- UPDATE: update items in db ---------------------- */
// update users first name
function updateUserName(first, update) {
  User.findOneAndUpdate({"name.first": first},
                        {$set: {"name.first": update}},
                        {new: true},
                        function(err, doc){
	    if (err) console.log("Something wrong when updating data!");
      else console.log("User updated: " + doc);
	});
}

/* ---------------------- DELETE: delete items in db ---------------------- */
// delete all the users
function deleteAllUsers() {
    User.remove({}, function(err) {
        if (err) console.error(err);
    });
    console.log("All users deleted!")
}

// delete all the projects
function deleteAllProjects() {
    Project.remove({}, function(err) {
        if (err) console.error(err);
    });
    console.log("All projects deleted!")
}

// Exports
module.exports = {
  createUser        : createUser,
  createProject     : createProject,
  getAllUsers       : getAllUsers,
  getUser           : getUser,
  getAllProjects    : getAllProjects,
  getProject        : getProject,
  updateUserName    : updateUserName,
  deleteAllUsers    : deleteAllUsers,
  deleteAllProjects : deleteAllProjects
}

/* ------------------------------------------------------------------------- */

/**
* Given list of users, return response json with each user's info
*/
function formatUsersInfo(res, users) {
  var i = users.length;
  var allUserInfo = [];
  users.map(function(user) {
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
        u.projects.map(function(project) {
          userInfo.projects.push(project._id);
        });
      }
      // add user's info
      allUserInfo.push(userInfo);

      // return once all info has been collected
      // must be a better way to do this...
      i--;
      if (i <= 0) {
        res.json(allUserInfo);
      }
    });
  });
}
