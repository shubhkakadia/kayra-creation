const mongoose = require("mongoose");
const ringSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    collection: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      required: true,
    },
    caratWt: {
      type: Number,
      required: true,
    },
    colorRange: {
      type: String,
      required: true,
    },
    clarityRange: {
      type: String,
      require: true,
    },
    metalColor: {
      type: String,
      required: true,
    },
    netWeight: {
      type: String,
      required: true,
    },
    goldPurity: {
      type: String,
      required: true,
    },
    descriptionDetails: {
      type: String,
      required: true,
    },
    dateAdded: {
      type: Date,
    },
    images: {
      type: Array,
      required: true,
    },
    priceUSD: {
      type: Number,
      required: true,
    },
    productNo: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      require: true,
    },
    designNo: {
      type: String,
      require: true,
    },
    jobNo: {
      type: String,
      require: true,
    },
    subCategory: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rings", ringSchema);
