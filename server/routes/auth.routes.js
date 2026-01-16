const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");

//route to signup:
//POST /auth/signup - Creates a new user in the database WORKING!!!
router.post("/signup", async (req, res) => {
  //destructor the req.body
  const { email, password } = req.body;
  try {
    const userAlreadyInDB = await UserModel.findOne({ email });
    if (userAlreadyInDB) {
      res.status(403).json({ errorMessage: "Invalid credentials" });
    } else {
      const theSalt = bcryptjs.genSaltSync(12);
      const theHasshedPassword = bcryptjs.hashSync(password, theSalt);
      const hashedUser = {
        ...req.body,
        password: theHasshedPassword,
      };
      const createdUser = await UserModel.create(hashedUser);
      res.status(201).json(createdUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error });
  }
});

//route to /login an existing user:
//POST /auth/login - Checks the sent email and password and, if email and password are correct returns a JWT WORKING!!!
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAlreadyInDB = await UserModel.findOne({ email });
    if (!userAlreadyInDB) {
      res.status(403).json({ errorMessage: "Invalid Credentials" });
    } else {
      const doesPasswordsMatch = bcryptjs.compareSync(
        password,
        userAlreadyInDB.password
      );
      if (!doesPasswordsMatch) {
        res.status(403).json({ errorMessage: "Invalid Credentials" });
      } else {
        const payload = { _id: userAlreadyInDB._id };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res
          .status(200)
          .json({ message: "you are now logged in, nice work", authToken });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error });
  }
});

//this route verifies the auth token:
//GET /auth/verify - Verifies that the JWT sent by the client is valid WORKING!!!
router.get("/verify", isAuthenticated, (req, res) => {
  res
    .status(200)
    .json({ message: "Token is valid ", decodedToken: req.payload });
});

module.exports = router;
