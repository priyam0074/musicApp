angular.module('myApp.mainPage', []).
directive('audioPlay',[function() {
    return {
          restrict : 'AE',
          transclude: true,
          template: '<div class="music-player">' +
        
                '<div class="spinner-wrap">' +
                    '<div class="spinner-outer">' +
                       ' <img src="https://raw.githubusercontent.com/DevTips/Animated-Music-Player/master/assets/img/spinner-outer.png"width="200" height="100"></img>'
                    +
                    '<div class="spinner-center">' +
                        '<img src="https://raw.githubusercontent.com/DevTips/Animated-Music-Player/master/assets/img/spinner-center.png" width="144" height="76"></img>' +
                    '</div>'+
                    '<div class="play-spirite">'+
                        
                    '</div>' +
                    '</div>' +
                    '</div>' +
            '<audio  loop="loop" data-bpm="86">'+
                '<source src="https://raw.githubusercontent.com/DevTips/Animated-Music-Player/master/assets/songs/jamsauce.mp3"type="audio/mp3">' +
                '<source src="https://raw.githubusercontent.com/DevTips/Animated-Music-Player/master/assets/songs/jamsauce.ogg" type="audio/ogg">' +
           '</audio>' +
            
        '</div>',
        scope: false,
        link: function(scope, element, attributes) {
             $('.spinner-wrap').click(function(){
        var audio = $(this).siblings('audio')[0];
        var self = $(this);
        if(audio.paused === false) {
            audio.pause();
            //audio.currentTime = 0;
            self.removeClass('playing');
             $('.spinner-wrap .spinner-outer .play-spirite').css("background-position", "0px 0px");
        }
        else {
          var d =   audio.play();

          d.then(function(resolve) {
             self.addClass('playing');
             $('.spinner-wrap .spinner-outer .play-spirite').css("background-position", "0px -70px");
             
          });
            
        }
        
         })
        }
    }
}] )