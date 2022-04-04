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

sendOSC = function(address, coords) {
  var x = osc.toBuffer({
    oscType: 'message',
    address: address,
    args: [{
      type: 'float',
      value: coords[0]
    }, 
    {
      type: 'float',
      value: coords[1]
    }, 
     ]
  });
  udp.send(x, 0, x.length, OSCPORT, '127.0.0.1');

//  return udp.send(buf, 0, buf.length, OSCPORT, "localhost");
};

getPos = function(name, data)
{
  try{
  var kps = data[0].keypoints;
  for (var i=0;i<kps.length;i++)
  {
    if (kps[i].name == name)
    {
      console.log("Found " + name + " at " + kps[i].x);
      return [kps[i].x, kps[i].y];
    }
  }
  }catch (error)
  {
    console.log("Could not extract keypoint " + name);
    return [-1, -1];
  }
};

wss.on('connection', ws => {
  ws.on('message', message => {
    try{
      //console.log(message);
      var data = JSON.parse(message);
      // locate nose
      var pos = getPos('nose', data);
      if (pos[0] != -1)
        sendOSC('/nose', pos); 
    }
    catch (error) {
      console.log("Tried to intepret message as json string but failed.");
      console.log(error);
    }
  })

  //ws.send('Hello! Message From Server!!')
})
