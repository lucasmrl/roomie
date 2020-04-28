const mongoose = require('mongoose');

//Schema to create Models (Like a blueprint)
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Listing must have a title'],
  },
  type: {
    type: String,
    required: [true, 'Listing must have the type'],
  },
  pictures: [],
  address: {
    type: String,
    required: [true, 'Listing must have the address'],
  },
  city: {
    type: String,
    required: [true, 'Listing must have the city'],
  },
  state: {
    type: String,
    required: [true, 'Listing must have the state'],
  },
  country: {
    type: String,
    required: [true, 'Listing must have the country'],
  },
  zip: {
    type: Number,
    required: [true, 'Listing must have the zip code'],
  },
  utilitiesIncl: {
    type: Boolean,
    required: [
      true,
      'Listing must include the information about the utilities',
    ],
  },
  rent: {
    type: Number,
    required: [true, 'Listing must have the rent'],
  },
  description: {
    type: String,
    required: [true, 'Listing must have a short description'],
  },
  createdDate: String,
  availableDate: String,
  petAllowed: Boolean,
  buildingType: String,
  owner: Number,
  contactPhone: Number,
  contactEmail: String,
});

//Convention is to use uppercase letter to Models
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
