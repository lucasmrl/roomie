const express = require('express');
const {
  updateMe,
  deleteMe,
  getUser,
  uploadUserPhoto,
} = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, uploadUserPhoto, updateMe);
router.delete('/deleteMe', authController.protect, deleteMe);

router.route('/:id').get(getUser);

module.exports = router;
