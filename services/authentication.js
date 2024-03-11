const JWT = require("jsonwebtoken");

const secret = "Karangautam@123";

function creteTokenForUser(user) {
  const paylpad = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(paylpad, secret);
  return token;
}

function validateToken(token) {
  const paylpad = JWT.verify(token, secret);
  return paylpad;
}

module.exports = {
  creteTokenForUser,
  validateToken,
};
