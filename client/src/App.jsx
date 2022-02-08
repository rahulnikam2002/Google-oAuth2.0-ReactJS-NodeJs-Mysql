import React, { useEffect, useState } from "react";
import "./App.css";
import { AuthPage } from "./pages/Auth/AuthPage";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/home.page";
import Axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userImg, setUserImg] = useState("");

  
  //Requesting on http://localhost:5000/auth/login/success and getting users data.
  useEffect(() => {
    Axios.get("http://localhost:5000/auth/login/success", {
      withCredentials: true,
    })
      .then((res) => {
        if (res.status == 200) {
          setUserName(res.data.user[0]);
          setUserEmail(res.data.user[1]);
          setUserImg(res.data.user[2]);
        } else {
          console.log("No status");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<AuthPage  />} />
        <Route path="/" element={<HomePage isLogin={userName.length > 0 ? true:false} userName={userName} userEmail={userEmail} userImage={userImg} />} />
      </Routes>
    </div>
  );
}

export default App;
