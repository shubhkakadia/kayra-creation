const { v4: uuidv4 } = require('uuid');

const Ring = require("../model/ringData");

const addRing = async (req, res) => {
  try {
    // Assuming you are passing the ring details in the request body
    const {
      name,
      category,
      caratWt,
      colorRange,
      clarityRange,
      metalColor,
      netWeight,
      goldPurity,
      descriptionDetails,
      dateAdded,
      images,
      priceUSD,
      productNo,
      active,
      productType,
    } = req.body;

    const newRing = new Ring({
      id: uuidv4(),
      name,
      category,
      caratWt,
      colorRange,
      clarityRange,
      metalColor,
      netWeight,
      goldPurity,
      descriptionDetails,
      dateAdded,
      images,
      priceUSD,
      productNo,
      active,
      productType,
    });

    await newRing.save();
    console.log(`New Ring added productNo: ${req.body.productNo}`);
    res.status(201).send({message: `New Ring added productNo: ${req.body.productNo}`});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
};

const getAllRings = async (req, res) => {
  try {
    const rings = await Ring.find({});
    console.log("Read all Ring Data Succesfull");
    res.status(200).json(rings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRingsWithPagination = async (req, res) => {
  try {
    const page = req.query.page || 1; // Assume page parameter is passed in the query, default to page 1
    const pageSize = 20; // Number of documents to fetch per page

    const rings = await Ring.find({})
      .sort({ dateAdded: -1 }) // Sort by dateAdded in descending order (newest first)
      .skip((page - 1) * pageSize) // Skip documents based on the current page
      .limit(pageSize); // Limit the number of documents per page

    res.status(200).json(rings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRingById = async (req, res) => {
  try {
    const result = await Ring.findOneAndDelete({ ID: req.params.id });

    if (result) {
      res.status(200).json({ message: "Ring deleted successfully." });
      console.log(`Ring Deleted from the database Id: ${req.params.id}`);
    } else {
      res.status(404).json({ error: "Ring not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateRingByProductNo = async (req, res) => {
  try {
    const { productNo } = req.params; // Assuming productNo is part of the URL parameters
    const updatedData = req.body; // Assuming updated data is sent in the request body

    // Ensure productNo is not changed in the update data
    delete updatedData.productNo;

    const result = await Ring.findOneAndUpdate(
      { productNo: parseInt(productNo, 10) },
      updatedData,
      { new: true } // Return the updated document
    );

    if (result) {
      console.log(
        `Product Updated Succesfull, ProductNo: ${productNo}`
      );
      res.status(200).json({message: `Product Updated Succesfull, ProductNo: ${productNo}`});
    } else {
      res.status(404).json({ error: "Ring not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findRingsByCategory = async (req, res) => {
  try {
    const { category } = req.params; // Assuming category is part of the URL parameters

    // Use a case-insensitive regular expression for matching
    const categoryRegex = new RegExp(category, "i");

    const rings = await Ring.find({ category: { $regex: categoryRegex } });

    if (rings.length > 0) {
      console.log(`Products found by Category: ${req.params.category}`);
      res.status(200).json(rings);
    } else {
      res
        .status(404)
        .json({ error: `No rings found for the category: ${category}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findRingByActive = async (req, res) => {
  try {
    const activeRings = await Ring.find({ active: true }); // Replace 'Ring' with your model name
    res.status(200).json(activeRings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRingField = async (req, res) => {
  try {
    // Assuming `Ring` is your model connected to the 'rings' collection
    const result = await Ring.updateMany(
      {}, // empty filter to match all documents
      { $set: { productType: "ring" } } // update operation to add productType field
    );

    res.status(200).json({ message: 'All documents updated successfully', result });
  }
  catch (error) {
    console.error('Error updating documents:', error);
    res.status(500).json({ message: 'Error updating documents', error });
  }
}




module.exports = {
  addRing,
  getAllRings,
  getRingsWithPagination,
  deleteRingById,
  updateRingByProductNo,
  findRingsByCategory,
  findRingByActive,
  updateRingField
};
