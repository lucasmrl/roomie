const Listing = require('./../models/listingModel');

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find(); //Return an array w/ all the documents

    res.status(200).json({
      status: 200,
      results: listings.length,
      data: {
        listings,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid data sent!',
    });
  }
};
exports.getListing = async (req, res) => {
  try {
    const listings = await Listing.findById(req.params.id);

    res.status(200).json({
      status: 200,
      data: {
        listings,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid data sent!',
    });
  }
};

exports.createListing = async (req, res) => {
  try {
    const newListing = await Listing.create(req.body);

    res.status(201).json({
      status: 201,
      data: {
        listing: newListing,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid data sent!',
    });
  }
};
exports.updateListing = async (req, res) => {
  try {
    const listings = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); //Arg "{new: true}" to return the modified document rathen than the original
    //Arg "runValidators: true" validate the update operation against the model's schema

    res.status(200).json({
      status: 200,
      data: {
        listings,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 204,
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid data sent!',
    });
  }
};
