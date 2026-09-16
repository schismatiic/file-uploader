import { Router } from "express";
import {
  createFile,
  getFiles,
  getCreateFile,
  uploadMiddleware,
} from "../controllers/fileController.js";
const fileRouter = Router({ mergeParams: true });

fileRouter.get("/", getFiles);
fileRouter.get("/create", getCreateFile);
fileRouter.post("/create", uploadMiddleware, createFile);

export default fileRouter;
