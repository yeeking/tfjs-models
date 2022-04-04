Instructions to set up 'pose to websocket' system.

## Install node.js:

https://nodejs.org/en/

## Clone this repo:

git clone git@github.com:yeeking/tfjs-models.git

## Start the websocket server:

cd tfjs-models/pose-detection/demos/basic-ws-server

npm install

node index.js

## Follow these instructions to run the posenet to ws system:

https://github.com/yeeking/tfjs-models/tree/master/pose-detection/demos

something like:

* Go to the demo folder cd live_video
* Remove cache etc. rm -rf .cache dist node_modules
* Build dependency. yarn build-dep
* Install dependencies. yarn
* Run the demo. yarn watch
* Point your browser at localhost:1234/?model=movenet

## Watch the websocket server receive data

You should get a load of data flowing past on the websocket server. 

## Send OSC to SuperCollider:

```
cd tfjs-models/pose-detection/demos/pose-to-osc

npm install

node index.js
```

At the moment, it only sends the nose position

In SuperCollider, you can receive the nose:

```
OSCdef(\nose, {
	|msg, time, addr, recvPort| 
	msg.postln;
}, '/nose'); // def style

```






