import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
 {
   title: String,
   description: String,
   availableFrom: Date,
   availableUntil: Date,
   due: Date,
   course: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "CourseModel",
   },
    points: Number,
 },
 { collection: "assignments" }
);

export default assignmentSchema;