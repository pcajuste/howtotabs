/* globals desc: false, task: false, complete: false, fail: false */

(function(){
    "use strict";
    
    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
            
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
       process.stdout.write("Linting JavaScript begins: ");
        
        // this codes checks if the entire jakefile has any errors
        // jake.exec("node node_modules/jshint/bin/jshint jakefile.js", {interactive: true}, complete);
        
        //better alternative than above is simplebuild-jshint
        jshint.checkFiles({
            files: "jakefile.js",
            options: {
                bitwise: true,
                eqeqeq: true,
                curly: true,
                freeze: true,
                futurehostile: true,
                latedef: "nofunc",
                noarg: true,
                nocomma: true,
                nonbsp: true,
                nonew: true,
                strict: true,
                undef: true,
                
                node: true,
                browser: true
            },
            globals: {}
        }, complete, fail);
    }, { async: true });
    
})();