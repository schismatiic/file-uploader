import {
  createFileQuery,
  getFolderById,
  getFilesByFoldersId,
} from "../db/queries.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const uploadMiddleware = upload.single("file");
const createFile = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { id } = req.params;
  const folderId = Number(id);
  const { originalname, size, path } = req.file;
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
  res.render("files", { user: req.user, files, folder, id });
};
const getCreateFile = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { id } = req.params;
  res.render("create-file", { user: req.user, id, name: "" });
};

export { createFile, getFiles, getCreateFile, uploadMiddleware };
