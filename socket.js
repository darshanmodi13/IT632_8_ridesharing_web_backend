const { Server } = require("socket.io");

const io = new Server(process.env.PORT || 8081, {
  cors: "*",
});

io.on("connection", (socket) => {
  console.log(`new connection ${socket.id}`);
  socket.on("join", async (data) => {
    if (data.type && data.type === "driver") {
      socket.join("ahmedabad");
      socket.emit("res", { res: "successfully joined." });
    } else {
      socket.join("ride-select");
    }
  });
  socket.on("find-ride", async (data) => {
    // console.log(data);
    let res = await socket.in("ahmedabad").fetchSockets();
    if (res.length !== 0) socket.to("ahmedabad").emit("select-ride", data);
    else
      io.to(socket.id).emit("no-ride", {
        msg: "no ride available.",
        id: data.id,
      });
  });

  socket.on("ride-selected", async (data) => {
    let res = await socket.in("ride-select").fetchSockets();
    if (res.length < 2) {
      socket.join("ride-select");
      socket.leave("ahmedabad");
      io.to("ride-select").emit("driver-selected", { ...data, status: "200" });
      io.to("ahmedabad").emit("ride-cancelled", {
        msg: "can not able to select ride.",
      });
    } else {
      io.to(socket.id).emit("ride-cancelled", {
        msg: "can not able to select ride.",
      });
    }
  });
  socket.on("send-passenger-location", (location) => {
    io.to("ride-select").emit("receive-passenger-location", {
      ...location,
    });
  });
  socket.on("disconnect", () => {
    console.log("disconneted");
  });
});

// const avaliable_offers = [
//   {
//     city: "ahmedabad",
//     lat: 23.017879,
//     lng: 72.597008,
//   },
//   {
//     city: "ahmedabad",
//     lat: 23.017879,
//     lng: 72.597008,
//   },
//   {
//     city: "ahmedabad",
//     lat: 23.017879,
//     lng: 72.597008,
//   },
// ];

// const ride_finders = [{}];
