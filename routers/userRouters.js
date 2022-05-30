const userRouters = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

userRouters.get("/register", (req, res) => {
  res.render("register");
});

userRouters.post("/register", async (req, res) => {
  try {
    const { login, email, password } = req.body;
    const hash = await bcrypt.hash(password, 5);
    const user = await User.create({
      login,
      email,
      password: hash,
    });
    req.session.user = user;
    req.session.isAuthorized = true;
    res.render("menu", { user });
  } catch (error) {
    res.render("error", { error: error.message });
  }
  // res.render("menu", { user });
});

userRouters.get("/login", (req, res) => {
  res.render("login");
});

userRouters.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    const passCompare = await bcrypt.compare(password, user.password);
    if (passCompare) {
      req.session.user = user;
      req.session.isAuthorized = true;
      res.render("menu", { user });
    } else {
      res.render("entry");
    }
  } catch (err) {
    console.error(err);
    res.render("login");
  }
});

userRouters.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("CanCov2019");
  return res.render("entry");
});

module.exports = userRouters;
