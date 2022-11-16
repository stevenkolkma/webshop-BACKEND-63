const { Router } = require('express')
const { where } = require('sequelize')
const { toJWT, toData } = require('../auth/jwt')
const bcrypt = require("bcrypt")

const Author = require('../models').author

const router = new Router()
const authMiddleware = require("../auth/middleware")

router.post('/login', async (req, res, next) => {
    try {
        const { name, password } = req.body
        const userToLogin = await User.findOne({ where: { name: name } })
        if (!userToLogin) {
            res.status(400).send("User with that password and/or email not found");
            return;
        }
        
        if (bcrypt.compareSync(password, userToLogin.password)) {
            // Generate a token
            const token = toJWT({ userId: userToLogin.id });
            res.send({ token: token });
            return;
        }
        res.status(400).send("User with that password and/or email not found!");
    } catch (error) {
        console.log(error)
    }
})

router.get("/test-auth", authMiddleware, (req, res) => {
    res.send({
      message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
    });
  });

module.exports = router