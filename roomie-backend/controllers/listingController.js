const Listing = require('./../models/listingModel');

exports.getAllListings = async (req, res) => {
  try {
    /* In order to allow future developemnt of pagination, sorting, etc, I:
     * 1)Made a hard copy of the Query Object
     * 2)Create a array of the fields that I want to exclude from the queryObj
     * 3)Used a forEach (to not create a new array) in order to remove these fields from the Oject
     * that will be used in the .find()
     */
    const queryObj = { ...req.query }; //Copy of the Query Obj
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    const listings = await Listing.find(queryObj); //find() = Return an array w/ all the documents
    //"Listing.find(queryObj)" returns a query - that is why I can chain others methods (to sort, to use paginations,etc...)

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
