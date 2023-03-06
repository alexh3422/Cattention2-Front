import "./assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "./utils/API";
import ChatFeature from "./components/Chat";
import HomePage from "./components/Home";
import JoinChat from "./components/JoinChat";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const [userToken, setUserToken] = useState("");
  const [userObject, setUserObject] = useState({});
  const [signUpFormData, setSignUpFormData] = useState({
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

  const clearSignupForm = () => {
    setSignUpFormData({
      username: "",
      password: "",
    });
  };

  return (
    <BrowserRouter>
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
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<JoinChat />} />
        <Route path="/chat/:roomId" element={<ChatFeature />} />
        <Route path="*" element={<h1>404 page not found'</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
