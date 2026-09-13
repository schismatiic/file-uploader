import express from "express";
import path from "node:path";
import session from "express-session";

const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   }),
// );
// app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/", (req, res) => {
  res.send("Meaningless");
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("App listening on port 3000!");
});
