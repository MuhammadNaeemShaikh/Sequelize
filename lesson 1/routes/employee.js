const express = require('express');
const router = express.Router();
const { addEmployee } = require('../controller/employee');

router.post('/addEmployee', addEmployee);

module.exports = router;
