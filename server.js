require('dotenv/config');
const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});



app.set('PORT', process.env.API_PORT || 5000);


app.post('/message', (req, res) => {
  const payload = req.body;
  pusher.trigger('orders', 'message', payload);

  
  res.send(payload)
});


app.listen(app.get('PORT'), () => 
  console.log('Listening at ' + app.get('PORT')))


