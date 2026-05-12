import { handleError } from "../utils/errorHandler";

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname;
  const method = event.method;
  // console.log(`Request Path: ${path}, Method: ${method}`);
  // =========================
  // ONLY CHECK THESE ROUTES
  // =========================

  const shouldCheck =
    path === "/api/user/allUser" ||
    (path === "/api/projects" && method === "POST") ||
    (/^\/api\/projects\/[^/]+$/.test(path) && method === "PUT") ||
    /^\/api\/projects\/[^/]+\/assign$/.test(path);

  // SKIP EVERYTHING ELSE
  if (!shouldCheck) return;

  // console.log("User Authorization Middleware executed");

  // =========================
  // AUTH CHECK
  // =========================

  const user = event.context.user;

  // console.log("Authenticated User:", user);

  if (!user) {
    return handleError(event, 401, "Unauthorized!");
  }

  // console.log("User Role:", user.role);

  // =========================
  // ROLE CHECK
  // =========================

  if (!["Admin", "Manager"].includes(user.role)) {
    return handleError(event, 403, "Forbidden!");
  }
});
