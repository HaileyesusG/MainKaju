import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Components/SignUp";
import PictureUploader from "./Components/muke";
// import { io } from "socket.io-client";
import Login from "./Components/LogIn";
// import LoginC from "./Components/LogInC";
import LoginA from "./Components/LogInA";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
import { useEffect, useState } from "react";
import { setTech, addTech } from "./features/tech/techSlice";
import { useDispatch, useSelector } from "react-redux";
import New from "./Components/New";
import { io } from "socket.io-client";
import Products from "./Components/Products";
// const socket = io("https://mainkaju.onrender.com");
function App() {
  const todo2 = useSelector((state) => state.tech.tech);
  const [user, setUser] = useState();
  const dispatch2 = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      featch(user._id);
    } else {
      const storedUser = localStorage.getItem("user");
      console.log("not found2U", storedUser);
    }
  }, []);
  //user
  const featch = async (id) => {
    const response = await fetch(
      `${API_BASE_URL}/api/user/GetOneUserById/${id}`
    );
    const json = await response.json();
    if (!response.ok) {
      console.log("can not log");
    }
    if (response.ok) {
      dispatch2(setTech(json));
      console.log("the my user is ", json);
      //save the user on local storage
      // localStorage.setItem("user", JSON.stringify(json));
    } else {
      console.log("not log in");
    }
  };
  return (
    <div>
      <BrowserRouter>
        {/* <center>
          <NavBar />
        </center> */}
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LoginA" element={<LoginA />} />
          <Route path="/AdminChat" element={<AdminChat />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignUpA" element={<SignUpA />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Products user3={user || todo2[0]} />} />
          <Route path="/New" element={<New />} />
          <Route path="/PictureUploader" element={<PictureUploader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
