/* globals jake:false, desc:false, task:false, complete:false, fail:false */

(function(){
    "use strict";
    
    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
    var karma = require('simplebuild-karma');
    
    var KARMA_CONFIG = "karma.conf.js";
    
    
    //****************** General-purpose tasks
    desc("start Karma Server(run this first)");
    task("karma", function(){
        console.log("Starting karma server: ");
        
        karma.start({
            configFile: KARMA_CONFIG         
        }, complete, fail);
    }, {async: true});   
        
    desc('Default Build');
    //run version task as dependency so it runs first
    task("default", ["version", "lint", "test"], function(){
        console.log("\n\nBuild Ok");
    });
    
    desc("Run local http server");
    task("http", function(){
        jake.exec("node node_modules/http-server/bin/http-server src", {interactive: true}, complete);
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
    
    desc("Run tests");
    task("test", function(){
        console.log("Testing JavaScript");
        
        karma.run({
            configFile: KARMA_CONFIG,
            expectedBrowsers: [
                //Macs
                "Chrome 50.0.2661 (Mac OS X 10.11.4)",
                "Firefox 46.0.0 (Mac OS X 10.11.0)",
                //Windows
                "Chrome 50.0.2661 (Windows 7 0.0.0)",
                "IE 11.0.0 (Windows 7 0.0.0)",
                "Firefox 43.0.0 (Windows 7 0.0.0)",
                //iOS
                "Mobile Safari 9.0.0 (iOS 9.3.0)",
                //Android
                "Chrome Mobile 44.0.2403 (Android 6.0.0)"
            ],
            strict: !process.env.loose  // run ./jake.sh loose=true to report errors but still complete all tests
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