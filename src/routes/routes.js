import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import ChangePassword from "../pages/ForgotPassword/ChangePassword";
import RessetPassword from "../pages/ForgotPassword/ResetPassword";
import HomePage from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import { useSelector } from "react-redux";
import Cart from "../components/Cart/Cart";
import ListOfChats from "../pages/Chat/ListOfChats";
import Chat from "../pages/Chat/Chat";
import ChatsPanel from "../pages/Chat/ChatsPanel";
import UserProfile from "../pages/Profile/UserProfile";
const AppRoutes = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={<Navigate to={`/home/${user.isAdmin ? "admin" : "user"}`} />}
        />
        <Route element={<ChangePassword />} path="changepassword/:token" />
        <Route element={<ChatsPanel />} path="messages" />
        <Route element={<RessetPassword />} path="resset" />
        <Route element ={<UserProfile /> } path='profile' />
        <Route element={<HomePage />} path="home/:role" />
        <Route element={<SignIn />} path="signin" />
        <Route element={<SignUp />} path="signup" />
        <Route element={<Chat />} path='chat/:id' />
        
        {/* <Route element={<Cart/>} path="cart" /> */}
      </Routes>
    </div>
  );
};

export default AppRoutes;
