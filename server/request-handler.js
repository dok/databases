/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var storage = require('./storage.js').storage;
storage.initialize();

var qs = require('querystring');
var fs = require('fs');
var parser = require('./route-parser.js').parser;
var url = require('url');

// var messageOne = {
//     username: 'John Ford',
//     message: 'Hello this is John speaking',
//     roomname: 'Exclusive'
// };
//   var messageTwo = {
//     username: 'Kim Chi',
//     message: 'How many?',
//     roomname: 'Rice Only'
// };

// storage.push(messageOne);
// storage.push(messageTwo);


exports.handler = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode;

  if(request.method === 'GET' || request.method === 'OPTIONS') {
    statusCode = 200;
  } else if(request.method === 'POST') {
    statusCode = 201;
  }

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/json";

  /* .writeHead() tells our server what HTTP status code to send back */
  var methodType = request.method;
  response.writeHead(statusCode, headers);

  if(methodType === 'GET') {
    storage.getAll(function(messages) {
      console.log('success getting from db', messages);
      response.write(messages);
      response.end();
    });
    // debugger;
    // response.write(messages);
    // console.log(storage.getAll());
  } else if(methodType === 'POST') {
    request.on('data', function(chunk) {
      console.log('tostring', chunk.toString());
      var message;
      try {
        message = JSON.parse(chunk.toString());
      } catch (e) {
        console.log(e);
      }
      if(!message) {
        var args = chunk.toString().split('&');
        var username = args[0].replace('username=', '');
        var message = args[1].replace('message=', '');
        // message = url.parse(chunk.toString()).query;
        message = {
          username: username,
          message: message
        };
      }
      console.log('test', message);
      response.writeHead(201, headers);
      storage.push(message);
      response.end();
    });
  } else if (methodType === 'OPTIONS') {
    response.end();
  }

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/

};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
