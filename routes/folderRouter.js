import { Router } from "express";
import {
  createFolder,
  getCreateFolder,
  validateCreateFolder,
} from "../controllers/folderController.js";
const folderRouter = Router();

folderRouter.get("/create", getCreateFolder);
folderRouter.post("/create", validateCreateFolder, createFolder);

export default folderRouter;
