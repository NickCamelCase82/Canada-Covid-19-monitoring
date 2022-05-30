const checkAuth = (req, res, next) => {
  if (req.session.isAuthorized) {
    next();
  } else res.redirect("/main");
};

module.exports = checkAuth;
