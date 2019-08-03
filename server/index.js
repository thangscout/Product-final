const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));
app.use(express.static('./public'));

mongoose.connect(uri, { useNewUrlParser: true })
mongoose.connection.once('open', ()=> {
  console.log(`MongoDB database connected successfully`);
  app.listen(port, ()=> console.log(`Server start at port ${port}`));
})