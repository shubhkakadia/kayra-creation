const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const {
  addAdmin,
  login,
  updateAdminByUsername,
} = require("../controller/adminController");

router.use(bodyparser.json());

// Route for adding a new admin
router.post("/add", addAdmin);

// Route for admin login
router.post("/login", login);

// Route for updating admin by username
router.put("/update/:username", updateAdminByUsername);

module.exports = router;
