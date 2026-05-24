const express = require('express');
// import functions
const { getUsers, createUser, updateUser, deleteUser, loginUser, } = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);

// /login must come BEFORE /:id so Express doesn't treat 'login' as an id
router.post('/login', loginUser);

router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;