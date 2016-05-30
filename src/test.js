(function(){
    "use strict";
    
    // var assert = require('chai').assert;
    
    describe("Addition", function(){
        
        it("adds positive numbers", function(){
            assertEqual(add(3,4), 7);
        });
        
        it("adds floating numbers", function(){
            assertEqual(add(0.1, 0.2), 0.30000000000000004);
        });
        
        // it("prints your full name", function(){
        //     assertEqual(whoami("johnny", "cajuste"), "your name is johnny cajuste");
        // })
        // it("obtains user's full name", function(){
        //     assert.equal(getUserName())
        // })
    });

    function add(a, b){
       return a + b;
    }
    
    function assertEqual(actual, expected){
        if (actual !== expected){
            throw new Error("Expected: " + expected + ", but got: " + actual);
        }
    }
    // function whoami(firstname, lastname){
    //     return "your name is " + firstname + " " + lastname;
    // }
    // function getUserName(firstname, lastname){
    //     var firstname = prompt("what's your firstname?");
    //     var lastname = prompt("what's your lastname?");
        
    //     return "your full name is " + firstname + " " + lastname;
    // }
})();