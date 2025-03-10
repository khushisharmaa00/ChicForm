const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("user already exist with email :", email);
    }
    password = await bcrypt.hash(password, 8);
    let role = email === "khushisharmaa00@gmail.com" ? "ADMIN" : "CUSTOMER";

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });
    console.log("created user", user);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    console.log(`Finding user with ID: ${userId}`);
    const user = await User.findById(userId);
    // .populate("address");
    if (!user) {
      throw new Error(`user not found with id: ",${userId}`);
    }
    return user;
  } catch (error) {
    console.error(`Error in findUserById: ${error.message}`);
    throw new Error(error.message);
  }
};
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found with id: ", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUserProfileByToken = async (token) => {
  try {
    if (!token) {
      throw new Error("Token not provided");
    }
    const userId = jwtProvider.getUserIdFromToken(token);
    if (!userId) {
      throw new Error("Invalid token");
    }
    const user = await findUserById(userId);
    if (!user) {
      throw new Error("user not found with id: ", userId);
    }
    console.log("user", user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateUser = async (userId, updatedData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const AdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 8);

    // Create the admin user
    const adminUser = await User.create({
      firstName: "Khushi",
      lastName: "Sharma",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    });
    console.log("Admin  user created successfully.");
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
  updateUser,
  deleteUser,
  AdminUser,
};
