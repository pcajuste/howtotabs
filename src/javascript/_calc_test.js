(function(){
    "use strict";
    
    var calc = require('./calc.js');
    var assert = require('./assert.js');
    
    describe("Addition", function(){
        
        it("adds positive numbers", function(){
            assert.equal(calc.add(3,4), 7);
        });
        
        it("adds floating numbers", function(){
            assert.equal(calc.add(0.1, 0.2), 0.30000000000000004);
        });
    });

    describe("Substraction", function(){

       it("substracts positive numbers", function(){
          assert.equal(calc.substract(40, 10), 30);
       });
       
       it("substracts floating numbers", function(){
           assert.equal(calc.substract(40.23, 20.10), 20.129999999999995);
       });
    });
 
    describe("Multiplication", function(){
        
        it("multiplies positive numbers", function(){
            assert.equal(calc.multiply(30, 3), 90);
        });
        
        it("multiplies floating numbers", function(){
           assert.equal(calc.multiply(10.3, 5.3), 54.59); 
        });
    });
    
    describe("Division", function(){
        
        it("divides positive numbers", function(){
           assert.equal(calc.divide(32, 8), 4); 
        });
    });
    // function assertEqual(actual, expected){
    //     if (actual !== expected){
    //         throw new Error("Expected: " + expected + ", but got: " + actual);
    //     }
    // }
 
})();