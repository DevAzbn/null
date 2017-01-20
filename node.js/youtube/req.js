'use strict';

var _
	, google = require('googleapis')
	, OAuth2 = google.auth.OAuth2
	, youtube
	, key = '4/1PL1BGfCMe9sG1qEHLU1G_jmgAY_dUhIjNe6PVFsloQ'
	, secrets = require('./client_id.json')
	//, spawn = require('child_process').spawn;
;


var g_app = new OAuth2(
	secrets.web.client_id,
	secrets.web.client_secret,
	secrets.web.redirect_uris[0]
);

		g_app.setCredentials({
			access_token : key,
		});
		
		youtube = google.youtube({
			version: 'v3',
			auth: g_app
		});
		
		youtube.playlists.list({
			part: 'id,snippet',
			id: 'PLyfVJGl4hkLoZkO9c7VRJ_32b3iL7hZIH',
			//headers: headers
		}, function (_err, data, response) {
			if (_err) {
				console.error('Error: ' + _err);
			}
			if (data) {
				//console.log(util.inspect(data, false, null));
			}
			if (response) {
				console.log('Status code: ' + response.statusCode);
			}
			console.log(response);
		});

