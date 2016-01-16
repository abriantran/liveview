console.log('project.js loaded');
var videoId = 'sGbxmsDFVnE'

function getComments() {
    gapi.client.youtube.commentThreads.list({'part': 'snippet', 'videoId': videoId, 'pageToken': 'Cg0Qq72RvbevygIgACgBEhQIABCAsviVtK_KAhjomNjP5qzKAhgCIGQo4bPN85SHv9L-AQ==', 'maxResults': 100}).then(function(resp) {
        console.log(resp.result);
        resp.result.items.forEach(function(entry) {
            console.log(entry.snippet.topLevelComment.snippet.textDisplay);
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
