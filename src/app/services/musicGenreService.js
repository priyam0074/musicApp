angular.module('myApp.about')
.service('musicGenreService',['$http','$q', function($http, $q){
var url = "http://104.197.128.152:8000/v1/genres";
        this.getGenre = function(id1) {
         return  $http(
             {
              method: 'GET',
              url:   url,
             params: {page:id1}
            });
        }
        var defer = $q.defer();
        this.postGenre = function(data1){
             
            $http.post(url,data1,[
                {
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                transformRequest: function(data1, headers){
                console.log(headers);
                headers = angular.extend({}, headers, {'Content-Type': 'application/json; charset=UTF-8'});
                console.log(headers);
                console.log(data);
                console.log(angular.toJson(data));
                return angular.toJson(data); // this will go in the body request
            },
            responseType : "json"
            }]).then(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                defer.resolve(data);
                    },function(reject) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                window.data = data;
            });

    return defer.promise;

        }
}]);
       