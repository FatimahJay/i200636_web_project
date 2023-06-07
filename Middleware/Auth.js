const jwt = require("jsonwebtoken");
const User = require("../Models/user");


const authMiddleware = (validUserRole) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      console.log("Token:", token); // Add this line
      const decoded = jwt.verify(token, "secret");
      console.log("Decoded:", decoded); // Add this line
      const user = await User.findOne({ _id: decoded._id });

      if (!user) {
        throw new Error();
      }

      req.token = token;
      req.user = user;
      req.role = user.role; // Add this line to set req.role to the user's role
      console.log(req.role);

      if (!validUserRole.includes(req.role) || (req.role !== 'admin' && req.user._id !== req.params.userId)) {
        return res.status(403).json({ message: "Authorization Failed" });
      }
      next();
    } catch (e) {
      // res.status(401).send({ error: "Authentication failed" });
      console.log(e);
    }
  };
};
module.exports = authMiddleware;