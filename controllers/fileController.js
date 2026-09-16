import { getFolderById, getFilesByFoldersId } from "../db/queries.js";

const getFiles = async (req, res) => {
  const { id } = req.params;
  const folderId = Number(id);
  const folder = await getFolderById(folderId);
  const files = await getFilesByFoldersId(folderId);
  res.render("files", { user: req.user, files, folder, id });
};

export { getFiles };
