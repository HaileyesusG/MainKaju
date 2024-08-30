import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Components/SignUp";
// import { io } from "socket.io-client";
import Login from "./Components/LogIn";
// import LoginC from "./Components/LogInC";
import LoginA from "./Components/LogInA";
// import Dashboard from "./Components/Dashboard";
// import Dashboard2 from "./Components/DashBoard2";
// import Chat from "./Components/Chat";
import Admin from "./Components/Admin";
import AdminChat from "./Components/AdminChat";
// import Home from "./Components/Home";
// import FrontPage from "./Components/FrontPage";
// import ChatTech from "./Components/ChatTech";
import SignUpA from "./Components/SignUpA";
// import SignUpC from "./Components/SignUpC";
// import Transition from "./Components/Transition";
// import Transition2 from "./Components/Transition2";
// import { useEffect, useState } from "react";
// import { setTech } from "./features/tech/techSlice";
// import { setAdmin } from "./features/admin/adminSlice";
// import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
// const socket = io("http://localhost:5001");
function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <center>
          <NavBar />
        </center> */}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/LoginA" element={<LoginA />} />
          <Route path="/AdminChat" element={<AdminChat />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignUpA" element={<SignUpA />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
