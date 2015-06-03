var http = require('http');

var url = process.argv[2],
	delay = process.argv[3],
	randomisation = process.argv[4],
	counter = 0;

function run() {
	console.log(counter++);
	http.get(url);
	setTimeout(run, (1 - randomisation * Math.random()) * delay);
}
run();