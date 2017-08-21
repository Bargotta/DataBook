/************************************************************************
* DATABASE MODIFYING FUNCTIONS
************************************************************************/
let models = require('./schema');

User = models.User;
Project = models.Project;

/* ---------------------- CREATE: add items to db ---------------------- */
// create a user given user object
function createUser(user, callback) {
    let newUser = new User({
        name 	: {
            first  : user.first,
            last   : user.last
        },
        year	: user.year
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

/**
* Create a project given project object
* project.members: list of strings containing userIds
* project.manager: string containing userId
*/
function createProject(project, callback) {
    // get members and manager as User objects
    let manager;
    getUser(project.manager, function(user) {
        manager = user;
    });
    let members = [];
    let remaining = project.members.length;
    project.members.map(userId => {
        remaining--;
        // once all members are returned, create project
        getUser(userId, function(user, remaining, members, manager, cb) {
            members.push(user);
            if (! remaining) {
                let newProject = new Project({
                    name	: project.name,
                    desc	: project.desc,
                    members	: members,
                    manager	: manager,
                    link	: project.link
                });

                // call the built-in save method to save to the database
                newProject.save(function(err) {
                    if (err) {
                        if (cb)
                            cb("FAILED", "error creating project...", null);
                        return console.error(err);
                    }
                });
                console.log(newProject.name + " added to db...");
                if (cb)
                    cb("SUCCESS", newProject.name + " added to db...", newProject);
            }
        }, { remaining : remaining, members : members, manager : manager, cb : callback });
    });
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

/**
* if remaining!==null, create project with members and manager through callback
* else return user info for userId as json
*/
function getUser(userId, callback, { remaining=null, members=null, manager=null, cb=null }) {
    User.find({_id : userId}, function(err, user) {
        if (err) return console.error(err);
        if (callback)
            if (remaining !== null)
                callback(user, remaining, members, manager, cb);
            else
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

// update manager of projectId to userId
function updateManager(userId, projectId, callback) {
    User.findOne({_id : userId}).exec(function(err, user) {
        if (err) return console.error(err);
        if (! user) {
            if (callback) callback("FAILED", "No user found with id " + userId);
            return;
        }
        Project.findOne({_id : projectId}).exec(function(err, project) {
            if (err) return console.error(err);
            if (! project) {
                if (callback) callback("FAILED", "No project found with id " + projectId);
                return;
            }
            project.manager = user;
            project.save();
            console.log("New manager of " + project.name + ": " + user.fullName);
            callback("SUCCESS", "New manager of " + project.name + ": " + user.fullName);
        });
    });
}

// add userId as member of projectId if not already a member
function addMember(userId, projectId, callback) {
    User.findOne({_id : userId}).exec(function(err, user) {
        if (err) return console.error(err);
        if (! user) {
            if (callback) callback("FAILED", "No user found with id " + userId);
            return;
        }
        Project.findOne({_id : projectId}).exec(function(err, project) {
            if (err) return console.error(err);
            if (! project) {
                if (callback) callback("FAILED", "No project found with id " + projectId);
                return;
            }
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

/**
* Remove userId as a member of projectId:
* if userId is manager of projectId, remove them as manager and make another
* member manager if possible
* if delUser=true, then only remove user from projects and delete user once
* user has been removed from all projects, indicated by remaining (same for
* delProj=true)
*/
function removeMember(userId, projectId, callback, {delUser=false, delProj=false, remaining=-1}) {
    User.findOne({_id : userId}).exec(function(err, user) {
        if (err) return console.error(err);
        if (! user) {
            if (callback) callback("FAILED", "No user found with id " + userId);
            return;
        }
        // if user has been removed from all projects, delete user
        if (! remaining && delUser) {
            user.remove();
            console.log(user.fullName + " deleted!");
        }
        Project.findOne({_id : projectId}).exec(function(err, project) {
            if (err) return console.error(err);
            if (! project) {
                if (callback) callback("FAILED", "No project found with id " + projectId);
                return;
            }
            // if all members have been removed from project, delete project
            if (! remaining && delProj) {
                project.remove();
                console.log(project.name + " deleted!");
            }
            const u = user.projects.indexOf(project._id);
            const p = project.members.indexOf(user._id);
            // make sure user.projects and project.members are correctly coupled
            if (u === -1 && p !== -1 || u !== -1 && p === -1) {
                console.log("error occured removing member...");
                if (callback)
                    callback("FAILED",
                         "error occured removing " + user.fullName + " from " + project.name);
            }
            else if (u > -1 && p > -1) {
                // remove project from user projects unless user is being deleted
                if (! delUser) {
                    user.projects.splice(u, 1);
                    user.save();
                    console.log(user.fullName + " removed from " + project.name);
                }
                // remove user as member (and manager) of project unless project is being deleted
                if (! delProj) {
                    project.members.splice(p, 1);
                    console.log(project.name + " removed from " + user.fullName);
                    // update manager if necessary
                    if (""+user._id === ""+project.manager) {
                        project.manager = project.members[0];
                        console.log(user.fullName + " removed as manager from " + project.name);
                    }
                    project.save();
                }
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

/* ---------------------- DELETE: delete items in db ---------------------- */
// delete userId and remove all projects userId is a member of
function deleteUser(userId, callback) {
    // remove user from their projects before removing user from db
    User.findOne({ _id : userId }, function(err, user) {
        if (! user) {
            if (callback) callback("FAILED", "No user found with id " + userId);
            return;
        }
        let remaining = user.projects.length;
        if (! remaining) {
            user.remove();
            console.log(user.fullName + " deleted!");
        }
        // remove user from all projects before deleting
        else {
            user.projects.map(projectId => {
                remaining--;
                removeMember(userId, projectId, null,
                            {delUser:true, delProj:false, remaining:remaining});
            });
        }
        if (callback) callback("SUCCESS", user.fullName + " deleted!");
    });
}

// delete userId and remove all projects userId is a member of
function deleteProject(projectId, callback) {
    // remove user from their projects before removing user from db
    Project.findOne({ _id : projectId }, function(err, project) {
        if (! project) {
            if (callback) callback("FAILED", "No project found with id " + projectId);
            return;
        }
        let remaining = project.members.length;
        if (! remaining) {
            project.remove();
            console.log(project.name + " deleted!");
        }
        // remove all members from project before deleting
        else {
            project.members.map(userId => {
                remaining--;
                removeMember(userId, projectId, null,
                            {delUser:false, delProj:true, remaining:remaining});
            });
        }
        if (callback) callback("SUCCESS", project.name + " deleted!");
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
