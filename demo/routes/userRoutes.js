const express = require('express');
const router = express.Router();
const userClt = require('../controllers/userClt');

router.post('/signUp', userClt.signUP);

module.exports = router;
