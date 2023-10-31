const express = require('express');
const router = express.Router();
const userClt = require('../controllers/authClt');

router.post('/signUp', userClt.signUP);
router.post('/login', userClt.login);

module.exports = router;
