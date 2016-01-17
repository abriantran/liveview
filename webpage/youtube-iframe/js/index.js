/*
       * Polling the player for information
       */
      
      // Update a particular HTML element with a new value
      function updateHTML(elmId, value) {
        document.getElementById(elmId).innerHTML = value;
      }
      
      // This function is called when an error is thrown by the player
      function onPlayerError(errorCode) {
        alert("An error occured of type:" + errorCode.data);
      }
      
      // This function is called when the player changes state
      function onPlayerStateChange(newState) {
        updateHTML("playerState", newState.data);
      }
      
      // Display information about the current state of the player
      function updatePlayerInfo() {
        // Also check that at least one function exists since when IE unloads the
        // page, it will destroy the SWF before clearing the interval.
        if(ytplayer && ytplayer.getDuration) {
          updateHTML("videoDuration", ytplayer.getDuration());
          updateHTML("videoCurrentTime", ytplayer.getCurrentTime());
          updateHTML("bytesTotal", ytplayer.getVideoBytesTotal());
          updateHTML("startBytes", ytplayer.getVideoStartBytes());
          updateHTML("bytesLoaded", ytplayer.getVideoBytesLoaded());
        }
      }
      
      // This function is automatically called by the player once it loads
      /*function onYouTubePlayerReady(player) {
        ytplayer = document.getElementById("myYouTubePlayer");
        // This causes the updatePlayerInfo function to be called every 250ms to
        // get fresh data from the player
        setInterval(updatePlayerInfo, 250);
        updatePlayerInfo();
        ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
        ytplayer.addEventListener("onError", "onPlayerError");
      }*/
      

      // The "main method" of this sample. Called when someone clicks "Run".
      var tag = document.createElement('script');
      
            tag.src = "http://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      var ytplayer;
            function onYouTubeIframeAPIReady() {
              
              ytplayer = new YT.Player('myYouTubePlayer', {
                height: '720',
                width: '1080',
                videoId: 'sGbxmsDFVnE',
                //playerVars: { 'autoplay': 1, 'controls': 0 },
                playerVars: { 'rel': 0, 'showinfo': 0, 'theme': 'dark', 'origin': '<?=site_url(); ?>' },
                events: {
                  'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange,
                  'onError': onPlayerError
                }
              });
              //setInterval(updatePlayerInfo, 250);
              //updatePlayerInfo();
              //player.addEventListener("onStateChange", "onPlayerStateChange");
              //player.addEventListener("onError", "onPlayerError");
            }
      
            // 4. The API will call this function when the video player is ready.
            function onPlayerReady(event) {
              event.target.playVideo();
              setInterval(updatePlayerInfo, 250);
              updatePlayerInfo();
           }
      
            // loads the video and autoplays it
            function playVideo() {
                ytplayer.loadVideoById("W16AKC133Qk");
                ytplayer.playVideo();
            }
      
      function _run() {
        //setTimeout(playVideo, 3000);
      }
      google.setOnLoadCallback(_run);