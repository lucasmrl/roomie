const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserListings,
} = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

//USER SIDE
router.post('/signup', authController.signup);

// FOCUSED ON THE ADMIN SIDE
router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

router.route('/:id/listings').get(getUserListings);

module.exports = router;
