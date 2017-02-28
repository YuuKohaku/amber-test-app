var app = require('../app');
var debug = require('debug')('amber-test-app:server');
var http = require('http');

var port = parseInt(process.env.PORT || '3000', 10);
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Cannot listen on ${port}: access denied.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Cannot listen on ${port}: address in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
);

server.on('listening', () => {
  var addr = server.address();
  debug(`Listening on port ${addr.port}`);
}
);