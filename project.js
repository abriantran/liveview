console.log('project.js loaded');

function OnLoadCallback() {
	console.log('Init function called.');
	var secret = JSON.parse(secrets);

	gapi.client.setApiKey(secret.api_key); 
	gapi.client.load('youtube', 'v3').then(function() { console.log('API loaded.'); });

}
