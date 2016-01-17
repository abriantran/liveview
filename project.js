console.log('project.js loaded');
var videoId = 'sGbxmsDFVnE'

function getComments() {
    gapi.client.youtube.commentThreads.list({'part': 'snippet', 'videoId': videoId, 'maxResults': 100}).then(function(resp) {
        //console.log(resp.result);
        resp.result.items.forEach(function(entry) {
            //console.log(entry.snippet.topLevelComment.snippet.textDisplay);
            var comment = entry.snippet.topLevelComment.snippet.textDisplay;
            if (comment.match(/t=\d+m\d\ds/)) {
                console.log(comment);
            }
        });
    }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
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
