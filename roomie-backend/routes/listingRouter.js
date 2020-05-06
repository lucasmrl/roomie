const express = require('express');
const {
  getAllListings,
  createListing,
  getListing,
  updateListing,
  deleteListing,
} = require('../controllers/listingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, getAllListings)
  .post(authController.protect, createListing);

router
  .route('/:id')
  .get(getListing)
  .patch(updateListing)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    deleteListing
  );

module.exports = router;
