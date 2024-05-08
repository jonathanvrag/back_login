const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.get('/', (req, res) => {
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

module.exports = router;
