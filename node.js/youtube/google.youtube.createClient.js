'use strict';

var
	_APP_CONFIG_
	, APP_KEY = '4/1PL1BGfCMe9sG1qEHLU1G_jmgAY_dUhIjNe6PVFsloQ'
	, APP_OAUTH2 = require('./client_id.json')
	, APP_HTTP_PORT = 8080
	, APP_BROWSER_PATH = 'C:/Users/Alexander/AppData/Local/Yandex/YandexBrowser/Application/browser.exe'
	//, APP_BROWSER_PATH = 'C:/Users/Дизайнер/AppData/Local/Yandex/YandexBrowser/Application/browser.exe'
;

var _GOOGLE_OBJECTS_
	, google = require('googleapis')
	, OAuth2Client = google.auth.OAuth2
	, http = require('http')
	, url = require('url')
	, querystring = require('querystring')
	, called = false
	, spawn = require('child_process').spawn
	, fs = require('fs')
;

var callOnce = function(callback) {
	if (!called) {
		called = true;
		callback();
	}
}

var handler = function(request, response, server, callback) {
	
	var ctrl = this;
	
	/* ------------------- */
	
	var qs = querystring.parse(url.parse(request.url).query);
	
	ctrl.oAuth2Client.getToken(qs.code, function (err, tokens) {
		if (err) {
			console.error('Error getting oAuth tokens: ' + err);
		}
		ctrl.oAuth2Client.setCredentials(tokens);
		ctrl.isAuthenticated = true;
		fs.writeFileSync('token', JSON.stringify(tokens));
		response.end('Authentication successful! Please return to the console.');
		callback(tokens);
		server.close();
	});
	
	/* ------------------- */
	
}


var clientYT = function(params) {
	
	var ctrl = this;
	
	/* ------------------- */
	
	ctrl.isAuthenticated = false;
	
	ctrl._options = params || { scopes : [], };
	
	ctrl.oAuth2Client = new OAuth2Client(
		APP_OAUTH2.web.client_id,
		APP_OAUTH2.web.client_secret,
		APP_OAUTH2.web.redirect_uris[0]
	);
	
	ctrl._authenticate = function (scopes, callback) {
		
		ctrl.authorizeUrl = ctrl.oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope : scopes.join(' ')
		});
		
		var server = http.createServer(function (request, response) {
			callOnce(function () {
				handler.call(ctrl, request, response, server, callback);
			});
		}).listen(APP_HTTP_PORT, function () {
			// open the browser to the authorize url to start the workflow
			spawn(APP_BROWSER_PATH, [ctrl.authorizeUrl]);
		});
	
	};
	
	ctrl.execute = function (scopes, callback) {
		
		ctrl._callback = callback;
		
		if (ctrl.isAuthenticated) {
			callback.apply();
		} else {
			ctrl._authenticate(scopes, callback);
		}
		
	};
	
	/* ------------------- */
	
	return ctrl;
	
}

module.exports = new clientYT();