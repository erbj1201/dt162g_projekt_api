//Import
const jwt = require("jsonwebtoken");
//Auth using JWT
const auth = (req, res, next) => {
  //Get token from request
  const token = req.header("Authorization");
  //If no token, unauthorized
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    //verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Attact user info for use
    req.user = decoded.user; // Attach user information to the request object
    next();
  } catch (error) {
    //If verification fail, unauthorized
    res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = auth;
