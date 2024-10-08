const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const AuthenticationUser = async (req, res, next) => {
  //verify
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token reqired" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.User = await User.findOne({ _id });
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request not authorized" });
  }
};
module.exports = AuthenticationUser;
