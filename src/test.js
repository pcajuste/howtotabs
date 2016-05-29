(function(){
    "use strict";
    
    function add(a, b){
       return a - b;
    }
    
    var actual = add(3, 4);
    var expected = 7;
    if(actual !== expected){
        throw new Error("Expected: " + expected + ", but got: " + actual);
    }
    
})();