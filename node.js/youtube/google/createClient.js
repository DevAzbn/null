'use strict';

var
	_APP_CONFIG_
	, fs = require('fs')
	, path = require('path')
	, APP_KEY = '4/1PL1BGfCMe9sG1qEHLU1G_jmgAY_dUhIjNe6PVFsloQ'
	, APP_OAUTH2 = require(path.resolve(__dirname, 'client_id.json'))
	, APP_TOKEN_FILE = path.resolve(__dirname, 'token.json')
;

var _GOOGLE_OBJECTS_
	, google = require('googleapis')
	, OAuth2Client = google.auth.OAuth2
;

var createClient = function() {
	
	var ctrl = this;
	
	/* ------------------- */
	
	ctrl.isAuthenticated = false;
	
	ctrl.oAuth2Client = new OAuth2Client(
		APP_OAUTH2.web.client_id,
		APP_OAUTH2.web.client_secret,
		APP_OAUTH2.web.redirect_uris[0]
	);
	
	ctrl.genAuthURL = function(scopes) {
		
		return ctrl.oAuth2Client.generateAuthUrl({
			access_type : 'offline',
			approval_prompt : 'force', //автономный доступ к акку
			scope : scopes.join(' '),
		});
		
	};
	
	ctrl.genTokens = function(_code, cb) {
		
		ctrl.oAuth2Client.getToken(_code, function(err, tokens){
			
			if (err) {
				
				console.error('Error getting oAuth tokens: ' + err);
				
			} else {
				
				ctrl.oAuth2Client.setCredentials(tokens);
				
				ctrl.isAuthenticated = true;
				
				console.log('Save tokens...');
				
				fs.writeFileSync(APP_TOKEN_FILE, JSON.stringify(tokens));
				
			}
			
			if(cb) {
				
				cb();
				
			}
			
		});
		
	};
	
	ctrl.setCredentials = function() {
		
		ctrl.oAuth2Client.setCredentials(require(path.resolve(__dirname, APP_TOKEN_FILE)));
		
	}
	
	ctrl.execute = function(callback) {
		
		//if (ctrl.isAuthenticated) {
			callback();
		//}
		
	};
	
	/* ------------------- */
	
	return ctrl;
	
}

module.exports = new createClient();