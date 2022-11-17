const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets");

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
