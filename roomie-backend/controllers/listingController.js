const Listing = require('./../models/listingModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const multer = require('multer');
const aws = require('aws-sdk');
const multerSharp = require('multer-sharp-s3');
const axios = require('axios');

//AWS S3 - Uploading Pictures
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  fileFilter: multerFilter,
  storage: multerSharp({
    Key: (req, file, cb) => {
      const strOne = 'listingpIC-';
      const userId = `${req.user._id}-`;
      const todaysDate = `${Date.now().toString()}.`;
      const extension = file.mimetype.split('/')[1];
      const finalStr = strOne.concat(userId, todaysDate, extension);
      cb(null, finalStr);
    },
    s3,
    Bucket: process.env.AWS_BUCKET_NAME,
    ACL: 'public-read',
    resize: {
      width: 500,
      height: 500,
    },
    toFormat: {
      type: 'jpeg',
      options: {
        progressive: true,
        quality: 100,
      },
    },
  }),
});

exports.uploadListingPhotos = upload.array('pictures', 3);
// End of AWS Code

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
  const listings = await Listing.findById(req.params.id).populate({
    path: 'owner',
    select: '_id name profilePicture',
  });

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
  if (!req.body.owner) req.body.owner = req.user.id;
  req.body.pictures = [];

  if (req.files.length !== 0) {
    req.body.pictures = req.files.map((el) => el.key);
  }

  const newListing = await Listing.create(req.body);

  res.status(201).json({
    status: 201,
    data: {
      listing: newListing,
    },
  });
});

exports.updateListing = catchAsync(async (req, res, next) => {
  if (req.files.length !== 0) {
    req.body.pictures = [];
    req.body.pictures = req.files.map((el) => el.key);
  }

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
  const listings = await Listing.findByIdAndDelete(req.params.id);

  if (!listings) {
    return next(new AppError('No listing found with that ID', 404));
  }

  res.status(204).json({
    status: 204,
    data: null,
  });
});

exports.getGeoLocation = async (req, res, next) => {
  const params = {
    access_key: process.env.POSITIONSTACK_API_KEY,
    query: req.params.address,
  };

  axios
    .get(
      `http://api.positionstack.com/v1/forward?access_key=${params.access_key}&query=${params.query}`
    )
    .then((response) => {
      res.status(200).json({
        status: 200,
        data: {
          latitude: response.data.data[0].latitude,
          longitude: response.data.data[0].longitude,
        },
      });
    })
    .catch((error) => {
      return next(new AppError('Error with API PositionStack', 404));
    });
};
