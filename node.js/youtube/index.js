'use strict';

var SEARCH_STR = 'Орлец';

var _
	, google = require('googleapis')
	, gclient = require('./google.youtube.createClient')
	, util = require('util')
	, fs = require('fs')
;

var youtube = google.youtube({
	version : 'v3',
	auth : gclient.oAuth2Client
});

var scopes = [
	'https://www.googleapis.com/auth/youtube',
	'https://www.googleapis.com/auth/youtube.upload',
];

gclient.execute(scopes, function() {
	youtube.search.list({
		part : 'id,snippet',
		q : SEARCH_STR,
	}, function (err, data) {
		if (err) {
		  console.error('Error: ' + err);
		}
		if (data) {
			//console.log(util.inspect(data, false, null));
			fs.writeFileSync(SEARCH_STR + '.json', JSON.stringify(data));
		}
		process.exit();
	});
});