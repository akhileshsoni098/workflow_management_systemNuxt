import { queryProject } from "~~/server/api/projects/index.get";
import { IUser } from "~~/server/types/user.types";

export const projectsListKey = (
  user: IUser,
  query: queryProject
) => {
  const { page = 1, limit = 10, name = "all", assignedUser = "all" } = query;

  return `
projects:${user.role}:${user._id}
:name:${name}
:assigned:${assignedUser}
:page:${page}
:limit:${limit}
`.replace(/\s/g, "");
};

export const projectDetailsKey = (user: IUser, projectId: string) => {
  return `
project:${user.role}
:${user._id}
:${projectId}
`.replace(/\s/g, "");
};
