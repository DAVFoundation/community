export const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();

  res.status(403).send("forbidden");
};

export const canGrantPermissions = (req, res, next) => {
  if(req.isAuthenticated() && req.user.permissions.canGrantPermissions) return next();

  return res.status(403).send("forbidden");
};

export const canAccessAdmin = (req, res, next) => {
  if(req.isAuthenticated() && req.user.permissions.canAccessAdmin) return next();

  return res.status(403).send("forbidden");
};

export const canPostDavUpdates = (req, res, next) => {
  if(req.isAuthenticated() && req.user.permissions.canPostDavUpdates) return next();

  return res.status(403).send("forbidden");
};

export const canDeleteDavUpdates = (req, res, next) => {
  if(req.isAuthenticated() && req.user.permissions.canDeleteDavUpdates) return next();

  return res.status(403).send("forbidden");
};

