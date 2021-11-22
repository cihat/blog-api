const mongoose = require('mongoose');
require('dotenv').config()

const CONNECT_URL = process.env.MONGOURI || 'mongodb://localhost:27017/blog-api';


mongoose.connect(CONNECT_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database🚀');
  })
  .catch(err => console.log(err));