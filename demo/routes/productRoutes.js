const express = require('express');
const router = express.Router();
const productClt = require('../controllers/productClt');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');

router.post('/addProduct', verifyTokenAndAdmin, productClt.addProduct);

module.exports = router;
