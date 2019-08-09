const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { compare } = require('bcrypt');

require('dotenv').config();
const port = process.env.PORT || 5000;
const uri = 'mongodb://localhost/project_0106';

const User = require('./models/user');
const { signPromise, verifyPromise } = require('./utils/jwt')

const { USER_ROUTER } = require('./routes/users');
const { PRODUCT_ROUTER } = require('./routes/products');
const { CATEGORIES_ROUTER } = require('./routes/categories');

app.use(cors({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));
app.use(express.static('./public'));

//Middleware router
app.use('/users', USER_ROUTER);
app.use('/categories', CATEGORIES_ROUTER);
app.use('/products', PRODUCT_ROUTER);

app.get('/', (req, res)=>{
  res.send('c');
});

//Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let infoUser = await User.findOne({email});
    if(!infoUser) res.json({ error: true, message: 'EMAIL_NOT_EXIST'});

    let isMatching = await compare(password, infoUser.password);
    if(!isMatching) res.json({ error: true, message: 'PASSWORD_NOT_MATCHING'})

    let signalSignToken = await signPromise({ email });

    setTimeout(()=> {
      res.json({ error: false, data: { email, token: signalSignToken.token}})
    }, 1500);

  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

app.get('/refresh-token/:token', async (req, res) => {
  try {
    const { token } = req.params;
    let ojbDecode = await verifyPromise(token);
    let {data: { email }} = ojbDecode;
    
    let signalSignToken = await signPromise({ email });
    res.json({ error: false, data: { email, token: signalSignToken.token }})
  } catch (error) {
    res.json({ error: true, message: error.message});
  }
});

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
mongoose.connection.once('open', ()=> {
  console.log(`MongoDB database connected successfully`);
  app.listen(port, ()=> console.log(`Server start at port ${port}`));
})