angular.module('myApp.about', [])
.controller('aboutCtrl',['musicGenreService',function(musicGenreService){
	var ctrl = this;
	ctrl.welcomeText = 'Welcome to myApp Home!';
    ctrl.defaultId = 1;
    ctrl.listOfGenres = [];
    var count = 999;
     ctrl.currentPage = 1;
	 ctrl.editingData = {};
	 ctrl.disableButton = false;

	 ctrl.modify = function(tableData){
        ctrl.editingData[tableData.id] = true;
		ctrl.disableButton = true;
    };


    ctrl.update = function(tableData){
		
        ctrl.editingData[tableData.id] = false;
		ctrl.disableButton = false;
    };	
function getlistOfGenres() {
	
   musicGenreService.getGenre(ctrl.defaultId).then(function(resolve){
        ctrl.listOfGenres = resolve.data.results;
		console.log(ctrl.listOfGenres);
	 ctrl.totalItems = ctrl.listOfGenres.length;
	//ctrl.addNewGenreId = ctrl.listOfGenres[ctrl.listOfGenres.length-1].id + 1;
	
	 ctrl.itemsPerPage = Math.floor(ctrl.totalItems/3) + 1;
	 ctrl.editable(ctrl.listOfGenres);
   },function(reject){
	   console.log(reject);
   });
} 
ctrl.addGenre =function() {
	var addGenre = {};
	
	addGenre.name = ctrl.newGENRE;
	var dell = musicGenreService.postGenre(addGenre).then(function(resolve){
             console.log(resolve.data);

			 ctrl.listOfGenres.push(resolve.data);
	ctrl.editable(ctrl.listOfGenres);
	},function(reject){
		console.log(reject);
	});

ctrl.newGENRE="";
	//   dell.success(function(data, status, headers, config) {
	// 		console.log(data);
	// 	});
    //   dell.error(function(data, status, headers, config) {
	// 		alert( "failure message: " + JSON.stringify({data: data}));
	// 	});
	// addGenre.id =  count++;
	
	

};
	ctrl.editable = function(listofMusicGenre) {
	 for (var i = 0, length = listofMusicGenre.length; i < length; i++) {
      ctrl.editingData[listofMusicGenre[i].id] = false;
    }
	}; 
	function init(callback) {
		 callback();
          console.log("completed");
	 }
	ctrl.setItemsOnPage= function(callback){
     callback(getlistOfGenres);
	};
	ctrl.pageChanged = function() { 
         console.log(ctrl.currentPage);
	 };
	ctrl.setItemsOnPage(init);
}]);
// .factory('musictrackService',['$http', function($http){
       
// return {
//       getGenres: function(){
//           var getGenre = $http.get('http://104.197.128.152:8000/v1/genres');
//           return getGenre;
//       }
// };
// }]);