const express = require('express');
const {
  getAllListings,
  uploadListingPhotos,
  createListing,
  getListing,
  updateListing,
  deleteListing,
} = require('../controllers/listingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllListings)
  .post(authController.protect, uploadListingPhotos, createListing);

router
  .route('/:id')
  .get(getListing)
  .patch(
    authController.protect,
    authController.validateOwner,
    uploadListingPhotos,
    updateListing
  )
  .delete(authController.protect, authController.validateOwner, deleteListing);

module.exports = router;
