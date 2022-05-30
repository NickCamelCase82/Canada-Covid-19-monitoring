require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const hbs = require("hbs");
const FileStore = require("session-file-store")(expressSession);
const isAuthorized = require("./middleware/isAuthorized");
const dbConnect = require("./db/dbConnectionCheck");

//const { PORT } = process.env;
dbConnect();

const indexRouters = require("./routers/indexRouters");
const userRouters = require("./routers/userRouters");

const log = console;
//const dbConnectionCheck = require("./db/dbConnectionCheck");

const app = express();
const PORT = process.env.PORT ?? 3000;
const sessionConfig = {
  store: new FileStore(),
  name: "CanCov2019",
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
};

// const sessionConfig = {
//   store: new FileStore(),
//   name: "MyCookie",
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60,
//     httpOnly: true,
//   },
// };

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(expressSession(sessionConfig));
app.use(isAuthorized);

app.use("/", indexRouters);
app.use("/", userRouters);

// app.get("/", (req, res) => {
//   res.render("entry");
// });

app.use((req, res, next) => {
  const error = createError(404, "Requested URL is not found");
  next(error);
});

app.use((err, req, res) => {
  const appMode = req.app.get("env");
  let error;

  if (appMode === "development") {
    error = err;
  } else {
    error = {};
  }

  res.locals.message = err.message;
  res.locals.error = error;

  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, (err) => {
  if (!err) {
    log.log("Server is up and running at PORT", PORT);
  } else log.log(err);
});
