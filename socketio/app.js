const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
  client.on('event', data => { 
      console.log('someone link')
   });
  client.on('disconnect', () => { 
      console.log('some on disconnect')
  });
});
server.listen(3001);