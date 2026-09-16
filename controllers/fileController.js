import { getFolderById, getFilesByFoldersId } from "../db/queries.js";

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

export { getFiles, getCreateFile };
