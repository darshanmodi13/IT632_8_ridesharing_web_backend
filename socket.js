const { Server } = require("socket.io");
const Ride = require("./app/models").Rides;

const io = new Server(30000, {
  cors: "*",
});

io.on("connection", async (socket) => {
  console.log(`new connection ${socket.id}`);
  socket.on("join", async (data) => {
    if (data.type && data.type === "driver") {
      socket.join(data.city);
      socket.emit("res", { res: "successfully joined." });
    } else {
      socket.join(data.id);
    }
  });
  socket.on("find-ride", async (data) => {
    // console.log(data);
    let res = await socket.in(data.city).fetchSockets();
    if (res.length !== 0) socket.to(data.city).emit("select-ride", data);
    else
      io.to(socket.id).emit("no-ride", {
        msg: "no ride available.",
        id: data.id,
      });
  });

  socket.on("ride-selected", async (data) => {
    let res = await socket.in(data.user_id).fetchSockets();
    if (res.length < 2) {
      socket.join(data.user_id);
      socket.leave(data.location.split(",")[0]);
      io.to(data.user_id).emit("driver-selected", { ...data, status: "200" });
      io.to(data.location.split(",")[0]).emit("ride-cancelled", {
        msg: "can not able to select ride.",
      });
    } else {
      io.to(socket.id).emit("ride-cancelled", {
        msg: "can not able to select ride.",
      });
    }
  });
  socket.on("send-passenger-location", (location) => {
    io.to(location.id).emit("receive-passenger-location", {
      ...location,
    });
  });
  socket.on("end-ride", async (data) => {
    io.to(data.id).emit("ride-ended", { ...data });
  });
  socket.on("disconnect", () => {
    console.log("disconneted");
  });
});
