require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('./components/home/home.js');
require('./components/about/about.js');
require('./services/musictrackservice.js');
require('./services/musicGenreService.js');
require('./filters/track-listFilter.js');
require('./directives/ratingDirective.js');
require('./directives/loading.js');

var app = angular.module('myApp', ['ui.bootstrap','ui.router','ngResource','ngMaterial','myApp.home','myApp.about']);

app.config(['$stateProvider','$locationProvider','$httpProvider','$urlRouterProvider','$resourceProvider','$qProvider',
function($stateProvider,$locationProvider,$httpProvider, $urlRouterProvider, $resourceProvider,$qProvider) {
	    
			$locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
		    	$resourceProvider.defaults.stripTrailingSlashes = false;
	        $qProvider.errorOnUnhandledRejections(false);
        	$urlRouterProvider.otherwise("/");
	        // $httpProvider.interceptors.push('loading');
	//         var spinnerFunction = function spinnerFunction(data, headersGetter) {
  //                 $("#spinner").show();
  //                   return data;
  //                 };

  // $httpProvider.defaults.transformRequest.push(spinnerFunction);

	$stateProvider
	.state('home', {
		url: "/",
		views : {
			"" : {
				templateUrl:"app/components/home/home.html"
			},
			"header@home":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	})
	.state('about', {
		url: "/about",
		views : {
			"" : {
				templateUrl:"app/components/about/about.html"
			},
			"header@about":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	});
}]);
app.directive('loading',['$http', function ($http)
    {
        return {
			transclude: true,
            restrict: 'A',
			
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };

    }]);