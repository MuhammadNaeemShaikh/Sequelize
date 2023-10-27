const express = require('express');
const router = express.Router();
const {
  addUser,
  getUsers,
  getUser,
  postUser,
  delUser,
  updateUser,
  queryUser,
  getUserUsingPag
} = require('../controller/user');

router.post('/addUser', addUser);
router.get('/getUsers', getUsers);
router.get('/getUser/:id', getUser);
router.post('/postUser', postUser);
router.delete('/User/:id', delUser);
router.put('/User/:id', updateUser);
router.get('/queryUser', queryUser);
router.post('/getUserUsingPagination', getUserUsingPag);

module.exports = router;
