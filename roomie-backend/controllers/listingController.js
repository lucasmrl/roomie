exports.getAllListings = (req, res) => {
  res.status(200).json({
    status: 200,
    results: 0,
    data: {
      listings: "all listings",
    },
  });
};
exports.getListing = (req, res) => {
  res.status(200).json({
    status: 200,
    results: 0,
    data: {
      listingID: req.params.id,
      listing: "specific listing",
    },
  });
};
exports.createListing = (req, res) => {
  res.status(201).json({
    status: 201,
    data: {
      listing: "new listing created",
    },
  });
};
exports.updateListing = (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      listing: "listing updated",
    },
  });
};
exports.deleteListing = (req, res) => {
  res.status(204).json({
    status: 204,
    data: null,
  });
};
