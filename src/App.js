
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import ChangePassword from "./components/ForgotPassword/ChangePassword";
import RessetPassword from "./components/ForgotPassword/ResetPassword";
import HomePage from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Header from "./layout/Header/Header";



function App() {
  
  return (
    <>
      <Header>
        <main>
          <Routes>
            <Route exact path="/" element={<Navigate to="signin" />} />
            <Route element={<ChangePassword />} path='changepassword/:token' />
            <Route element={<RessetPassword />} path='resset' />
            <Route element={<HomePage/>} path='home/:role' />
            <Route element={<SignIn />} path="signin" />
            <Route element={<SignUp />} path="signup" />
          </Routes>
        </main>
      </Header>
    </>
  );
}

export default App;
