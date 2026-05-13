import ProjectModel from "~~/server/models/project.model";
import TaskModel from "~~/server/models/task.model";
import User from "~~/server/models/user.model";

export default defineEventHandler(async () => {
  const [totalUsers, totalProjects, totalTasks] = await Promise.all([
    User.countDocuments(),
    ProjectModel.countDocuments(),
    TaskModel.countDocuments(),
  ]);
  return { totalUsers, totalProjects, totalTasks };
});
