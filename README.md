Ah, you're referring to **PeerJS**, a JavaScript library for building peer-to-peer connections using WebRTC. PeerJS simplifies the process of creating WebRTC connections for real-time data sharing or media streaming.

Here's how you can manage the version of PeerJS and work with it:

---

### **Installing PeerJS**
To install PeerJS, use npm or yarn:
```bash
npm install peer
```
You can specify a particular version if needed:
```bash
npm install peer@1.3.2
```

---

### **Using PeerJS**
Here’s a basic example of using PeerJS:

#### 1. **Setting up a Peer Instance**
```javascript
import Peer from 'peerjs';

// Create a new Peer instance
const peer = new Peer('your-id', {
  host: 'your-server-host',
  port: 9000,
  path: '/peerjs',
});
```

- `your-id`: Unique ID for the peer. If omitted, PeerJS will generate a random one.
- You can customize the `host`, `port`, and `path` for your PeerJS server.

---

#### 2. **Connecting to Another Peer**
```javascript
// Connect to another peer by their ID
const connection = peer.connect('another-peer-id');

connection.on('open', () => {
  // Send data to the connected peer
  connection.send('Hello, Peer!');
});

connection.on('data', (data) => {
  console.log('Received:', data);
});
```

---

#### 3. **Receiving Connections**
```javascript
peer.on('connection', (connection) => {
  connection.on('data', (data) => {
    console.log('Received:', data);
  });

  connection.on('open', () => {
    connection.send('Hello from the other peer!');
  });
});
```

---

#### 4. **Handling Media Streams**
If you're working with audio/video:
```javascript
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then((stream) => {
    // Share your stream with a connected peer
    const call = peer.call('another-peer-id', stream);

    call.on('stream', (remoteStream) => {
      // Play the received stream in a video element
      const video = document.createElement('video');
      video.srcObject = remoteStream;
      video.play();
      document.body.appendChild(video);
    });
  });

peer.on('call', (call) => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      call.answer(stream); // Answer the call with your stream

      call.on('stream', (remoteStream) => {
        const video = document.createElement('video');
        video.srcObject = remoteStream;
        video.play();
        document.body.appendChild(video);
      });
    });
});
```

---

### **Running a PeerJS Server**
You can set up a PeerJS server if needed:
1. Install the PeerJS server package:
   ```bash
   npm install -g peer
   ```
2. Start the server:
   ```bash
   peerjs --port 9000 --key peerjs --path /peerjs
   ```

---

### **Managing Versions**
To ensure you're using a specific version of PeerJS:
- Check your `package.json`:
  ```json
  "dependencies": {
    "peer": "^1.3.2"
  }
  ```
- Lock the version:
  ```bash
  npm install peer@1.3.2
  ```

---

Let me know if you'd like help with advanced PeerJS configurations or WebRTC concepts! 🚀
