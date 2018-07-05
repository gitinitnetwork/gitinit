const cookieController = {
  setTokenCookie: (req, res, next) => {
    res.cookie('token', res.locals.token, { maxAge: 900000 });
    res.cookie('login', res.locals.login, { maxAge: 900000 });
    next();
  },
};

module.exports = cookieController;
