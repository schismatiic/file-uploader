import "dotenv/config";
import express from "express";
import path from "node:path";
import session from "express-session";
import indexRouter from "./routes/indexRouter.js";
import authRouter from "./routes/authRouter.js";
import folderRouter from "./routes/folderRouter.js";
import passport from "./passport/passport.js";
import { prisma } from "./lib/prisma.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/folder", folderRouter);
app.use("/", indexRouter);
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
