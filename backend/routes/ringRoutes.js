const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");

const {
  addRing,
  getRingsWithPagination,
  deleteRingById,
  updateRingByProductNo,
  findRingsByCategory,
  getAllRings,
  findRingByActive,
  updateRingField,
  generateUploadURL,
  getRingByProductNo
} = require("../controller/ringController");

router.use(bodyparser.json());

// Route to add a new ring
router.post("/add", addRing);

// Route to get all rings
router.get("/getall", getAllRings);

// Route to get rings with pagination
router.get("/getpage", getRingsWithPagination);

// Route to get rings with pagination
router.get("/getbyproductno/:productNo", getRingByProductNo);

// Route to delete a ring by productNo
router.delete("/delete/:id", deleteRingById);

// Route to update a ring by productNo
router.put("/update/:productNo", updateRingByProductNo);

// Route to find rings by category from the request body
router.get("/get/:category", findRingsByCategory);

// Route to find rings by active status
router.get("/getactive", findRingByActive);

router.post("/updatefield", updateRingField);

router.get("/uploadurl", generateUploadURL);


module.exports = router;
