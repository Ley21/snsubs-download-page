var projectController = require('./controller/projectController');

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', projectController.project_getAll);

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('pages/login.ejs', { 
            message: req.flash('loginMessage'),
            isLoggedIn: req.isAuthenticated()
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    app.get('/project', isLoggedIn, function(req, res) {
        res.render('pages/project.ejs', {
            user: req.user
        });
    });

    // process the login form
    app.post('/project',isLoggedIn, projectController.project_create);

    app.get('/episode', isLoggedIn, function(req, res) {
        res.render('pages/episode.ejs', {
            user: req.user
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
