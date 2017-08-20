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

/* ------- CREATE: put items in db / READ: get all users and projects ------- */
/**
* TODO: test post
*/
// get info for all users or create user
app.route('/api/users')
   .get((req, res) => {
  	  db.getAllUsers(function(users) {
          res.json(users);
      });
   })
   .post((req, res) => {
     var params = req.body;
     db.createUser(params.firstName, params.lastName, params.year);
     res.send("user created!");
   });

// get info for all projects or create project
app.route('/api/projects')
   .get((req, res) => {
     db.getAllProjects(function(projects) {
        res.json(projects);
     });
   })
   .post((req, res) => {
     var params = req.body;
     db.createProject(params.name, params.desc, params.members, params.manager, params.link);
     res.send("project created!");
   });

 /* ------------ READ/UPDATE/DELETE for specific user or project ------------ */
 /**
 * TODO:
 * adding/removing members from projects
 * users/:userId/addproject/:projectId
 * projects/:projectId/addmember/:userId
 */

// end points for getting, updating, and deleting userId
app.route('/api/users/:userId')
   .get((req, res) => {
	   db.getUser(req.params.userId, function(user) {
           res.json(user);
       });
   })
   .put((req, res) => {
     db.updateUser(req.params.userId, req.body);
     res.send("user updated!");
   })
   .delete((req, res) => {
     db.deleteUser(req.params.userId);
     res.send("user deleted!");
   });

// end points for getting, updating, and deleting projectId
app.route('/api/projects/:projectId')
   .get((req, res) => {
       db.getProject(req.params.projectId, function(project) {
           res.json(project);
       });
   })
   .put((req, res) => {
     db.updateProject(req.params.projectId, req.body);
     res.send("project updated!");
   })
   .delete((req, res) => {
     db.deleteProject(req.params.projectId);
     res.send("project deleted!");
   });

/* ---------------------- INITIALIZE DATABASE ---------------------- */
// initialise db with sample data (Remove in production)
app.get('/api/init', (req, res) => {
  sampleDb.sampleDb();
	res.send("Sample DB initialized");
});

// start up server
app.listen(3000, function () {
	console.log("Listening on port 3000");
});
