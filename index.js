const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();

const serviceAccount = require('./loginjonathanvera-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://loginjonathanvera-8bd49-default-rtdb.firebaseio.com',
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend de inicio de sesión con Firebase');
});

app.get('/users', (req, res) => {
  const ref = admin.database().ref('users');
  ref.once(
    'value',
    snapshot => {
      res.json(snapshot.val());
    },
    error => {
      console.error(error);
      res.status(500).send('Error obteniendo los usuarios');
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
