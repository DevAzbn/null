'use strict';

var
	_APP_OBJECTS_
	, util = require('util')
	, fs = require('fs')
	, APP_SEARCH_STR = 'в орле'
;

var _GOOGLE_OBJECTS_
	, google = require('googleapis')
	, googleClient = require('./google/createClient')
;

googleClient.setCredentials();

var youtube = google.youtube({
	version : 'v3',
	auth : googleClient.oAuth2Client
});

googleClient.execute(function() {
	
	youtube.subscriptions.list({
		part : 'id,snippet',
		maxResults : 50,
		mine : true,
		
		//order : 'date',//для видео
		//type : 'video',//при поиске
		//myRating : 'like',
		
		//chart : 'mostPopular',
		//q : APP_SEARCH_STR,//для поиска
		
	}, function (err, data) {
		
		if (err) {
			
			console.error(err);
			
		} else {
			
			if (data) {
				
				//console.log(util.inspect(data, false, null));
				console.log('Save data...');
				
				// APP_SEARCH_STR + '.json'
				fs.writeFileSync('./data/_.js', 'var __data = ' + JSON.stringify(data) + ';');
				//process.exit();
				
			} else {
				
				console.log('No data');
				
			}
			
		}
		
		//process.exit();
	});
	
});