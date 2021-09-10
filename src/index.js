const express = require('express');
require('dotenv').config();
const app = express();
const test = require('./config/databse');

test();

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Server is up on port ', app.get('port'));
});
