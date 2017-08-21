/************************************************************************
* INITIALISE DATABASE WITH SAMPLE DATA
************************************************************************/
const db = require('./database');

// @global: used to randomly assign a manager for each sample project
let manager;

// initialise db with sample data (Not used in production)
function sampleDb(callback) {
	// reset db
	db.resetDb();

	// sample users
	const users = [
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
	const u = users.map(user => {
		db.createUser(user);
	});
	console.log(u);

	// sample projects
	const projects = [
		{ 'name' : 'Proj 1', 'desc' : 'Sample project #1', 'members' : members(u), 'manager' : manager },
		{ 'name' : 'Proj 2', 'desc' : 'Sample project #2', 'members' : members(u), 'manager' : manager },
		{ 'name' : 'Proj 3', 'desc' : 'Sample project #3', 'members' : members(u), 'manager' : manager },
		{ 'name' : 'Proj 4', 'desc' : 'Sample project #4', 'members' : members(u), 'manager' : manager },
		{ 'name' : 'Proj 5', 'desc' : 'Sample project #5', 'members' : members(u), 'manager' : manager },
		{ 'name' : 'Proj 6', 'desc' : 'Sample project #6', 'members' : members(u), 'manager' : manager },
		{ 'name' : 'Proj 7', 'desc' : 'Sample project #7', 'members' : members(u), 'manager' : manager },
		{ 'name' : 'Proj 8', 'desc' : 'Sample project #8', 'members' : members(u), 'manager' : manager }
	];

	projects.map(project => {
		db.createProject(project);
	})

	console.log('sample db initialized!');
	callback("SUCCESS", "Sample database initialised!");
}

/**
* given list of users, return a list containing 0<x<5 random userIds.
* Set manager to be the first element in the returned list.
*/
function members(users) {
	const numberOfMembers = Math.floor((Math.random() * 5) + 1);
	let randIndex = Math.floor((Math.random() * numberOfMembers) + 1);
	let members = [];
	for (let i = 0; i < numberOfMembers; i++) {
		if (members.indexOf(users[i]._id) === -1) {
			members.push(users[i]._id);
		}
		else {
			i--;
		}
	}
	return members;
}

module.exports = {
	sampleDb	: sampleDb
}
