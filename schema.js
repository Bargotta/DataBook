/************************************************************************
* MONGO SHCEMA
************************************************************************/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a user schema
var userSchema = new Schema({
	name		: {
		first	: String,
		last	: String
	},
	projects	: [ {type : Schema.Types.ObjectId, ref : 'Project'} ],
	year		: Number,
	joined		: { type: Date, default: Date.now }
});

userSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});

// create project schema
var projectSchema = new Schema({
	name	: String,
	desc	: String,
	members	: [ {type : Schema.Types.ObjectId, ref : 'User'} ],
	manager	: {type : Schema.Types.ObjectId, ref : 'User'},
	link	: String,
	created	: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);
var Project = mongoose.model('Project', projectSchema);

// allows them to be used outside of this module
module.exports = {
  User    : User,
  Project : Project
};
