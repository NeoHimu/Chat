var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.send('<h1> Hello world! </h1>');
});

io.on('connection', function(socket){
	// console.log("a user is connected");
	socket.on('chat message ', function(msg){
	    console.log('message: ' + JSON.stringify(msg));
	    io.emit("chat message", msg);
  });
});

http.listen(3001, function(){
	console.log('listening to : 3001');
});