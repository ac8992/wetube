import express from "express";
import { getEdit, postEdit, remove, logout, see, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from "../controller/userController"
import { protectorMiddleware, publicOnlyMiddleware, uploadFile } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadFile.single("avatar"), postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;