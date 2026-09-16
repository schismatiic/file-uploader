import { Router } from "express";
import { getFiles } from "../controllers/fileController.js";
const fileRouter = Router({ mergeParams: true });

fileRouter.get("/", getFiles);

export default fileRouter;
