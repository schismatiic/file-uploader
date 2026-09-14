import { Router } from "express";
const authRouter = Router();

import {
  getSignUp,
  getLogIn,
  getLogOut,
  createLogIn,
  createSignUp,
  validateCreateAccount,
  validateLogIn,
  handleLogInValidation,
} from "../controllers/authController.js";

authRouter.get("/sign-up", getSignUp);
authRouter.post("/sign-up", validateCreateAccount, createSignUp);
authRouter.get("/log-in", getLogIn);
authRouter.post("/log-in", validateLogIn, handleLogInValidation, createLogIn);
authRouter.get("/log-out", getLogOut);

export default authRouter;
