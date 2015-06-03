var fs = require('fs'),
	http = require('http'),
	url = require('url');

function log(data) {
	console.log(data);
	fs.appendFile('/var/log/datastore.log', JSON.stringify(data) + '\n');
}

var server = http.createServer(function(req, res) {
	var start = new Date().getTime(),
		params = url.parse(req.url, true).query,
		correlationId = params.correlationId;
	log({
		timestamp: start,
		action: 'request received',
		url: req.url,
		correlationId: correlationId
	});

	var delay = Math.random() * 1000;
	log({
		timestamp: new Date().getTime(),
		action: 'sleeping',
		delay: delay,
		correlationId: correlationId
	});
	setTimeout(function() {
		res.end('some interesting data');
		var end = new Date().getTime();
		log({
			timestamp: end,
			action: 'response sent',
			correlationId: correlationId,
			delta: end - start,
			delay: delay
		});
	}, delay);
});

server.listen(8080);

console.log('Server started on port 8080');
