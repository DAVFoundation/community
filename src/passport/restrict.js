export const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();

  res.send("forbidden");
}
