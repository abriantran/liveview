console.log('project.js loaded');
var videoId = 'sGbxmsDFVnE'
var i = 0;
var stop = 3;
var parsedComments = [];

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
  console.log(parsedComments);
}
}

function filterComments(commentArray) {
        commentArray.forEach(function(entry) {
            //console.log(entry.snippet.topLevelComment.snippet.textDisplay);
            var comment = entry.snippet.topLevelComment.snippet.textDisplay;
            var isMatch = comment.match(/t=\d+m\d\ds/);
            if (isMatch) {
                var time = isMatch[0];
                var timeSplit = time.split(/\D+/);
                var seconds = parseInt(timeSplit[1]) * 60 + parseInt(timeSplit[2]);
                var parsedComment = {
                  time: isMatch[0],
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
