import { TaskFilterQuery } from "~~/server/api/tasks/[projectId]/index.get";
import { IUser } from "~~/server/types/user.types";

export const tasksByProjectKey = (
  user: IUser,
  projectId: string,
  query: TaskFilterQuery
) => {

  const {
    status = "all",
    priority = "all",
  } = query;

  return `
tasks:${projectId}
:${user.role}
:${user._id}
:status:${status}
:priority:${priority}
`.replace(/\s/g, "");
};