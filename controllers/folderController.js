import {} from "../db/queries.js";

const getCreateFolder = (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/log-in");
  }
  res.render("create-folder", { user: req.user, name: "" });
};

export { getCreateFolder };
