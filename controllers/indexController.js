import { getFolders } from "../db/queries.js";
const getIndex = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const { id } = req.user;
  const folders = await getFolders(id);
  res.render("index", { user: req.user, folders });
};

export { getIndex };
