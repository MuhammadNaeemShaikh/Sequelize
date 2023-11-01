const express = require('express');
const router = express.Router();
const orderClt = require('../controllers/orderClt');
const { verifyToken,verifyTokenAndAdmin } = require('../middleware/verifyToken');

router.post('/postOrder', verifyToken, orderClt.addOrder);
router.get('/getOrderDetails', verifyTokenAndAdmin, orderClt.getOrdersDetail);

module.exports = router;
