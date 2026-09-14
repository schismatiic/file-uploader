import { getIdentifier, getUserById } from "../db/queries.js";
import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  new LocalStrategy(
    {
      usernameField: "identifier",
    },
    async (identifier, password, done) => {
      try {
        const user = await getIdentifier(identifier);
        if (!user) {
          return done(null, false, { message: "Incorrect username or email" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
