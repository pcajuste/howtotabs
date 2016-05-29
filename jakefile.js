(function(){
    "use strict";
    
    //helpful to verify version between two apps
    var semver = require('semver');
            
    desc('Default Build');
    //run version task as dependency so it runs first
    task("default", ["version"], function(){
        console.log("\n\nBuild Ok");
    });
    
    //desc is the documentation for the task
    // to see it the document associated with the task ... `jake -T`
    desc("Check Node Versions")
    task("version", function(){
        console.log("Checking Node version: .");
        var packageJson = require('./package.json');
        var expectedversion = packageJson.engines.node;

        var actualversion = process.version;
        if(semver.neq(expectedversion, actualversion)){
            fail("Incorrect Node version found: " + actualversion + " but expected: " + expectedversion);
        }
    });
    
})();