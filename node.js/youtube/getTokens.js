'use strict';

var
	_APP_CONFIG_
	, APP_BROWSER_PATH = 'C:/Users/Alexander/AppData/Local/Yandex/YandexBrowser/Application/browser.exe'
	//, APP_BROWSER_PATH = 'C:/Users/Дизайнер/AppData/Local/Yandex/YandexBrowser/Application/browser.exe'
	, APP_HTTP_PORT = 8080
;

var _GOOGLE_OBJECTS_
	, googleClient = require('./google/createClient')
	, http = require('http')
	, url = require('url')
	, querystring = require('querystring')
	, spawn = require('child_process').spawn
	, fs = require('fs')
;

var scopes = [
	'https://www.googleapis.com/auth/youtube',
	'https://www.googleapis.com/auth/youtube.upload',
	'https://www.googleapis.com/auth/youtube.readonly'
	'https://www.googleapis.com/auth/youtube.force-ssl',
	'https://www.googleapis.com/auth/youtubepartner',
	'https://www.googleapis.com/auth/youtubepartner-channel-audit'
];

var i = 0;

var server = http.createServer(function(request, response){
	
	i++;
	
	var p = querystring.parse(url.parse(request.url).query);
	
	if(p.code) {
		googleClient.genTokens(p.code, function(){
			
			response.end('Authentication successful!');
			server.close();
			process.exit();
			
		});
	}
	
}).listen(APP_HTTP_PORT, function(){
	
	spawn(APP_BROWSER_PATH, [googleClient.genAuthURL(scopes)]);
	
});
