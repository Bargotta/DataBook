const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./database');
const sampleDb = require('./sampleDb');
const app = express();

// Connection URL
const url = "mongodb://localhost:27017/community"
// Use connect method to connect to the server
mongoose.Promise = global.Promise;
// Connect to db
mongoose.connect(url, { useMongoClient: true }, function(err, db) {
    if (err) return console.error(err);
});

app.use(express.static('./build'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

/************************************************************************
* COMMUNITY REST API
************************************************************************/

/* ------- CREATE / READ: all users and projects ------- */
// get info for all users or create user
app.route('/api/users')
    // READ...
    .get((req, res) => {
        db.getAllUsers(function(users) {
            res.json(users);
        });
    })
    // CREATE...
    .post((req, res) => {
        db.createUser(req.body, function(status, message, doc) {
            res.json({
                "status"    : status,
                "message"   : message,
                "newDoc"    : doc
            });
        });
    });

// get info for all projects or create project
app.route('/api/projects')
    // READ...
    .get((req, res) => {
        db.getAllProjects(function(projects) {
            res.json(projects);
        });
    })
    // CREATE...
    .post((req, res) => {
        db.createProject(req.body, function(status, message, doc) {
            res.json({
                "status"    : status,
                "message"   : message,
                "newDoc"    : doc
            });
        });
    });

 /* ------------ READ/UPDATE/DELETE: specific user or project ------------ */
// end points for getting, updating, and deleting userId
app.route('/api/users/:userId')
    // READ...
    .get((req, res) => {
        db.getUser(req.params.userId, function(user) {
            res.json(user);
        }, {});
    })
    // UPDATE...
    .put((req, res) => {
        db.updateUser(req.params.userId, req.body, function(status, message, doc) {
            res.json({
                "status"    : status,
                "message"   : message,
                "newDoc"    : doc
            });
        });
    })
    // DELETE...
    .delete((req, res) => {
        db.deleteUser(req.params.userId, function(status, message) {
            res.json({
                "status"    : status,
                "message"   : message
            });
        });
    });

// end points for getting, updating, and deleting projectId
app.route('/api/projects/:projectId')
    // READ...
    .get((req, res) => {
        db.getProject(req.params.projectId, function(project) {
            res.json(project);
        });
    })
    // UPDATE...
    .put((req, res) => {
        db.updateProject(req.params.projectId, req.body, function(status, message, doc) {
            res.json({
                "status"     : status,
                "message"    : message,
                "newDoc"     : doc
            });
        });
    })
    // DELETE...
    .delete((req, res) => {
        db.deleteProject(req.params.projectId, function(status, message) {
            res.json({
                "status"    : status,
                "message"   : message
            });
        });
    });

/* ------------ UPDATE: update members and manager for projects ------------ */
// UPDATE...
app.put('/api/users/:userId/:op(add|remove|manager)/:projectId', (req, res) => {
    const userId = req.params.userId;
    const op = req.params.op;
    const projectId = req.params.projectId;
    // add userId as member of projectId
    if (op === "add") {
        db.addMember(userId, projectId, function(status, message) {
            res.json({
                "status"    : status,
                "message"   : message
            });
        });
    }
    // remove userId as member of projectId
    else if (op === "remove") {
        db.removeMember(userId, projectId, function(status, message) {
            res.json({
                "status"    : status,
                "message"   : message
            });
        });
    }
    // add userId as manager of projectId
    else if (op === "manager") {
        db.updateManager(userId, projectId, function(status, message) {
            res.json({
                "status"    : status,
                "message"   : message
            });
        });
    }
});

/* ---------------------- INITIALISE DATABASE ---------------------- */
// initialise db with sample data (Remove in production)
app.get('/api/init', (req, res) => {
    sampleDb.sampleDb(function(status, message) {
        res.json({
            "status"    : status,
            "message"   : message
        });
    });
});

// start up server
app.listen(3000, function () {
	console.log("Listening on port 3000");
});
