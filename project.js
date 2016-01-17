console.log('project.js loaded');
var videoId = 'sGbxmsDFVnE'
var i = 0;
var j = 0;
var stop = 5;
var parsedComments = [];

function displayComments() {
  var time = 0;
  setInterval(function () {
      console.log(++time);
      parsedComments.forEach( function(comment) {
        if (time == comment.seconds) {
          console.log(comment.text);
          document.getElementById('commentsFrame').innerHTML = comment.text;
        }
      });
  }, 1000);
}

function getComments(nextPage) {
    gapi.client.youtube.commentThreads.list({'part': 'snippet', 'videoId': videoId, 'maxResults': 100, 'pageToken': nextPage}).then(function(resp) {
        filterComments(resp.result.items);

        i = 0;
        getCommentsRepeated(resp.result.nextPageToken);
    }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
});

}

function getCommentsRepeated(nextPage) {
    if (i < stop) {
    gapi.client.youtube.commentThreads.list({'part': 'snippet', 'videoId': videoId, 'maxResults': 100, 'pageToken': nextPage}).then(function(resp) {
        filterComments(resp.result.items);
        
        i++;
        getCommentsRepeated(resp.result.nextPageToken);
    }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
});

} else {
  // Sort by time.
  parsedComments.sort(function (a, b) {
    if (a.seconds > b.seconds) {
      return 1;
    }
    if (a.seconds < b.seconds) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  console.log(parsedComments);
  console.log(JSON.stringify(parsedComments));
  displayComments();
}
}

function filterComments(commentArray) {
        commentArray.forEach(function(entry) {
            //console.log(entry.snippet.topLevelComment.snippet.textDisplay);
            var comment = entry.snippet.topLevelComment.snippet.textDisplay;
            var isMatch = comment.match(/t=\d+m\d\ds/);
            if (isMatch) {
              // Convert time to seconds.
              var time = isMatch[0];
              var timeSplit = time.split(/\D+/);
              var seconds = parseInt(timeSplit[1]) * 60 + parseInt(timeSplit[2]);
              var parsedComment = {
                text: isMatch.input,
                seconds: seconds
              };
                //console.log(parsedComment);
                parsedComments.push(parsedComment);
            }
        });
}

function OnLoadCallback() {
    console.log('Init function called.');
    var secret = JSON.parse(secrets);

    gapi.client.setApiKey(secret.api_key); 
    gapi.client.load('youtube', 'v3').then(function() {
         console.log('API loaded.'); 
         getComments();
    });

}
