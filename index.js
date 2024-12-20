import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/router.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/router.js";
import "dotenv/config";
import session from "express-session";
import AssignmentRoutes from "./Kanbas/Assignments/router.js";
import EnrollmentsRoutes from "./Kanbas/Enrollments/router.js";

const CONNECTION_STRING = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING)
  .then(() => console.log("成功连接到 MongoDB 数据库"))
  .catch((err) => {
    console.error("MongoDB 连接错误:", err);
    process.exit(1);
  });
const app = express();
app.use(
  cors({
    credentials: true,
    origin: [
      process.env.NETLIFY_URL || "http://localhost:3000",
      "https://kanbas-react-web-app-2024.netlify.app",
      /\.netlify\.app$/,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  } 
} else {
  sessionOptions.cookie = {
    sameSite: 'lax',
    secure: false,
  };
}
app.use(express.json());
app.use(session(sessionOptions));

if (process.env.NODE_ENV !== "development") {
  app.set("trust proxy", 1);
}
   
Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);

app.listen(process.env.PORT || 4000);