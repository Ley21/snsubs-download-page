// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
var User = mongoose.model('User', userSchema);


//Create a admin user on startup of node application
var email = process.env.default_email;
var password = process.env.default_password;

User.findOne({ 'local.email' :  email }, function(err, user) {
    
    // if there are any errors, return the error
    if (err)
        return err;
    
    // check to see if theres already a user with that email
    if (user) {
        return;
    } else {

        // if there is no user with that email
        // create the user
        var newUser            = new User();

        // set the user's local credentials
        newUser.local.email    = email;
        newUser.local.password = newUser.generateHash(password);

        // save the user
        newUser.save(function(err) {
            if (err)
                throw err;
            return;
        });
    }

}).exec();


module.exports = User;