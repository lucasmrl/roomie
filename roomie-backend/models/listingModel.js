const mongoose = require('mongoose');

//Schema to create Models (Like a blueprint)
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Listing must have a title'],
    trim: true, //To remove space at the beginning or/and end of the string
  },
  type: {
    type: String,
    required: [true, 'Listing must have the type'],
  },
  prictureCover: {
    type: String,
  },
  pictures: [String],
  address: {
    type: String,
    required: [true, 'Listing must have the address'],
  },
  city: {
    type: String,
    required: [true, 'Listing must have the city'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'Listing must have the state'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Listing must have the country'],
    trim: true,
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
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
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
