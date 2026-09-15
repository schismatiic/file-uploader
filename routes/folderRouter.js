import { Router } from "express";
import { getCreateFolder } from "../controllers/folderController.js";
const folderRouter = Router();

folderRouter.get("/create", getCreateFolder);

export default folderRouter;
