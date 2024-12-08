import model from "./model.js";
export function createAssignment(assignment) {
    delete assignment._id;
    return model.create(assignment);
}

export function findAssignmentForCourse(courseId) {
    return model.find({ course: courseId });
}

export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    const assignment = model.findOne({ _id: assignmentId });

    if (!assignment) {
        throw new Error(`Assignment with ID ${assignmentId} not found`);
    }

    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
}