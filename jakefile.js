(function(){
    "use strict";
    
    console.log("\n\nBuild Ok");
    
    desc('Default Build');
    task("default", function(){
        console.log("I'm the default task.");
    });
    
    //desc is the documentation for the task
    // to see it the document associated with the task ... `jake -T`
    desc("Pure Ridculousity")
    task("gooble", function(){
        console.log("I'm the gooble task.");
    })
    
})();