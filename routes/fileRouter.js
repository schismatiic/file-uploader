import { Router } from "express";
import { getFiles, getCreateFile } from "../controllers/fileController.js";
const fileRouter = Router({ mergeParams: true });

fileRouter.get("/", getFiles);
fileRouter.get("/create", getCreateFile);

export default fileRouter;
