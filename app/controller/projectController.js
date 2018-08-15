var Project = require('../models/project');

exports.project_create = function(req,res){
    Project.findOne({'project.name' : req.body.name},function(err,project){
         // if there are any errors, return the error
        if (err)
            return err;
        
        // check to see if theres already a user with that email
        if (project) {
            console.log("Project with name "+ project.project.name+ "already exists.")
            res.redirect('/project');
            return;
        } else {
    
            // if there is no user with that email
            // create the user
            project.project = new Project();
            project.project.name = req.body.name;
            project.project.banner = req.body.banner;
            project.project.episode = req.body.episode;
            project.project.state = req.body.state;
            project.project.visibility = req.body.visibility;
            project.project.season = req.body.season;
            
            // save the user
            project.save(function(err) {
                if (err)
                    throw err;
                return;
            });
            res.redirect('/');
            return;
        }
    }).exec();
};

exports.project_getAll = function(req,res){

    Project.find().exec(function(err,data){
        if (err)
            return err;
            
        var projects = data.map(d=>d.project);
        res.render('pages/index.ejs', {
            isLoggedIn: req.isAuthenticated(),
            projects: projects
        }); // load the index.ejs file
    });
}