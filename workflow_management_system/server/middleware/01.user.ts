// server/middleware/user/auth.ts

import User from "../models/user.model";
import { verifyToken } from "../services/user/auth.service";
import { handleError } from "../utils/errorHandler";

export default defineEventHandler(async (event) => {
 const path = getRequestURL(event).pathname;

  // only api routes
  if (!path.startsWith("/api")) return;

  // ===== PUBLIC ROUTES =====
  const publicRoutes = ["/api/user/auth/login", "/api/user/auth/register"];

  // public route => skip auth
  if (publicRoutes.includes(path)) {
    return;
  }

  // ===== AUTH CHECK =====

  const authHeader = getHeader(event, "authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return handleError(event, 401, "Invalid Auth Credential");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return handleError(event, 401, "Token is missing ");
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      return handleError(event, 401, "Un authenticated user Access!");
    }

    const user = await User.findById(decoded._id).select("-password").lean();

    if (!user) {
      return handleError(event, 404, "User not found");
    }

    // attach user
    event.context.user = user;
  } catch {
    return handleError(event, 401, "Un authenticated user Access!");
  }
});
