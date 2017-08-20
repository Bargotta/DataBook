/************************************************************************
* DB HELPER FUNCTIONS
************************************************************************/
var models = require('./schema');

User = models.User;
Project = models.Project;

/* ---------------------- CREATE: add items to db ---------------------- */
// create a user
function createUser(firstName, lastName, year, callback) {
    var newUser = new User({
        name 	: {
            first  : firstName,
            last   : lastName
        },
        year	: year
    });

    // call the built-in save method to save to the database
    newUser.save(function(err) {
        if (err) {
            if (callback)
                callback("FAILED", "error creating user...", null);
            return console.error(err);
        }
    });
    console.log(newUser.fullName + " added to db...");
    if (callback)
        callback("SUCCESS", newUser.fullName + " added to db...", newUser);
    return newUser;
}

// create a project
function createProject(name, desc, members, manager, link, callback) {
    var newProject = new Project({
        name	: name,
        desc	: desc,
        members	: members,
        manager	: manager,
        link	: link
    });

    // call the built-in save method to save to the database
    newProject.save(function(err) {
        if (err) {
            if (callback)
                callback("FAILED", "error creating project...", null);
            return console.error(err);
        }
    });
    console.log(newProject.name + " added to db...");
    if (callback)
        callback("SUCCESS", newProject.name + " added to db...", newProject);
    return newProject;
}

/* ---------------------- READ: get items from db ---------------------- */
// get info for all users
function getAllUsers(callback) {
    User.find({}).sort({"name.last" : "ascending"}).exec(function(err, users) {
        if (err) return console.error(err);
        if (callback)
            callback(users);
    });
}

// get info for all projects
function getAllProjects(callback) {
    Project.find({}).sort({"name" : "ascending"}).exec(function(err, projects) {
        if (err) return console.error(err);
        if (callback)
            callback(projects)
    });
}

// get info for userId
function getUser(userId, callback) {
    User.find({_id : userId}, function(err, user) {
        if (err) return console.error(err);
        if (callback)
            callback(user);
    });
}

// get info for projectId
function getProject(projectId, callback) {
    Project.find({ _id : projectId }, function(err, project) {
        if (err) return console.error(err);
        if (callback)
            callback(project)
    });
}

/* ---------------------- UPDATE: update items in db ---------------------- */
// update (name.first, name.last, or year) for userId
function updateUser(userId, update, callback) {
    User.findOneAndUpdate({_id: userId}, {$set: update}, {new: true}, function(err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
            if (callback)
                callback("FAILED", "Something wrong when updating data!");
        }
        else {
            console.log(doc);
            if (callback)
                callback("SUCCESS", "User updated!", doc);
        }
    });
}

// update (name, desc, or link) for projectId
function updateProject(projectId, update, callback) {
    Project.findOneAndUpdate({_id: projectId}, {$set: update}, {new: true}, function(err, doc) {
        if (err) {
            console.log("Something wrong when updating data!");
            if (callback)
                callback("FAILED", "Something wrong when updating data!");
        }
        else {
            console.log(doc);
            if (callback)
                callback("SUCCESS", "Project updated!", doc);
        }
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
                if (callback)
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
                if (callback)
                    callback("SUCCESS", user.fullName + " added to " + project.name);
            }
            else {
                console.log(user.fullName + " already member of " + project.name);
                if (callback)
                    callback("SUCCESS", user.fullName + " already member of " + project.name);
            }
        });
    });
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
                if (callback)
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
                if (callback)
                    callback("SUCCESS", user.fullName + " removed from " + project.name);
            }
            else {
                console.log(user.fullName + " wasn't member of " + project.name);
                if (callback)
                    callback("SUCCESS", user.fullName + " wasn't member of " + project.name);
            }
        });
    });
}

// update manager of projectId to userId
function updateManager(userId, projectId, callback) {
    User.find({_id : userId}).exec(function(err, users) {
        let user = users[0];
        if (err) return console.error(err);
        Project.find({_id : projectId}).exec(function(err, projects) {
            if (err) return console.error(err);
            let project = projects[0];
            project.manager = user;
            project.save();
            console.log("New manager of " + project.name + ": " + user.fullName);
            callback("SUCCESS", "New manager of " + project.name + ": " + user.fullName);
        });
    });
}

/* ---------------------- DELETE: delete items in db ---------------------- */
// delete userId and remove all userId coupling
function deleteUser(userId, callback) {
    User.remove({ _id : userId }, function(err) {
        if (err) {
            console.error(err);
            if (callback)
                callback("FAILED", "error deleting user");
        }
        else {
            if (callback)
                callback("SUCCESS", userId + " deleted!");
        }
    });
}

// delete projectId and remove all projectId coupling
function deleteProject(projectId, callback) {
    Project.remove({ _id : projectId }, function(err) {
        if (err) {
            console.error(err);
            if (callback)
                callback("FAILED", "error deleting project");
        }
        else {
            if (callback)
                callback("SUCCESS", projectId + " deleted!");
        }
    });
}

// reset database: delete all users and projects
function resetDb() {
    User.remove({}, function(err) {
        if (err) console.error(err);
        else console.log("All users deleted!");
    });
    
    Project.remove({}, function(err) {
        if (err) console.error(err);
        else console.log("All projects deleted!");
    });
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
    updateManager       : updateManager,
    // delete...
    deleteUser          : deleteUser,
    deleteProject       : deleteProject,
    resetDb             : resetDb
}
