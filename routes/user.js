const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

// this is signup post route that help to create new user
router.post("/signup", async (req, res) => {
  const { fullName, email, Password } = req.body;
  await User.create({
    fullName,
    email,
    Password,
  });

  return res.redirect("/user/signin");
});

// This is signin POST route that help to match there email and hashed password.
router.post("/signin", async (req, res) => {
  const { email, Password } = req.body;
  const user = await User.matchPassword(email, Password);

  return res.redirect("/");
});

module.exports = router;
