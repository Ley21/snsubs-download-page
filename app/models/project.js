// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var projectSchema = mongoose.Schema({

    project          : {
        name        : String,
        banner      : String,
        episode     : Number,
        state       : String,
        visibility  : Boolean,
        season      : String
    }

});

var Project = mongoose.model('Project', projectSchema);
module.exports = Project;
