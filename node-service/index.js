var fs = require('fs'),
	http = require('http');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function log(data) {
	console.log(data);
	fs.appendFile('/var/log/service.log', JSON.stringify(data) + '\n');
}

var server = http.createServer(function(req, res) {
	var start = new Date().getTime(),
		correlationId = guid();
	log({
		timestamp: start,
		action: 'request received',
		url: req.url,
		correlationId: correlationId
	});

	function success() {
		res.end('some transformed datastore value');
		var end = new Date().getTime();
		log({
			timestamp: end,
			action: 'response sent',
			correlationId: correlationId,
			delta: end - start
		});
	}

	function failure() {
		res.statusCode = 500;
		res.end('Error!');
		var end = new Date().getTime();
		log({
			timestamp: end,
			action: 'error sent',
			correlationId: correlationId,
			delta: end - start
		});
	}

	var cacheHit = Math.random() > 0.5;
	if (!cacheHit) {
		log({
			timestamp: new Date().getTime(),
			action: 'cache miss, sending request',
			correlationId: correlationId
		});
		var datastoreUrl = "http://datastore:8080/?correlationId=" +
			correlationId;
		http.get(datastoreUrl, success)
			.on('error', failure);
	} else {
		log({
			timestamp: new Date().getTime(),
			action: 'cache hit',
			correlationId: correlationId
		});
		success();
	}
});

server.listen(8080);

console.log('Server started on port 8080');
