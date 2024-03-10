const path = require("path");
const express = require("express");
const db = require("./db");
const app = express();
const PORT = 8000;


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

// import Router here
const UserRoute = require("./routes/user");

// used Router here
app.use("/user", UserRoute);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
});
