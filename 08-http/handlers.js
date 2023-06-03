const fs = require('fs');
const path = require('path');
const comments = require('./data.js');

function getHome(request, response) {
	fs.readFile('./files/comment-form.html', (err, date) => {
		if (err) {
			console.log(err);
			response.statusCode = 500;
			response.setHeader('Content-Type', 'text/plain');
			response.end('Server error while loading HTML file');
		} else {
			response.statusCode = 200;
			response.setHeader('Content-Type', 'text/html');
			response.end(date);
		}
	});
}

function getHTML(request, response) {
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/html');
	response.write('<html><body><div>');
	response.write('<p>Hello from the Node.js</p>');
	response.write('</div></body></html>');
	return response.end();
}

function getText(request, response) {
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	return response.end('This is plain text');
}

function getComments(request, response) {
	response.statusCode = 200;
	response.setHeader('Content-Type', 'application/json');
	return response.end(JSON.stringify(comments));
}

function postComments(request, response) {
	response.setHeader('Content-Type', 'text/plain');
	if (request.headers['content-type'] === 'application/json') {
		let commentJSON = '';

		request.on('data', (chunk) => (commentJSON += chunk));
		request.on('end', () => {
			try {
				comments.push(JSON.parse(commentJSON));
				response.statusCode = 200;
				response.end('Comment data was received');
			} catch (e) {
				response.statusCode = 400;
				response.end('Invalid JSON');
			}
		});
	} else {
		response.statusCode = 400;
		response.end('Data must be in the JSON format.');
	}
}

function handleNotFound(request, response) {
	response.statusCode = 404;
	response.setHeader('Content-Type', 'text/html');
	return response.end('<h1>Page not found!</h1>');
}

module.exports = {
	getHome,
	getHTML,
	getText,
	getComments,
	postComments,
	handleNotFound,
};
