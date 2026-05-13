import { Server } from "socket.io";

export default defineNitroPlugin(() => {

  // prevent duplicate init
  if (globalThis.io) {
    return;
  }

  const io = new Server(3000, {
    cors: {
      origin: "*",
    },
  });

  // type-safe
  globalThis.io = io;

  io.on("connection", (socket) => {

    console.log(
      "Socket connected:",
      socket.id
    );

    socket.on("joinProject", (projectId) => {

      if (!projectId) return;

      socket.join(String(projectId));

      console.log(
        `Socket ${socket.id} joined ${projectId}`
      );
    });

    socket.on("leaveProject", (projectId) => {

      if (!projectId) return;

      socket.leave(String(projectId));
    });

    socket.on("disconnect", () => {

      console.log(
        "Socket disconnected:",
        socket.id
      );
    });
  });

  console.log(
    "Socket.IO running on port 3001"
  );
});