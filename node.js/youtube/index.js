'use strict';

var _
	, google = require('googleapis')
	, OAuth2 = google.auth.OAuth2
	, secrets = require('./client_id.json')
	, spawn = require('child_process').spawn;
;


var g_app = new OAuth2(
	secrets.web.client_id,
	secrets.web.client_secret,
	secrets.web.redirect_uris[0]
);

var scopes = [
	'https://www.googleapis.com/auth/youtube',
];

var authorizeUrl = g_app.generateAuthUrl({
	access_type : 'offline',
	scope : scopes.join(' ')
});

spawn('C:/Users/Дизайнер/AppData/Local/Yandex/YandexBrowser/Application/browser.exe', [authorizeUrl]);