const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const DbConnection = require("./Config/DbConnection");
const bodyParser = require("body-parser");
const path = require("./Routes/UserRoute");
const path2 = require("./Routes/CarRoute");
const path3 = require("./Routes/HouseRoute");
const path4 = require("./Routes/GetAllItemsRoute");
const path5 = require("./Routes/CartRoute");
const path6 = require("./Routes/PaymentRoute");
const path7 = require("./Routes/AdminRoute");
const path8 = require("./Routes/ChatRoute");
const ApplicantRoute = require("./Routes/ApplicantRoute");
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use("/api/User", path);
app.use("/api/Car", path2);
app.use("/api/House", path3);
app.use("/api/GetAllItems", path4);
app.use("/api/Cart", path5);
app.use("/api/Payment", path6);
app.use("/api/Applicants", ApplicantRoute);
app.use("/api/Admin", path7);
app.use("/api/Chat", path8);
DbConnection();
const serv = http.createServer(app);
const io = new Server(serv, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
let onlineuser = [];
const addNewUser = (email) => {
  !onlineuser.some((user) => user.email === email) &&
    onlineuser.push({ email });
};
const removeUser = (socketId) => {
  onlineuser = onlineuser.filter((user) => user.socketId !== socketId);
};
const getUser = (email) => {
  return;
};
let isFirstConnection = true;
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  console.log("user con", onlineuser);
  isFirstConnection = false;
  socket.on("newUser", (email) => {
    addNewUser(email);
  });
  socket.on("isLoading", (msg) => {
    io.emit("isLoading", msg);
  });
  socket.on("ShowTech", (msg) => {
    io.emit("ShowTech", msg);
  });
  socket.on("send_message", (msg) => {
    io.emit("receive_message", msg);
  });
  socket.on("send_message2", (msg) => {
    io.emit("receive_message2", msg);
  });
  socket.on("ErrorM", (msg) => {
    io.emit("ErrorM", msg);
  });
  socket.on("MyObject", (msg) => {
    io.emit("MyObject", msg);
  });
});

serv.listen(port, () => {
  console.log(`i am in port  ${port}`);
});
