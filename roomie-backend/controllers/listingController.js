const Listing = require('./../models/listingModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllListings = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Listing.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const listings = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 200,
    results: listings.length,
    data: {
      listings,
    },
  });
});

exports.getListing = catchAsync(async (req, res, next) => {
  const listings = await Listing.findById(req.params.id);

  if (!listings) {
    return next(new AppError('No listing found with that ID', 404));
  }

  res.status(200).json({
    status: 200,
    data: {
      listings,
    },
  });
});

exports.createListing = catchAsync(async (req, res, next) => {
  const newListing = await Listing.create(req.body);

  res.status(201).json({
    status: 201,
    data: {
      listing: newListing,
    },
  });
});

exports.updateListing = catchAsync(async (req, res, next) => {
  const listings = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }); //Arg "{new: true}" to return the modified document rathen than the original
  //Arg "runValidators: true" validate the update operation against the model's schema

  if (!listings) {
    return next(new AppError('No listing found with that ID', 404));
  }

  res.status(200).json({
    status: 200,
    data: {
      listings,
    },
  });
});

exports.deleteListing = catchAsync(async (req, res, next) => {
  const listgins = await Listing.findByIdAndDelete(req.params.id);

  if (!listings) {
    return next(new AppError('No listing found with that ID', 404));
  }

  res.status(204).json({
    status: 204,
    data: null,
  });
});
