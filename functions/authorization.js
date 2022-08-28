const ApiError = require("lib/functional/api-error");
module.exports.adminAuth = (req, res, next) => {
  if (req.decoded.roles && req.decoded.roles.some(role => role.type === "admin"))
    next(null, true);
  else next(new ApiError(401, "unauthorized", "Access denied"));
};
