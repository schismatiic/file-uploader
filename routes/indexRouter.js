import { Router } from "express";
const indexRouter = Router();
import { getIndex } from "../controllers/indexController.js";

indexRouter.get("/", getIndex);

export default indexRouter;
