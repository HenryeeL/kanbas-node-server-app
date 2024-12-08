import model from "./model.js";
export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  const courses = enrollments.map((enrollment) => enrollment.course);
  return courses;
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}
 