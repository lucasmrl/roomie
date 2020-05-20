const express = require('express');
const {
  getAllListings,
  uploadListingPhotos,
  createListing,
  getListing,
  updateListing,
  deleteListing,
  getGeoLocation,
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

router.route('/location/getGeo/:address').get(getGeoLocation);

module.exports = router;
