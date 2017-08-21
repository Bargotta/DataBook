/************************************************************************
* INITIALISE DATABASE WITH SAMPLE DATA
************************************************************************/
const db = require('./database');

// initialise db with sample data (Not used in production)
function sampleDb(callback) {
	// reset db
	db.resetDb();

	// sample users
	const u = [
		{ 'first' : 'Aaron',	'last' : 'Bargotta', 	'year' : 19 },
		{ 'first' : 'Bill',		'last' : 'Johnson', 	'year' : 19 },
		{ 'first' : 'Sam',		'last' : 'Tran', 		'year' : 18 },
		{ 'first' : 'Sarah',	'last' : 'Kelly', 		'year' : 21 },
		{ 'first' : 'Rosie',	'last' : 'Morris', 		'year' : 20 },
		{ 'first' : 'Paul',		'last' : 'Davis', 		'year' : 20 },
		{ 'first' : 'Kevin',	'last' : 'Fuller', 		'year' : 18 },
		{ 'first' : 'Lindsey',	'last' : 'Miller', 		'year' : 20 },
		{ 'first' : 'Erik',		'last' : 'Clarke', 		'year' : 20 },
		{ 'first' : 'Madison',	'last' : 'Murphy', 		'year' : 19 },
		{ 'first' : 'Victor',	'last' : 'Anderson', 	'year' : 19 },
		{ 'first' : 'Monica',	'last' : 'Watson', 		'year' : 20 }
	];

	// sample projects
	const p = [
		{ 'name' : 'Proj 1', 'desc' : 'Sample project #1' },
		{ 'name' : 'Proj 2', 'desc' : 'Sample project #2' },
		{ 'name' : 'Proj 3', 'desc' : 'Sample project #3' },
		{ 'name' : 'Proj 4', 'desc' : 'Sample project #4' },
		{ 'name' : 'Proj 5', 'desc' : 'Sample project #5' },
		{ 'name' : 'Proj 6', 'desc' : 'Sample project #6' },
		{ 'name' : 'Proj 7', 'desc' : 'Sample project #7' },
		{ 'name' : 'Proj 8', 'desc' : 'Sample project #8' }
	];

	const users = u.map(user => {
		return db.createUser(user);
	});

	// create projects once all users have been created @setTimeout: lazy
	setTimeout(function() {
		p.map(project => {
			// manager = members[0]
			const members = addMembers(users);
			project.members = members;
			db.createProject(project);
		});
	}, 1000);

	console.log('sample db initialized!');
	if (callback) callback("SUCCESS", "Sample database initialised!");
}

/**
* given list of users, return a list containing 1<x<5 random userIds
*/
function addMembers(users) {
	let numberOfMembers = Math.floor((Math.random() * 5) + 1);
	let members = [];
	for (let i = 0; i < numberOfMembers; i++) {
		let randIndex = Math.floor((Math.random() * users.length));
		if (members.indexOf(""+users[randIndex]._id) === -1) {
			members.push(""+users[randIndex]._id);
		}
		else
			i--;
	}
	return members;
}

module.exports = {
	sampleDb	: sampleDb
}
