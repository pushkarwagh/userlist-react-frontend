import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./redux/components/Navbar";
import Login from "./redux/pages/Login";
import Register from "./redux/pages/Register";
import Home from "./redux/pages/Home";
import User from "./redux/components/User";
import EditUser from "./redux/components/EditUser";
import NotFound from "./redux/pages/NotFound";
import UserProfile from "./redux/pages/UserProfile";
import AddUser from "./redux/components/AddUser";
import ShowTeam from "./redux/components/ShowTeam";
import { getValueFromLs } from "./redux/utils/helpers";

toast.configure();

function App() {
  const [state, setState] = useState({
    token: "",
    isActive: true,
    
  });

  useEffect(() => {
    const Token = getValueFromLs("token");
    const isAdmin = getValueFromLs("isAdmin");
    if (Token) {
      setState({ token: Token, isActive: false });
    } else {
      setState({ token: "", isActive: true });
    }
  });

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container app">
        <div className="container p-2 bg-light">
          <Routes>
            {state.isActive ? (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<User />} />
                <Route path="/edit/:id" element={<EditUser />} />
                <Route path="/user/profile" element={<UserProfile />} />
                <Route path="/addUser/:id" element={<AddUser />} />
                <Route path="/getTeam/:id" element={<ShowTeam />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
