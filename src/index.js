const express = require('express');
require('dotenv').config();
const app = express();
const sequelize = require('./config/database');
const cors = require('cors');
app.use(cors());

//check if database connection has been established
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
//check if table was created
app.use(express.json({ extended: false }));
// routes:
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/gasto', require('./routes/gasto'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Server is up on port ', app.get('port'));
});
