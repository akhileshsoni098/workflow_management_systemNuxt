import mongoose from "mongoose";
import { Task } from "../types/task.types";

const ObjectId = mongoose.Schema.Types.ObjectId;

const TaskSchema = new mongoose.Schema<Task>(
  {
    projectId: {
      type: ObjectId,
      ref: "Project",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    assignedUser: {
      type: ObjectId,
      ref: "User",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Review", "Completed"],
      default: "Todo",
    },
    dueDate: { type: Date },
  },
  { timestamps: true },
);

const TaskModel = mongoose.model<Task>("Task", TaskSchema);

export default TaskModel;
