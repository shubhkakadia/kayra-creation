const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  // You can include other fields related to images if needed
  // For example, you might want to associate images with products.
  productNo: {
    type: Number,
    ref: 'Rings',
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
