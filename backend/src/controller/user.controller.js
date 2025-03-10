const User = require("../models/user.model.js");
const userService = require("../services/user.service.js");
const getUserProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Extracted Token:", token);
  try {
    if (!token) {
      return res.status(404).send({ error: "token not found" });
    }
    const user = await userService.getUserProfileByToken(token);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
// [Bearer, token]
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Extract only the fields you want to update (e.g., status)
    const { status } = req.body;

    // Create a clean `updatedData` object
    const updatedData = { status };

    // Update the user in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true } // Return the updated user
    );

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Return the updated user
    return res.status(200).send(user);
  } catch (error) {
    console.error("Error in updateUser:", error.message); // Debugging line
    return res.status(500).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await userService.deleteUser(userId);
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { getUserProfile, getAllUsers, updateUser, deleteUser };
