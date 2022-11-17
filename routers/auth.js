const { Router } = require("express");
const { where } = require("sequelize");
const { toJWT } = require("../auth/jwt");
const bcrypt = require("bcrypt");
const User = require("../models").User;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();
const authMiddleware = require("../auth/middleware");

//login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password " });
    }

    const userToLogin = await User.findOne({ where: { email } });

    if (!userToLogin || !bcrypt.compareSync(password, userToLogin.password)) {
      res
        .status(400)
        .send("User with that email not found or password incorrect");
      return;
    }

    if (bcrypt.compareSync(password, userToLogin.password)) {
      // Generate a token
      delete userToLogin.dataValues["password"];
      const token = toJWT({ userId: userToLogin.id });
      return res.status(200).send({ token, user: userToLogin.dataValues });
    }
    res.status(400).send("Something went wrong, sorry");
  } catch (error) {
    console.log(error);
  }
});

//signup
router.post("/signup", async (req, res) => {
  const { firstName, lastName, address, email, password } = req.body;
  if (!firstName || !lastName || !address || !email || !password) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      address,
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      isAdmin: false,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, user: newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/test-auth", authMiddleware, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  });
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues });
});

module.exports = router;
