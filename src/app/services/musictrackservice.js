angular.module('myApp.home')
.factory('musictrackService',['$http','$resource','$q', function($http, $resource, $q){
       var self = this;
      var url ="http://104.197.128.152:8000/v1/tracks";
        self.obj = {};
          self.obj.getGenre = $resource('http://104.197.128.152:8000/v1/tracks',{id: '@id'},
         { 'get': { method:'GET', cache: false},
          'query': { method: "GET", isArray: false },
          'save': {
            method: 'POST',
            cache: false,
            url: "http://104.197.128.152:8000/v1/tracks",
            transformRequest: function(data, headers){
                console.log(headers);
                headers = angular.extend({}, headers, {'Content-Type': 'application/json'});
                console.log(headers);
                console.log(data);
                console.log(angular.toJson(data1));
                return angular.toJson(data); // this will go in the body request
            },
            responseType : "json"
            }
        });
                var defer = $q.defer();
        self.obj.postGenre = function(data1){
             
            $http.post(url,data1,[
                {
                    isArray:true,
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                transformRequest: function(data1, headers){
                console.log(headers);
                headers = angular.extend({}, headers, {'Content-Type': 'application/json; charset=UTF-8'});
                console.log(headers);
                console.log(data1);
                console.log(angular.toJson(data1));
                return angular.toJson(data1); // this will go in the body request
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
    //     self.obj.addtrack = function(data) {
    //   return  $resource('http://104.197.128.152:8000/v1/tracks',
    //         { 'get': { method:'GET', cache: false},
    //             'save': {
    //         method: 'POST',
    //         data:data,
    //         cache: false,
    //         url: "http://104.197.128.152:8000/v1/tracks",
    //         transformRequest: function(data, headers){
    //             console.log(headers);
    //             headers = angular.extend({}, headers, {'Content-Type': 'application/json'});
    //             console.log(headers);
    //             console.log(data);
    //             console.log(angular.toJson(data));
    //             return angular.toJson(data); // this will go in the body request
    //         },
    //         responseType : "json"
    //         }
    //     });
    //     }
        return self.obj;  
}]);