import { Router } from "express";
import {
  createFolder,
  getCreateFolder,
  getUpdateFolder,
  updateFolder,
  validateCreateFolder,
  validateUpdateFolder,
} from "../controllers/folderController.js";
const folderRouter = Router();

folderRouter.get("/create", getCreateFolder);
folderRouter.post("/create", validateCreateFolder, createFolder);
folderRouter.get("/rename/:id", getUpdateFolder);
folderRouter.post("/rename/:id", validateUpdateFolder, updateFolder);

export default folderRouter;
