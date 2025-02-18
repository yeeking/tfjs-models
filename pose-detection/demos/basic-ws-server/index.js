// very simple websocket server  that receives a 
// JSON string and decodes it
 
const WebSocket = require('ws')

const PORT = 8080
 
const wss = new WebSocket.Server({ port: PORT })
 
console.log("Listening on port ", PORT);

wss.on('connection', ws => {
  ws.on('message', message => {
    try{
      var data = JSON.parse(message);
      console.log(data[0]);
    }
    catch (error) {
      console.log("Tried to intepret message as json string but failed.");
      console.log(error);
    }
  })
  //ws.send('Hello! Message From Server!!')
})
