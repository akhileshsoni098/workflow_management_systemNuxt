/* import { handleError } from "../utils/errorHandler";

export default defineEventHandler(async (event) => {
 const path = getRequestURL(event).pathname;

  if (!path.startsWith("/api")) return;

  const protectedRoutes = [
    "/api/user/allUser",
     "/api/projects", 
     "/api/projects/",
      "/api/projects/[id]/assign",
    ];

  if (!protectedRoutes.includes(path)) return;

  const user = event.context.user;

  if (!user) {
    return handleError(event, 401, "Unauthorized!");
  }

  const allowedRole = ["Admin", "Manager"];

  

  if (!allowedRole.includes(user.role)) {
    return handleError(event, 403, "Forbidden!");
  }
});
 */

import { handleError } from "../utils/errorHandler";

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname;

  if (!path.startsWith("/api")) return;

  const user = event.context.user;

  if (!user) {
    return handleError(event, 401, "Unauthorized!");
  }

  const role = user.role;

  // =========================
  // PROJECT ROUTES
  // =========================

  const validMethods = ["POST", "PUT", "DELETE"];

  if (path === "/api/projects") {
    // POST => Admin + Manager only
    if (validMethods.includes(event.method)) {
      if (!["Admin", "Manager"].includes(role)) {
        return handleError(event, 403, "Forbidden!");
      }
    }

    // GET => All authenticated users
    if (event.method === "GET") {
      if (!["Admin", "Manager", "Employee"].includes(role)) {
        return handleError(event, 403, "Forbidden!");
      }
    }
  }
});
