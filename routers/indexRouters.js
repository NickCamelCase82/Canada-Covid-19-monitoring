const indexRouters = require("express").Router();

indexRouters.get("/", (req, res) => {
  res.render("entry");
});

module.exports = indexRouters;

// const indexRouters = require("express").Router();

// indexRouters.get("/lands/bc", (req, res) => {
//   res.render("lands/bc");
// });

// module.exports = indexRouters;
