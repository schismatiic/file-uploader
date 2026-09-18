import {
  createFileQuery,
  getFolderById,
  getFilesByFoldersId,
  getFileById,
  deleteFileQuery,
} from "../db/queries.js";
import multer from "multer";
import { body, validationResult, matchedData } from "express-validator";
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 16 * 1024 * 1024 },
});

const validateUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).render("create-file", {
      errors: [{ msg: "File is required" }],
      user: req.user,
      id: req.params.id,
    });
  }
  next();
};
const uploadMiddleware = upload.single("file");
const createFile = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("create-file", {
      errors: errors.array(),
      user: req.user,
      id,
    });
  }
  const folderId = Number(id);
  const { originalname, size, path } = matchedData(req);
  await createFileQuery(originalname, size, path, folderId);
  res.redirect(`/folder/${id}/files`);
};
const getFiles = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { id } = req.params;
  const folderId = Number(id);
  const folder = await getFolderById(folderId);
  const files = await getFilesByFoldersId(folderId);
  const formattedFiles = files.map((file) => ({
    ...file,
    added: file.added
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\//g, "/")
      .replace(", ", " - "),
  }));
  res.render("files", { user: req.user, files: formattedFiles, folder, id });
};
const getCreateFile = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { id } = req.params;
  res.render("create-file", { user: req.user, id });
};
const getFile = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { id, fileId } = req.params;
  const idFile = Number(fileId);
  const file = await getFileById(idFile);
  const { name, size, added } = {
    ...file,
    added: file.added
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\//g, "/")
      .replace(", ", " - "),
  };

  res.render("file-details", { user: req.user, name, size, added, id, fileId });
};
const getDownloadFile = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { fileId } = req.params;
  const { path } = await getFileById(Number(fileId));
  res.download(path);
};
const deleteFile = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { id } = req.params;
  const folderId = Number(id);
  const { fileId } = req.params;
  const idFile = Number(fileId);
  await deleteFileQuery(idFile);
  res.redirect(`/folder/${folderId}/files`);
};
export {
  createFile,
  getFiles,
  getCreateFile,
  getFile,
  getDownloadFile,
  deleteFile,
  uploadMiddleware,
  validateUpload,
};
