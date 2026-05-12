// for getAllProjects
import { IUser } from "~~/server/types/user.types";
import { handleError, handleErrorCatch } from "../../utils/errorHandler";
import ProjectModel from "~~/server/models/project.model";

// ============== get all projects  ===============

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user as IUser;
    const userRole = user.role;
    let {
      page = 1,
      limit = 10,
      name,
      assignedUser,
    } = getQuery(event) as {
      page?: number;
      limit?: number;
      name?: string;
      assignedUser?: string;
    };

    // page in number type conversion

    page = parseInt(page as unknown as string) || 1;
    limit = parseInt(limit as unknown as string) || 10;

    const query: {
      name?: {
        $regex: string;
        $options: string;
      };
      assignedUsers?: string;
    } = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    // emp only see assigned projects

    if (userRole === "Employee") {
      query.assignedUsers = user._id.toString();
    }

    //  manager ya phir admin can filter by assigned user

    if (userRole === "Manager" || userRole === "Admin") {
      if (assignedUser) {
        query.assignedUsers = assignedUser;
      }
    }

    const skip = (page - 1) * limit;

    const projects = await ProjectModel.find(query)
      .populate("createdBy", "name email")
      .populate("assignedUsers", "name email")
      .skip(skip)
      .limit(limit);

    const total = await ProjectModel.countDocuments(query);

    const response = {
      status: true,
      data: projects,
      total,
      page: page,
      limit: limit,
    };

    return response;
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
