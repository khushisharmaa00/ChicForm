const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user && user.role === "ADMIN") {
    next(); // Allow access
  } else {
    res
      .status(403)
      .send({ error: "Access denied. Admin privileges required." });
  }
};

module.exports = isAdmin;
