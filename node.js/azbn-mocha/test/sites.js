'use strict';

var _
	, request = require('request')
	, assert = require('assert');
	//, jasmine = require('jasmine-node')
;

describe('Доступность сайтов azbn.ru', function(){
	
	var sites = [
		'https://azbn.ru/',
		'http://bercan.ru/',
	];
	
	for(var i in sites) {
		it(sites[i], function(done) {
			request(sites[i], function(error, response, body){
				expect(response.statusCode).toBe(200);
				done();
			});
		});
	}
	
});

describe('Доступность сайтов dorohovdesign.ru', function(){
	
	var sites = [
		'http://dorohovdesign.ru/',
		'http://yarus57.ru/',
		'http://fe.enerfit.ru/',
		'http://endurancerobots.com/',
	];
	
	for(var i in sites) {
		it(sites[i], function(done) {
			request(sites[i], function(error, response, body){
				expect(response.statusCode).toBe(200);
				done();
			});
		});
	}
	
});