/**
 * Serving static build
 */
const static = require('node-static');

const fileServer = new static.Server('./build', { cache: 0 });

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response);
  }).resume();
}).listen(8080);

console.log('Listening on localhost:8080');