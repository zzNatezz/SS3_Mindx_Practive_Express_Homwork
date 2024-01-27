import { userModel } from "../model/user.model.js";

const middlewareFactory = function (headerName) {
  return async function (req, res, next) {
    if (headerName === "x-username") {
      try {
        const userName = req.headers?.["x-username"];
        const user = await userModel.findOne({ userName });
        if (!user) {
          return res.status(403).send({
            data: null,
            status: "failed",
            error: "Authentication failled",
          });
        }
        req.user = user;
        return next();
      } catch (error) {
        console.log(error);
        res.status(500).send("Server error !!!");
      }
    }
    if (headerName === "x-admin") {
      try {
        if (!req.users.roles || !req.users.roles.includes("x-admin")) {
            return res.status(403).send({
            data: null,
            status: "failed",
            error: "Only admin access",
          });
        }
        req.user = user;
        return next();
      } catch (error) {
        res.status(500).send("Server error !!!");
      }
    }
    return next();
  };
};

export { middlewareFactory };
