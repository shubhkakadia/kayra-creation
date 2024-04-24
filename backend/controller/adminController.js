const Admin = require("../model/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const addAdmin = async (req, res) => {
  try {
    // Extract data from the request body
    const { ID, name, username, password, role, photo, active } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance based on the schema
    const newAdmin = new Admin({
      ID,
      name,
      username,
      password: hashedPassword,
      role,
      photo,
      active,
    });

    // Save the admin to the database
    const savedAdmin = await newAdmin.save();

    console.log("Admin added successfully:", savedAdmin);
    res.status(201).json(savedAdmin); // Return the saved admin as JSON
  } catch (error) {
    console.error("Error adding admin:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin with the provided username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      // Admin not found
      return res.status(401).json({ error: "Invalid credentials: Username" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      // Passwords do not match
      return res.status(401).json({ error: "Invalid credentials: Password" });
    }

    // Check if the account is active
    if (!admin.active) {
      // Account is not active
      return res.status(401).json({ error: "Account not active" });
    }
    // Generate a JWT token with a one-month expiration
    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    // Send the token in the response
    res.json({ admin, token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAdminByUsername = async (req, res) => {
  try {
    const { username } = req.params; // Assuming the username is passed as a parameter in the URL
    const updateFields = req.body; // Fields to be updated

    // Hash the updated password if provided
    if (updateFields.password) {
      updateFields.password = await bcrypt.hash(updateFields.password, 10);
    }

    // Find the admin by username and update the fields
    const updatedAdmin = await Admin.findOneAndUpdate(
      { username },
      updateFields,
      { new: true }
    );

    if (!updatedAdmin) {
      // Admin not found
      return res.status(404).json({ error: "Admin not found" });
    }

    console.log("Admin updated successfully:", updatedAdmin);
    res.json(updatedAdmin);
  } catch (error) {
    console.error("Error updating admin:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addAdmin,
  login,
  updateAdminByUsername,
};
