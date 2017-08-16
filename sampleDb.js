/************************************************************************
* INITIALIZE DATABASE WITH SAMPLE DATA
************************************************************************/
const db = require('./database');

// initialize db with sample data (Not used in production)
function sampleDb() {
	// reset db
	db.deleteAllUsers();
	db.deleteAllProjects();

	// add sample users
	var user1 = db.createUser('Aaron', 'Bargotta', 19);
	var user2 = db.createUser('Bill', 'Johnson', 19);
	var user3 = db.createUser('Sam', 'Tran', 18);
	var user4 = db.createUser('Sarah', 'Kelly', 21);
  var user5 = db.createUser('Rosie', 'Morris', 20);
  var user6 = db.createUser('Paul', 'Davis', 20);
  var user7 = db.createUser('Kevin', 'Fuller', 18);
  var user8 = db.createUser('Lindsey', 'Miller', 20);
  var user9 = db.createUser('Erik', 'Clarke', 20);
  var user10 = db.createUser('Madison', 'Murphy', 19);
  var user11 = db.createUser('Victor', 'Anderson', 19);
  var user12 = db.createUser('Monica', 'Watson', 20);

	var proj1Members = [user1, user2, user3];
	var proj1 = db.createProject('recal',
                  				  	'A course selection tool.',
                  				  	proj1Members,
                  				  	user1);
	proj1Members.map(function (member) {
		member.projects.push(proj1);
		member.save();
	});

  var proj2Members = [user2, user3, user5, user6];
	var proj2 = db.createProject('proj2',
                  				  	'Sample project #2.',
                  				  	proj2Members,
                  				  	user2);
	proj2Members.map(function (member) {
		member.projects.push(proj2);
		member.save();
	});

  var proj3Members = [user1, user5];
  var proj3 = db.createProject('proj3',
                            	'Sample project #3.',
                            	proj3Members,
                            	user5);
  proj3Members.map(function (member) {
    member.projects.push(proj3);
    member.save();
  });

  var proj4Members = [user7, user8, user9, user10];
  var proj4 = db.createProject('proj4',
                            	'Sample project #4.',
                            	proj4Members,
                            	user8);
  proj4Members.map(function (member) {
    member.projects.push(proj4);
    member.save();
  });

  var proj5Members = [user1, user11];
  var proj5 = db.createProject('proj5',
                            	'Sample project #5.',
                            	proj5Members,
                            	user1);
  proj5Members.map(function (member) {
    member.projects.push(proj5);
    member.save();
  });

  var proj6Members = [user2, user3, user7, user12];
  var proj6 = db.createProject('proj6',
                            	'Sample project #6.',
                            	proj6Members,
                            	user2);
  proj6Members.map(function (member) {
    member.projects.push(proj6);
    member.save();
  });

  var proj7Members = [user12];
  var proj7 = db.createProject('proj7',
                            	'Sample project #7.',
                            	proj7Members,
                            	user12);
  proj7Members.map(function (member) {
    member.projects.push(proj7);
    member.save();
  });

  var proj8Members = [user11];
  var proj8 = db.createProject('proj8',
                            	'Sample project #8.',
                            	proj8Members,
                            	user11);
  proj8Members.map(function (member) {
    member.projects.push(proj8);
    member.save();
  });

  console.log('sample db initialized!');
}

module.exports = {
	sampleDb	: sampleDb
}
