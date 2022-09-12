import { Routes, Route, Navigate } from "react-router-dom";
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
            <Route exact path="/" element={<Navigate to="home" />} />
            <Route element={<HomePage/>} path='home' />
            <Route element={<SignIn />} path="signin" />
            <Route element={<SignUp />} path="signup" />
          </Routes>
        </main>
      </Header>
    </>
  );
}

export default App;
