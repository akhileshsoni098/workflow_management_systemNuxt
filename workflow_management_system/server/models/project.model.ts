import mongoose from "mongoose";
import { Project } from "../types/project.types";

const ObjectId = mongoose.Schema.Types.ObjectId;

const ProjectSchema = new mongoose.Schema<Project>(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    createdBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    assignedUsers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const ProjectModel = mongoose.model<Project>("Project", ProjectSchema);

export default ProjectModel;
