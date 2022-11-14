const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "o02er4fe2qhji8hdfhau#d";

function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

function toData(token) {
  //verify and decode
  return jwt.verify(token, secret);
}

// const myToken = toJWT({ message: "Hello from token!" });
// const myData = toData(myToken);
// console.log(myData);

module.exports = { toJWT, toData };
