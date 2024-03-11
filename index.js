const path = require("path");
require("dotenv").config();
const express = require("express");
const db = require("./db");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const app = express();

const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

// import Router here
const UserRoute = require("./routes/user");

// used Router here
app.use("/user", UserRoute);

app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
});
