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
    User.find({}).sort({"name.last" : "ascending"}).exec(function(err, users) {
        if (err) return console.error(err);
        callback(users);
    });
}

// get info for all projects
function getAllProjects(callback) {
    Project.find({}).sort({"name" : "ascending"}).exec(function(err, projects) {
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
// update (name.first, name.last, or year) for userId
function updateUser(userId, update) {
    User.findOneAndUpdate({_id: userId}, {$set: update}, {new: true}, function(err, doc) {
        if (err) console.log("Something wrong when updating data!");
        else console.log(doc);
    });
}

// update (name, desc, or link) for projectId
function updateProject(projectId, update) {
    Project.findOneAndUpdate({_id: projectId}, {$set: update}, {new: true}, function(err, doc) {
        if (err) console.log("Something wrong when updating data!");
        else console.log(doc);
    });
}

// add userId as member of projectId if not already a member
function addMember(userId, projectId, callback) {
    User.find({_id : userId}).exec(function(err, users) {
        let user = users[0];
        if (err) return console.error(err);
        Project.find({_id : projectId}).exec(function(err, projects) {
            if (err) return console.error(err);
            let project = projects[0];
            const u = user.projects.indexOf(project._id);
            const p = project.members.indexOf(user._id);
            // make sure user.projects and project.members are correctly coupled
            if (u === -1 && p !== -1 || u !== -1 && p === -1) {
                console.log("error occured adding member...");
                callback("FAILED",
                         "error occured adding " + user.fullName + " to " + project.name);
            }
            else if (u === -1 && p === -1) {
                // add project to user
                user.projects.push(project);
                user.save();
                // add user as member of project
                project.members.push(user);
                project.save();
                console.log(user.fullName + " added to " + project.name);
                callback("SUCCESS", user.fullName + " added to " + project.name);
            }
            else {
                console.log(user.fullName + " already member of " + project.name);
                callback("SUCCESS", user.fullName + " already member of " + project.name);
            }
        })
    })
}

// remove userId to projectId
function removeMember(userId, projectId, callback) {
    User.find({_id : userId}).exec(function(err, users) {
        let user = users[0];
        if (err) return console.error(err);
        Project.find({_id : projectId}).exec(function(err, projects) {
            if (err) return console.error(err);
            let project = projects[0];
            const u = user.projects.indexOf(project._id);
            const p = project.members.indexOf(user._id);
            // make sure user.projects and project.members are correctly coupled
            if (u === -1 && p !== -1 || u !== -1 && p === -1) {
                console.log("error occured removing member...");
                callback("FAILED",
                         "error occured removing " + user.fullName + " from " + project.name);
            }
            if (u > -1 && p > -1) {
                // remove project from user projects
                user.projects.splice(u, 1);
                user.save();
                // remove user as member of project
                project.members.splice(p, 1);
                project.save();
                console.log(user.fullName + " removed from " + project.name);
                callback("SUCCESS", user.fullName + " removed from " + project.name);
            }
            else {
                console.log(user.fullName + " wasn't member of " + project.name);
                callback("SUCCESS", user.fullName + " wasn't member of " + project.name);
            }
        })
    })
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
    createUser          : createUser,
    createProject       : createProject,
    /// read...
    getAllUsers         : getAllUsers,
    getAllProjects      : getAllProjects,
    getUser             : getUser,
    getProject          : getProject,
    // update...
    updateUser          : updateUser,
    updateProject       : updateProject,
    addMember           : addMember,
    removeMember        : removeMember,
    // delete...
    deleteUser          : deleteUser,
    deleteProject       : deleteProject,
    deleteAllUsers      : deleteAllUsers,
    deleteAllProjects   : deleteAllProjects
}
