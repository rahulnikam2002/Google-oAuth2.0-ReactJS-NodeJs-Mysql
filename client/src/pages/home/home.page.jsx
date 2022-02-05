import Axios  from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = (props) => {
    const navigate = useNavigate()
    const logout = () => {
        Axios.get("http://localhost:5000/auth/logout", {withCredentials: true}).then(res => {
                navigate('/signup')
        })
    }
  return (
    <div>
            {
                props.isLogin ? <div>
                        <h1>{props.userName}</h1>
                        <p>{props.userEmail}</p>
                        <img src={props.userImage} alt="" srcset="" />
                        <button onClick={logout}>Logout</button>
                </div> : <button onClick={() => navigate('/signup')}>LogIn</button>  
            }
      
    </div>
  );
};
