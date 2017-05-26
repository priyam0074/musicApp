angular.module('myApp.home', [])
.controller('homeCtrl',['musictrackService','$q', function(musictrackService, $q) {
	var ctrl = this;
	 ctrl.welcomeText = 'Welcome to Track Home!';
     var musicGenreView = [];
	 var tempArray =[];
	 ctrl.musicGenreView = [];
	
	ctrl.starLimit= 5;
	var d ;
    ctrl.hider = false;
	ctrl.currentPage = 1;
    ctrl.searchByTrack='';
	 ctrl.clearSearch = function(){
		 ctrl.searchByTrack = '';
		 ctrl.hider =true;
	 }

ctrl.editingData = {};
    ctrl.disableButton = false;


    ctrl.modify = function(tableData){
        ctrl.editingData[tableData.id] = true;
		 ctrl.disableButton = true;
    };

    ctrl.search = function() {
		musictrackService.getGenre.get({title:ctrl.searchByTrack}).$promise.then(function(resolve){
               console.log(resolve.results)
			   ctrl.musicGenreView = resolve.results;
			   ctrl.totalItems = ctrl.musicGenreView.length;
			   ctrl.editable(ctrl.musicGenreView);
			   ctrl.itemsPerPage = Math.floor(ctrl.totalItems/3) + 1;
		},function(reject){
             console.log(reject);
		});
	}
    ctrl.update = function(tableData){
		

        ctrl.editingData[tableData.id] = false;
		 ctrl.disableButton = false;
      };	
	function getGreList() {
		console.log(musictrackService);
	//  musictrackService.get({page:1}).then(function(resolve){ // this will return promise
	// 	console.log("hello");
	// 	tempArray = resolve.data.results;
	// 	tempArray.forEach(function(element) {
	// 		//console.log(this.musicGenreView);
	// 	ctrl.musicGenreView.push(element.name);
		
	// });
  d = musictrackService.getGenre.get();
  d.$promise.then(function(resolve){
  console.log("hello");
		tempArray = resolve.results;
	            
	ctrl.musicGenreView = tempArray.slice();
	ctrl.totalItems = ctrl.musicGenreView.length;
	 ctrl.editable(ctrl.musicGenreView);
	 ctrl.itemsPerPage = Math.floor(ctrl.totalItems/3) + 1;
	// }
	},function(reject){
		console.log(reject);
	});
}
ctrl.editable = function(listofmusictracks) {
	
	 for (var i = 0, length = listofmusictracks.length; i < length; i++) {
      ctrl.editingData[listofmusictracks[i].id] = false;
    }
	   ctrl.totalItems =listofmusictracks.length;

	
	
}
    ctrl.addNewTracks = function() {

		 var newMusicTrack = {};
		 //newMusicTrack.id = 1;
		 newMusicTrack.genres = [];
		 newMusicTrack.title = ctrl.newTitle;
		 newMusicTrack.rating = ctrl.newRating;
		 newMusicTrack.genres.push({name: parseInt(ctrl.newGenre)});
		 
		 console.log(newMusicTrack);
    //var post = new musictrackService();
	// var post = musictrackService.addtrack(newMusicTrack).get({page:1},function(){
		musictrackService.postGenre(newMusicTrack).then(function(resolve) {
			console.log(resolve.data);
		
		},function(reject){
			console.log(reject);
		});
		
		 ctrl.musicGenreView.push(newMusicTrack);
		 ctrl.editable(ctrl.musicGenreView);
		 ctrl.newTitle="";
		 ctrl.newRating="";
		 ctrl.newGenre="";
		
}
	
     function init(callback) {
		 callback();
	console.log(ctrl.musicGenreView);
		 
          console.log("completed");
	 }
	 ctrl.setItemsOnPage= function(callback){
     callback(getGreList);
	//  ctrl.totalItems = ctrl.musicGenreView.length;
	//   ctrl.itemsPerPage = Math.floor(ctrl.totalItems/3) + 1;
	 }
	 ctrl.pageChanged = function() { 
         console.log(ctrl.currentPage);
         
	 };
	 ctrl.setItemsOnPage(init);
	 	
     
	
}]);