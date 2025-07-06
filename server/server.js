import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import githubRoutes from "./routes/github.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use("/api/github", githubRoutes);
// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // ← update
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // Save accessToken on the user object
      profile.accessToken = accessToken;
      return done(null, profile);
    }
  )
);

// Serialize/Deserialize
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routes
app.get("/", (req, res) => {
  res.send("🌐 Forknight server is running!");
});

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Success – redirect to frontend
    res.redirect("http://localhost:5173/dashboard");
  }
);

app.get("/api/github/data", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const accessToken = req.user.accessToken;

  try {
    const response = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const repos = await response.json();

    // You can also filter PRs, commits, etc. here
    res.json({ repos });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch GitHub data", error: err });
  }
});

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Forknight server running at http://localhost:${PORT}`);
});
