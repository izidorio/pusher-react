require('dotenv/config');
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
//   useTLS: true,
});

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});
app.post("http://localhost:3000/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  // Primitive auth: the client self-identifies. In your production app,
  // https://pusher.com/docs/channels/getting_started/javascript-realtime-user-list
  // the client should provide a proof of identity, like a session cookie.
  const user_id = req.header.user_id;
  const presenceData = { user_id };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});
const port = process.env.API_PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));