/* globals jake:false, desc:false, task:false, complete:false, fail:false */

(function(){
    "use strict";
    
    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
    
    //****************** General-purpose tasks
    desc("start Karma Server(run this first)");
    task("karma", function(){
        console.log("Starting karma server: ");
        jake.exec("node node_modules/karma/bin/karma start");
        // jake.exec("node node_modules/karma/bin/karma run");
    });        
    desc('Default Build');
    //run version task as dependency so it runs first
    task("default", ["karma","version", "lint", "http"], function(){
        console.log("\n\nBuild Ok");
    });
    
    desc("Run http server");
    task("http", function(){
        jake.exec("node node_modules/http-server/bin/http-server src", {interactive: true}, complete);
        console.log("Running local HTTP server");
    });
    
    // ******************  Supporting Tasks
    
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
            files: ["jakefile.js","src/**/*.js"],
            options: lintOptions(),
            globals: lintGlobals()
        }, complete, fail);
    }, { async: true });
    
    function lintOptions(){
        return {
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
        };
    }
    
    function lintGlobals(){
        return {
            //mocha
            describe: false,
            it: false,
            before: false,
            beforeEach: false,
            after: false,
            afterEach: false
        };
    }
    
})();