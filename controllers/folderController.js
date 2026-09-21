import {
  createFolderQuery,
  getFolderById,
  updateFolderQuery,
  deleteFolderQuery,
} from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

const lengthErr = "must be between 1 and 25 characters.";
const validateCreateFolder = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 25 })
    .withMessage(`Name ${lengthErr}`),
];
const validateUpdateFolder = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 25 })
    .withMessage(`Name ${lengthErr}`),
];
const createFolder = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { id } = req.user;
  const folder = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", {
      errors: errors.array(),
      user: req.user,
      name: folder.name,
    });
  }
  const { name } = matchedData(req);
  await createFolderQuery(name, id);
  res.redirect("/");
};
const getCreateFolder = (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  res.render("create-folder", { user: req.user, name: "" });
};
const getUpdateFolder = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { id } = req.params;
  const folderId = Number(id);
  const folder = await getFolderById(folderId);
  res.render("update-folder", {
    user: req.user,
    id: folder.id,
    name: folder.name,
  });
};
const updateFolder = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const user = req.user;
  const { id } = req.params;
  const folderId = Number(id);
  const folder = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", {
      errors: errors.array(),
      user: req.user,
      name: folder.name,
    });
  }
  const { name } = matchedData(req);
  await updateFolderQuery(user.id, folderId, name);
  res.redirect("/");
};
const deleteFolder = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { id } = req.params;
  const folderId = Number(id);
  await deleteFolderQuery(folderId);
  res.redirect("/");
};

export {
  createFolder,
  getCreateFolder,
  getUpdateFolder,
  updateFolder,
  deleteFolder,
  validateCreateFolder,
  validateUpdateFolder,
};
