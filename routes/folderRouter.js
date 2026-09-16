import { Router } from "express";
import {
  createFolder,
  getCreateFolder,
  getUpdateFolder,
  updateFolder,
  deleteFolder,
  validateCreateFolder,
  validateUpdateFolder,
} from "../controllers/folderController.js";
const folderRouter = Router();

folderRouter.get("/create", getCreateFolder);
folderRouter.post("/create", validateCreateFolder, createFolder);
folderRouter.get("/rename/:id", getUpdateFolder);
folderRouter.post("/rename/:id", validateUpdateFolder, updateFolder);
folderRouter.get("/delete/:id", deleteFolder);

export default folderRouter;
