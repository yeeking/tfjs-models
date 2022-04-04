// very simple websocket server  that receives a 
// JSON string and decodes it
 
const WebSocket = require('ws')
const osc = require('osc-min')
const dgram = require("dgram")

const PORT = 8080
const OSCPORT = 57120;
 

const wss = new WebSocket.Server({ port: PORT })
const udp = dgram.createSocket("udp4")
 
console.log("Listening on port ", PORT);

sendOSC = function() {
  var x = osc.toBuffer({
    oscType: 'message',
    address: '/heartbeat',
    args: [{
      type: 'integer',
      value: 50
    }]
  });
  console.log("Sending OSC to " + OSCPORT);
  udp.send(x, 0, x.length, OSCPORT, '127.0.0.1');

//  return udp.send(buf, 0, buf.length, OSCPORT, "localhost");
};


wss.on('connection', ws => {
  ws.on('message', message => {
    try{
      var data = JSON.parse(message);
      //console.log(data[0]);
      sendOSC(); 
    }
    catch (error) {
      console.log("Tried to intepret message as json string but failed.");
      console.log(error);
    }
  })

  //ws.send('Hello! Message From Server!!')
})


setInterval(sendOSC, 1000);
