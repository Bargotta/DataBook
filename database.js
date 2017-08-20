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
            first  : firstName,
            last   : lastName
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
function getAllUsers(callback) {
    User.find({}).sort().exec(function(err, users) {
        if (err) return console.error(err);
        callback(users);
    });
}

// get info for all projects
function getAllProjects(callback) {
    Project.find({}, function(err, projects) {
        if (err) return console.error(err);
        callback(projects)
    });
}

// get info for userId
function getUser(userId, callback) {
    User.find({_id : userId}, function(err, user) {
        if (err) return console.error(err);
        callback(user);
    });
}

// get info for projectId
function getProject(projectId, callback) {
    Project.find({ _id : projectId }, function(err, project) {
        if (err) return console.error(err);
        callback(project)
    });
}

/* ---------------------- UPDATE: update items in db ---------------------- */
// update userId
function updateUser(userId, update) {
    console.log(update);
    User.findByIdAndUpdate(userId, update);
}

// update projectId
function updateProject(projectId, update) {
    console.log(update);
    Project.findByIdAndUpdate(projectId, update);
}

/* ---------------------- DELETE: delete items in db ---------------------- */
// delete userId
function deleteUser(userId) {
    User.remove({ _id : userId }, function(err) {
        if (err) console.error(err);
    });
    console.log("All users deleted!")
}

// delete projectId
function deleteProject(projectId) {
    Project.remove({ _id : projectId }, function(err) {
        if (err) console.error(err);
    });
    console.log("All projects deleted!")
}

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
    // create...
    createUser        : createUser,
    createProject     : createProject,
    /// read...
    getAllUsers       : getAllUsers,
    getAllProjects    : getAllProjects,
    getUser           : getUser,
    getProject        : getProject,
    // update...
    updateUser        : updateUser,
    updateProject     : updateProject,
    // delete...
    deleteUser        : deleteUser,
    deleteProject     : deleteProject,
    deleteAllUsers    : deleteAllUsers,
    deleteAllProjects : deleteAllProjects
}
