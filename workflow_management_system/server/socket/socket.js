const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinProject", (projectId) => {
      if (!projectId) return;

      socket.join(String(projectId));

      console.log(
        `Socket ${socket.id} joined project ${projectId}`
      );
    });

    socket.on("leaveProject", (projectId) => {
      if (!projectId) return;

      socket.leave(String(projectId));
    });

    socket.on("sendMessage", (data) => {
      const { projectId, message } = data;

      io.to(String(projectId)).emit("receiveMessage", {
        message,
        createdAt: new Date(),
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;