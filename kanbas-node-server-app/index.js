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

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
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
app.use(session(sessionOptions));

if (process.env.NODE_ENV !== "development") {
  app.set("trust proxy", 1);
}
   
app.use(express.json());
app.use(express.json());
Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);

app.listen(process.env.PORT || 4000);