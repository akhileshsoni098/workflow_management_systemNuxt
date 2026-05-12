import { isValidObjectId } from "mongoose";
import ProjectModel from "~~/server/models/project.model";
import User from "~~/server/models/user.model";

import { Project } from "~~/server/types/project.types";

// === validation for assigned users ====

export const assignUsers = async (assignedUsers: string[]) => {
  if (!Array.isArray(assignedUsers)) {
    return {
      status: false,
      message: "Assigned users must be an array of user IDs",
    };
  }

  for (let userId of assignedUsers) {
    if (!isValidObjectId(userId)) {
      return {
        status: false,
        message: `Invalid user ID:${userId}`,
      };
    }
  }

  const existingUsers = await User.find({ _id: { $in: assignedUsers } });

  if (existingUsers.length !== assignedUsers.length) {
    return { status: false, message: "One or more assigned users not found" };
  }

  return { status: true, message: "validation success" };
};
 
// ============== create project service ===============
export const projectCreateService = async (
  body: Project,
  createdBy: string,
) => {
  const { name, description, assignedUsers } = body;

  if (assignedUsers.length > 0) {
    const validtionResult = (await assignUsers(assignedUsers as string[])) as {
      status: boolean;
      message: string;
    };
    if (validtionResult.status === false) {
      return validtionResult;
    }
  }

  const project = await ProjectModel.create({
    name,
    description,
    createdBy: createdBy,
    assignedUsers: assignedUsers || [],
  });

  return {
    status: true,
    message: "Project created successfully",
    data: project,
  };
};

//============= update project service ===============

export const projectUpdateService = async (
  body: Project,
  updatedBy: string,
  id:string
) => {
  const { name, description, assignedUsers } = body;

  if (assignedUsers.length > 0) {
    const validtionResult = (await assignUsers(assignedUsers as string[])) as {
      status: boolean;
      message: string;
    };
    if (!validtionResult.status) {
      return validtionResult;
    }
  }

  const updateProject = await ProjectModel.findOneAndUpdate(
   {  _id: id, createdBy: updatedBy },
    {
      name,
      description,
      assignedUsers: assignedUsers || [],
    },
    { returnDocument: "after" },
  );

  if (!updateProject) {
    return {
      status: false,
      message: "Project not found or update failed",
    };
  }

  return {
    status: true,
    message: "Project updated successfully",
    data: updateProject,
  };
};
