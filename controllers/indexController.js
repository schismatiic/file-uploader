import { getFolders } from "../db/queries.js";
const getIndex = async (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  const folders = await getFolders();
  res.render("index", { user: req.user, folders });
};

export { getIndex };
