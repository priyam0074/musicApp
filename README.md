
## Quick Start
Download the code as zip from the right or clone the repository.</br>
Run `npm install` </br>
Install gulp globally `npm install gulp -g` </br>
Run `gulp` </br>

Your project would run in firefox browser (since its configured that way), you can change the browser or add another browser by editing the browser-sync task in gulpfile.js



Now let talk about various component and phases of this project.

app starts at index.html where i have put in a dependencies(manual) required for the view of the page.

app.module('name of app',[dependencies required before bootstrap the app]).

There are two parts to starting an AngularJS application:

Loading the AngularJS source code
We have included the unminified version directly from the Google Hosted Libra‐
ries, but you could also have your own local version that you serve. The Google
CDN hosts all the latest versions of AngularJS that you can directly reference it
from, or download it from the AngularJS website.

Bootstrapping AngularJS
This is done through the ng-app directive. This is the first and most important
directive that AngularJS has, which denotes the section of HTML that AngularJS
controls. Putting it on the <html> tag tells AngularJS to control the entire HTML
application. We could also put it on the <body> or any other element on the page.
Any element that is a child of that will be handled with AngularJS and be annotated
with directives, and anything outside would not be processed.

what is app.module?
it is basicially a way to packaging a relevant piece of code under a single name.it basicially can define its services ,controller,directive under it and provide an efficient way to inject your dependencies before before module loads.  

in our case:-
angular.module('myApp', ['ui.bootstrap','ui.router','ngResource','ngMaterial','myApp.home','myApp.about','myApp.mainPage']);

myApp is the name of the app. 
ui.bootstrap requied to use bootstrap in as a angular dependency .this is basicially used for injecting ui.bootstrap component into angular like ui.modal and ui.tooltip
for more learning on ui-modal and ui.tooltip go to https://angular-ui.github.io/bootstrap/.

[ARIA stands for “Web Accessibility Initiative – Accessible Rich Internet Applications”. It is a set of attributes to help enhance the semantics of a web site or web application to help assistive technologies, such as screen readers for the blind, make sense of certain things that are not native to HTML.]
basicially used in various <i>frames examples:- <i class="glyphicon glyphicon-star"></i>

iframe must have accessible name.
definition:- iframe element must have an accessible name to support screen reader navigation.
Purpose	:-Screen readers provide a means to navigate web page content using iframe elements.
The accessible name of the iframe element must describe the contents of the iframe.
The accessible name helps users to decide whether they want to navigate to a iframe.
 
 TECHNIQUES:-
	
Use the title attribute to define an accessible name for an iframe element.
Use the aria-label attribute to define an accessible name for an iframe element.
Use the aria-labelledby attribute to define an accessible name for an iframe element.
Accessible names should be short and describe the contents of the iframe element to help users to decide whether to navigate to the iframe.
For iframes with no visible content, explicitly identify the iframe as having no information for the user (e.g. title="No content").


UI.ROUTER FOR using ui.route instead of ng-route .we ll talk about it bit later.
we have several other angular module as a dependency inside the parent app such as myApp.home,myApp.about,myApp.mainPage
If we want to load an existing module that has already been defined in some other file,
we use the the angular.module function with just the first argument, as follows:
angular.module('MyApp');
This line of code tells AngularJS to find an existing module named notesApp, and to make it available to use, add, or modify in the current file.

mistake generally developer do is they trying to define a module, but forgetting to pass in the second argument. This
would cause AngularJS to try to look up a module instead of defining one, and we would get an error.

Here's the calling order after bootstrapping of module:

app.config()
app.run()
directive's compile functions (if they are found in the dom)
app.controller()
directive's link functions (again, if found).

what is app.config?
app.config talk about the configuration phase of the angular app.
In .config you can only use providers (e.g. $routeProvider). in .run you can only use instances of services (e.g. $route). You have a factory, not a provider. 

as you look below,you'll see various provider are stated down, we do let us to inject service dependency in the app in the initial before going upto controllers,services,factory etc..
for example:- app.config(['$routeProvider',function($routeProvider) {
                      $routeProvider.when('/',
                      {
                      templateUrl: "*.html",
                      controller: "controller.js"
                      }
}])
you cannot use instances of service in config function.
app.config(['$stateProvider','$locationProvider','$httpProvider','$urlRouterProvider','$resourceProvider','$qProvider',
function($stateProvider,$locationProvider,$httpProvider, $urlRouterProvider, $resourceProvider,$qProvider).

now talk about routing:-

States vs URL Route

With this approach, your views and routes aren't tied down to the site URL. This way, you can change the parts of your site using your routing even if the URL does not change.

When using ngRoute, you'd have to use ngInclude or other methods and this could get confusing. Now that all of your states, routing, and views are handled in your one .config(), this would help when using a top-down view of your application.

When creating a link with UI-Router, you will use ui-sref. The href will be generated from this and you want this to point to a certain state of your application. These are created in your app.js.
 
NESTED VIEW using ui-router
 $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
        url: '/home',
        templateUrl: 'partial-home.html'
    })

    // nested list with custom controller
    .state('home.list', {
        url: '/list',
        templateUrl: 'partial-home-list.html',
        controller: function($scope) {
            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        }
    })

    // nested list with just some random string data
    .state('home.paragraph', {
        url: '/paragraph',
        template: 'I could sure use a drink right now.'
    })
    
  multiple view across ui-router
  
  .state('about', {
        url: '/about',
        views: {

            // the main template will be placed here (relatively named)
            '': { templateUrl: 'partial-about.html' },

            // the child views will be defined here (absolutely named)
            'columnOne@about': { template: 'Look I am a column!' },

            // for column two, we'll define a separate controller 
            'columnTwo@about': { 
                templateUrl: 'table-data.html',
                controller: 'scotchController'
            }
        }

    });

});

Relative vs Absolute Naming

UI-Router assigns every view to an absolute name. The structure for this is viewName@stateName. Since our main ui-view inside our about state, we gave it a blank name. The other two views because columnOne@about and columnTwo@about.

                                    ui-router                                         ng-router

Module name                         ui.router                                         ngRoute
(dependent module)	
                                   (eg) angular.module('app', ['ui.router']);	      (eg) angular.module('app', ['ngRoute']);

Router provider                    $stateProvider                                     $routeProvider
                                   $urlRouterProvider
                                   
Simple Syntax                     $stateProvider.state('customersState', {           $routeProvider.when('/customers', {
                                      url: '/customers',                                template: 'My Customers'
                                     template: 'My Customers'                            })
                                   })
Template view directive            ui-view	                                           ng-view

Template named view directive	     ui-view="customers"                                  -------------

Link directive                    ui-sref=""                                          href="" 
                                 (eg)                                                 (eg)
                                 <a ui-sref="customersState">                         <a href="#/customers"> Customers </a>
                                 Customers </a>

Default View		
Default View	                   $urlRouterProvider.otherwise('/customers');	         $routeProvider.otherwise({redirectTo:                                                                                                      '/customers'});


Methods		
One view to another view	       $state.go('customersState');                         	$location.path( "/customers" );

One view to another 	           $state.go('customersState', {id:'123'});	              $location.path( "/customer/123" );
view with params

Params		
Getting Params (as                $state                                                $route
a service)	                      (eg) $state.params.id                                 (eg) $route.current.params.id
                                  $stateParams                                         $routeParams
                                 ( eg) $stateParams.id                                 (eg) $routeParams.id
                            
                            
                            
 $locationProvider
- $location
- provider in module ng
Use the $locationProvider to configure how the application deep linking paths are stored.
it has two methods:
hashPrefix([prefix]);
The default value for the prefix is '!'.

html5Mode([mode]);

Param	       Type                 	Details
mode        booleanObject	          If boolean, sets html5Mode.enabled to value. If object, sets enabled, requireBase and rewriteLinks   (optional)                          to respective values. Supported properties:
                                    enabled – {boolean} – (default: false) If true, will rely on history.pushState to change urls where                                     supported. Will fall back to hash-prefixed paths in browsers that do not support pushState.
                                    requireBase - {boolean} - (default: true) When html5Mode is enabled, specifies whether or not a tag                                     is required to be present. If enabled and requireBase are true, and a base tag is not present, an                                       error will be thrown when $location is injected. See the $location guide for more information                                           rewriteLinks - {boolean|string} - (default: true) When html5Mode is enabled, enables/disables URL                                       rewriting for relative links. If set to a string, URL rewriting will only happen on links with an                                       attribute that matches the given string. For example, if set to 'internal-                                                               link', then the URL will only be rewritten for <a internal-link> links. Note that attribute name                                         normalization does not apply here, so 'internalLink' will not match 'internal-link'.
   for example:-                               
   $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
   and put <base> inside <head> in index.html.
   
 $resourceProvider
- $resource
- provider in module ngResource
Use $resourceProvider to change the default behavior of the $resource service.
Properties
defaults
Object containing default options used when creating $resource instances.

The default values satisfy a wide range of usecases, but you may choose to overwrite any of them to further customize your instances. The available properties are:

stripTrailingSlashes – {boolean} – If true, then the trailing slashes from any calculated URL will be stripped.
(Defaults to true.)
cancellable – {boolean} – If true, the request made by a "non-instance" call will be cancelled (if not already completed) by calling $cancelRequest() on the call's return value. For more details, see $resource. This can be overwritten per resource class or action.
(Defaults to false.)
actions - {Object.<Object>} - A hash with default actions declarations. Actions are high-level methods corresponding to RESTful actions/methods on resources. An action may specify what HTTP method to use, what URL to hit, if the return value will be a single object or a collection (array) of objects etc. For more details, see $resource. The actions can also be enhanced or overwritten per resource class.
The default actions are:
{
  get: {method: 'GET'},
  save: {method: 'POST'},
  query: {method: 'GET', isArray: true},
  remove: {method: 'DELETE'},
  delete: {method: 'DELETE'}
}
   

	









