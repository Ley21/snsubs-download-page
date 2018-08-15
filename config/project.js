var Project            = require('../app/models/project');

// expose this function to our app using module.exports
module.exports = function(name,banner,episode,state,visibility,season) {

    var project = Project.findOne({'project.name' : name},function(err,project){
             // if there are any errors, return the error
            if (err)
                return err;
            
            // check to see if theres already a user with that email
            if (project) {
                console.log("Project with name "+project.name+"already exists.")
                return project;
            } else {
        
                // if there is no user with that email
                // create the user
                var newProject = new Project();
                newProject.project.name = name;
                newProject.project.banner = banner;
                newProject.project.episode = episode;
                newProject.project.state = state;
                newProject.project.visibility = visibility;
                newProject.project.season = season;
                
                // save the user
                newProject.save(function(err) {
                    if (err)
                        throw err;
                    return;
                });
                return newProject;
            }
        }).exec();
    return project;
};