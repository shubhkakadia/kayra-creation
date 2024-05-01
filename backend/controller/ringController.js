const { v4: uuidv4 } = require("uuid");

const {
  PutObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const Ring = require("../model/ringData");


const generateUploadURL = async (req, res) => {
  try {
    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new PutObjectCommand({
      Bucket: "kayra-creation-products",
      Key: `products/rings/${req.body.filename}`,
      ContentType: req.body.contentType,
    });

    const url = await getSignedUrl(client, command);

    console.log("url for uploading: ", await url);

    res.status(200).send({ url: url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
      designNo,
      jobNo,
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
      designNo,
      jobNo,
    });

    await newRing.save();
    console.log(`New Ring added productNo: ${req.body.productNo}`);
    res
      .status(201)
      .send({ message: `New Ring added productNo: ${req.body.productNo}` });
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
    const { productNo } = req.params;
    const updatedData = req.body;

    // Ensure productNo is not changed in the update data
    delete updatedData.productNo;

    const result = await Ring.findOneAndUpdate(
      { productNo: parseInt(productNo, 10) },
      updatedData,
      { new: true }
    );

    if (result) {
      console.log(`Product Updated Succesfull, ProductNo: ${productNo}`);
      res.status(200).json({
        message: `Product Updated Succesfull, ProductNo: ${productNo}`,
      });
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

    res
      .status(200)
      .json({ message: "All documents updated successfully", result });
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({ message: "Error updating documents", error });
  }
};

const getRingByProductNo = async (req, res) => {
  try {
    const result = await Ring.findOne({ productNo: req.params.productNo });

    if (result) {
      res
        .status(200)
        .json(result);
      console.log(`Ring found by productNo: ${req.params.productNo}`);
    } else {
      res.status(404).json({ error: "Ring not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const isProductNumberTaken = async (req, res) => {
  try {
    const { productNo } = req.body;

    // Check if the product number is provided in the request body
    if (!productNo) {
      return res.status(400).json({ error: "Product number is required." });
    }

    // Find a ring with the provided product number
    const existingRing = await Ring.findOne({ productNo: productNo });

    if (existingRing) {
      console.log(`product Number ${productNo} is taken`)
      // If a ring with the provided product number exists, it is taken
      res.status(200).json({ taken: true });
    } else {
      // If no ring with the provided product number is found, it is available
      res.status(200).json({ taken: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductByPage = async (req, res) => {
  console.log("by", req.params);
  try {
    const {productType, page, startIndex, endIndex } = req.body;
    // const productType = req.params; // Extract productType from the URL path

    console.log("page", page);
    console.log("startIndex", startIndex);
    console.log("endIndex", endIndex);
    console.log("productType", productType);

    // Validate the required parameters
    if (!page || !startIndex || !endIndex || !productType) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    // Calculate the skip and limit values based on the start and end indexes
    const skip = (page - 1) * 50 + startIndex;
    const limit = endIndex - startIndex + 1;

    // Find the products based on the product type, skip, and limit
    const products = await Ring.find({ productType: productType })
      .skip(skip)
      .limit(limit);

    if (products.length > 0) {
      console.log(`Products found for page ${page}, startIndex ${startIndex}, endIndex ${endIndex}, and productType ${productType}`);
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "No products found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductByProductType = async (req, res) => {
  try {
    const productType = req.params.productType;


    // Validate the required parameters
    if ( !productType) {
      return res.status(400).json({ error: "Missing required parameters." });
    }

    // Find the products based on the product type, skip, and limit
    const products = await Ring.find({ productType: { $regex: new RegExp(`^${productType}$`, "i") } })

    if (products.length > 0) {
      console.log(`Products found for productType ${productType}`);
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "No products found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  generateUploadURL,
  addRing,
  getAllRings,
  getRingsWithPagination,
  deleteRingById,
  updateRingByProductNo,
  findRingsByCategory,
  findRingByActive,
  updateRingField,
  getRingByProductNo,
  isProductNumberTaken,
  getProductByPage,
  getProductByProductType,
};
