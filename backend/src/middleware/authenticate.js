const jwtProvider = require("../config/jwtProvider.js");
const userService = require("../services/user.service.js");
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(404).send({ error: "Token Not Found..." });
    }
    const userId = jwtProvider.getUserIdFromToken(token);
    if (!userId) {
      return res.status(401).send({ error: "Invalid Token" });
    }

    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
  // next();
};

module.exports = authenticate;
