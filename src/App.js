import "./assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "./utils/API";
import Chat from "./components/Chat";
import HomePage from "./components/Home";
import JoinChat from "./components/JoinChat";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Navigation from "./components/Navigation";

function App() {
  const [userToken, setUserToken] = useState("");
  const [userObject, setUserObject] = useState({});
  const [roomData, setRoomData] = useState("");
  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    password: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  // triggers on page load so userObject is set to the data within token data. This includes user ID, and username.
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      API.isValidToken(storedToken).then((tokenData) => {
        if (tokenData) {
          console.log(tokenData.data.user);
          setUserObject(tokenData.data.user);
        }
      });
    } else {
      console.log("no token");
    }
  }, []);

  const handleSignUpFormChange = (e) => {
    e.preventDefault();
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginFormChange = (e) => {
    e.preventDefault();
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const clearSignupForm = () => {
    setSignUpFormData({
      username: "",
      password: "",
    });
  };

  const clearLoginForm = () => {
    setLoginFormData({
      username: "",
      password: "",
    });
  };

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <SignUp
              handleSignUpFormChange={handleSignUpFormChange}
              signUpFormData={signUpFormData}
              clearSignupForm={clearSignupForm}
              setUserToken={setUserToken}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              handleLoginFormChange={handleLoginFormChange}
              loginFormData={loginFormData}
              clearLoginForm={clearLoginForm}
              setUserToken={setUserToken}
            />
          }
        />
        <Route
          path="/chat"
          element={<JoinChat roomData={roomData} setRoomData={setRoomData} />}
        />
        <Route path="/chat/:roomId" element={<Chat roomData={roomData} />} />
        <Route path="*" element={<h1>404 page not found'</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
