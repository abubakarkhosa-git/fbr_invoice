import express from "express";
import users from "../modules/user/user.route.js"

export default (app) => {
  const apiv1Router = express.Router();

  apiv1Router.use("/users", users)
//   apiv1Router.use("/admin", admin);

  app.use("/api/v1/", apiv1Router)
}

