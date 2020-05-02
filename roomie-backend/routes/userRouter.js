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
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword); // Receive the Email address -> We will send the token.
router.patch('/resetPassword/:token', authController.resetPassword); // Recieve the token and the new password.
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
); // Recieve the token and the new password.

// FOCUSED ON THE ADMIN SIDE
router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

router.route('/:id/listings').get(getUserListings);

module.exports = router;
