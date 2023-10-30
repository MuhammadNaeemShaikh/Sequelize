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
  getUserUsingPag,
  finder,
  getSetAndVirtual,
  validationAndConstraint,
  rawQueries,
  oneToOne,
  oneToMany,
} = require('../controller/user');

router.post('/addUser', addUser);
router.get('/getUsers', getUsers);
router.get('/getUser/:id', getUser);
router.post('/postUser', postUser);
router.delete('/User/:id', delUser);
router.put('/User/:id', updateUser);
router.get('/queryUser', queryUser);
router.post('/getUserUsingPagination', getUserUsingPag);
router.get('/finder', finder);
router.get('/getSetAndVirtual', getSetAndVirtual);
router.get('/validationAndConstraint', validationAndConstraint);
router.get('/rawQueries', rawQueries);
router.get('/oneToOne', oneToOne);
router.post('/oneToMany', oneToMany);

module.exports = router;
