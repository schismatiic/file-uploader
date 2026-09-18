import { Router } from "express";
import {
  createFile,
  getFiles,
  getCreateFile,
  getFile,
  getDownloadFile,
  deleteFile,
  uploadMiddleware,
} from "../controllers/fileController.js";
const fileRouter = Router({ mergeParams: true });

fileRouter.get("/", getFiles);
fileRouter.get("/create", getCreateFile);
fileRouter.post("/create", uploadMiddleware, createFile);
fileRouter.get("/:fileId", getFile);
fileRouter.get("/:fileId/delete", deleteFile);
fileRouter.get("/:fileId/download", getDownloadFile);

export default fileRouter;
