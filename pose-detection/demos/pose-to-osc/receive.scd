// SuperCollider code to receive the nose example
OSCdef(\nose, {
	|msg, time, addr, recvPort| 
	msg.postln;
}, '/nose'); 

