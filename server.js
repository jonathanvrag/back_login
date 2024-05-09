const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./loginjonathanvera-firebase-adminsdk.json');

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://loginjonathanvera-8bd49-default-rtdb.firebaseio.com',
});

app.use(cors());
app.use(bodyParser.json());

const usersRoutes = require('./src/routes/users.routes');
app.use('/users', usersRoutes);
app.post('/users', (req, res) => {
  res.send('POST request to the homepage');
});

const PORT = process.env.PORT || 3000;

function start() {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

module.exports = { start };
