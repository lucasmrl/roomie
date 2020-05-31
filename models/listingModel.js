const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Listing must have a title'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Listing must have the type'],
    enum: {
      values: ['private', 'shared'],
      message: 'Please, select between PRIVATE or SHARED',
    },
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
    minlength: [2, 'State should follow 2 letters format'],
    maxlength: [2, 'State should follow 2 letters format'],
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
  buildingType: {
    type: String,
    enum: {
      values: ['home', 'basement', 'apartment', 'condo', 'townhome'],
      message: 'Please, select one of the available options',
    },
  },
  owner: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  contactPhone: Number,
  contactEmail: String,
  latitude: Number,
  longitude: Number,
});

//Convention is to use uppercase letter to Models
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
