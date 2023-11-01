const userClt = require('../controllers/userClt');
const express = require('express');
const router = express.Router();


router.put('/verifyOtp', userClt.verifyOtp);
router.put('/completeProfile', userClt.completeProfile);



module.exports = router;
