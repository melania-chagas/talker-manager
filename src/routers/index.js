const express = require('express');

const router = express.Router();

const loginRouter = require('./login.router');
const talkerRouter = require('./talker.router');

router.use(loginRouter);
router.use(talkerRouter);

module.exports = router;