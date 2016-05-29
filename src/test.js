(function(){
    "use strict";
    
    function add(a, b){
       return a + b;
    }
    
    // var actual = add(3, 4);
    // var expected = 7;
    // if(actual !== expected){
    //     throw new Error("Expected: " + expected + ", but got: " + actual);
    // }
    function assertEqual(actual, expected){
        if(actual !== expected){
            throw new Error("Expected: " + expected + ", but got: " + actual);
        }
        
    }
    assertEqual(add(6,4), 10);
    
})();