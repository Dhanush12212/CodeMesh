// socket/socket.js
const { Server } = require("socket.io");

const rooms = new Map();

const socketHandler = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "https://code-mesh.vercel.app"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);

      if (!rooms.has(roomId)) {
        rooms.set(roomId, { code: "", language: "javascript" });
      }

      const { code, language } = rooms.get(roomId);

      console.log(`User ${socket.id} joined room: ${roomId}`);
      io.to(socket.id).emit("roomJoined", { roomId, message: `Joined room: ${roomId}` });
      io.to(socket.id).emit("updatedCode", { roomId, code });
      io.to(socket.id).emit("languageChange", { roomId, language });
    });

    // Language change
    socket.on("languageChange", ({ roomId, selectedLanguage }) => {
      if (rooms.has(roomId)) {
        rooms.get(roomId).language = selectedLanguage;
        io.to(roomId).emit("languageChange", { roomId, language: selectedLanguage });
      }
    });

    // Code updates
    socket.on("updatedCode", ({ roomId, newCode }) => {
      if (rooms.has(roomId)) {
        rooms.get(roomId).code = newCode;
        socket.to(roomId).emit("updatedCode", { roomId, code: newCode });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = socketHandler;
