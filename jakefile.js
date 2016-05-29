(function(){
    "use strict";
    
    var semver = require('semver');
            
    desc('Default Build');
    //run version task as dependency so it runs first
    task("default", ["version", "lint"], function(){
        console.log("\n\nBuild Ok");
    });
    
    //desc is the documentation for the task
    // to see it the document associated with the task ... `jake -T`
    desc("Check Node Versions");
    task("version", function(){
        console.log("Checking Node version: .");
        var packageJson = require('./package.json');
        var expectedversion = packageJson.engines.node;

        var actualversion = process.version;
        if(semver.neq(expectedversion, actualversion)){
            fail("Incorrect Node version found: " + actualversion + " but expected: " + expectedversion);
        }
    });
    
    desc("Linting JavaScript Code");
    task("lint", function(){
        console.log("Linting JavaScript begins: ");
        
        jake.exec("node node_modules/jshint/bin/jshint jakefile.js", {interactive: true}, complete);
    }, { async: true });
    
})();