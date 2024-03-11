require("dotenv").config();
const path = require("path");
const express = require("express");
const db = require("./db");
const cookieParser = require("cookie-parser");
const Blog = require('./models/blog')

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const app = express();

const PORT = process.env.PORT ;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')))

// import Router here
const UserRoute = require("./routes/user");
const BlogRoute = require("./routes/blog");

// used Router here
app.use("/user", UserRoute);
app.use("/blog", BlogRoute);

app.get("/", async (req, res) => {
  const allBlog = await Blog.find({})
  res.render("home", {
    user: req.user,
    blogs : allBlog,
  });
});

app.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
});
