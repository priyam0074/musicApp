angular.module('myApp.home')
.directive('starRating',[function() {
      return {
          restrict : 'AE',
          template: '<ul class="star-rating" ng-class="{editable: editable}">' +
        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}"  ng-click="edit($index)">' +
        '    <i class="glyphicon glyphicon-star"></i>' + 
        '  </li>' +
        '</ul>',
         scope: {
        ratingValue: '=ngModel',
        editable: '=ngShow'
         },
                   
          link: function(scope, element, attributes) {
              
              function updateStars() {
                   scope.stars = [];
                   scope.max = 5;
                 for (var i = 0; i < scope.max; i++) {
                   scope.stars.push({
                    filled: i < Math.floor(scope.ratingValue)
                    });
          }
        };
        scope.edit = function(index) {
          if (scope.editable === true){
            scope.ratingValue = index + 1;
            
          }
        };
        scope.$watch('ratingValue', function(oldValue, newValue) {
          if (newValue || newValue === 0) {
            updateStars();
          }
        });
        
          }
      }
}])