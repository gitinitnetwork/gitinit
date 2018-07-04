const cookieController = {
  setTokenCookie: (req, res, next) => {
    res.cookie('token', res.locals.token, { maxAge: 900000, httpOnly: true });
    next();
  },
};

module.exports = cookieController;
