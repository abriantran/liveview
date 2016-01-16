console.log('project.js loaded');
var videoId = 'sGbxmsDFVnE'

function getComments() {
    gapi.client.youtube.commentThreads.list({'part': 'snippet', 'videoId': videoId, 'maxResults': 1}).then(function(resp) {
        console.log(resp.result);
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
