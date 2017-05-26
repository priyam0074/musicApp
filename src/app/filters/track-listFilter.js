angular.module('myApp.home')
.filter('combineGenre', function(){
    return function(input) {
         var str = [];
         var size= input.length;
         if(size< 1) {
           str.push("other");
         }
    input.forEach(function(element) {
        if(size <=1)
        str.push(element.name);
        else 
        str.push(element.name + '|' );
        size--;
    }, this);
    
    return str;
    }
})