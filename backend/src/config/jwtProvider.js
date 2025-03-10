const jwt = require("jsonwebtoken");
const SECRET_KEY = "njbhbhbjnjnkjjanj";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  return token;
};

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};

module.exports = { generateToken, getUserIdFromToken };
