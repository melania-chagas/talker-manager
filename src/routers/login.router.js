const express = require('express');

const router = express.Router();

const validationLogin = require('../middlewares/validationLogin');

const HTTP_OK_STATUS = 200;

router.post('/login', validationLogin, (req, res) => {
  /* https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details */
  const tokenPart1 = Math.random().toString(36).slice(2, 10);
  const tokenPart2 = Math.random().toString(36).slice(2, 10);
  const token = tokenPart1 + tokenPart2;
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;