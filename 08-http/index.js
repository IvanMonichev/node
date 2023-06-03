const http = require('http');
const {
	getHome,
	getHTML,
	getText,
	getComments,
	postComments,
	handleNotFound,
} = require('./handlers');
const PORT = 4000;

const server = http.createServer((request, response) => {
	if (request.method === 'GET' && request.url === '/') {
		return getHome(request, response);
	}

	if (request.method === 'GET' && request.url === '/html') {
		return getHTML(request, response);
	}

	if (request.method === 'GET' && request.url === '/text') {
		return getText(request, response);
	}

	if (request.method === 'GET' && request.url === '/comments') {
		return getComments(request, response);
	}

	if (request.method === 'POST' && request.url === '/comments') {
		return postComments(request, response);
	}

	handleNotFound(request, response);
});

server.listen(PORT, () => {
	console.log(`Server was launched on port ${PORT}`);
});
