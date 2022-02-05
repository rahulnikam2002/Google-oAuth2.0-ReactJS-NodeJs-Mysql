import React from "react";
import { FormControl, TextField, InputAdornment, Button } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import HttpsIcon from "@mui/icons-material/Https";
import { ButtonBase } from "@mui/material";
import "./loginForm.css";
import { styled } from "@mui/material/styles";
import googleIcon from "../../Images/GoogleIcon.svg";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

const CustomButton = styled(Button)({
  boxShadow: "none",
  margin: "10px 0",
  textTransform: "none",
  fontSize: 19,
  borderRadius: "8px",
  padding: "10px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "poppins",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
  },
  "&:focus": {
    boxShadow: "none",
  },
});

export const LoginForm = () => {

  const navigate = useNavigate()

  const signInWithGoogle = () => {
    window.open("http://localhost:5000/auth/google", "_self", 'toolbar=no, scrollbars=yes, resizable=no, width=1000, height=auto')
  }

  React.useEffect(() => {
    Axios.get("http://localhost:5000/auth/login/success", {
      withCredentials: true,
    })
      .then((res) => {
        if (res.status == 200) {
          navigate('/')
        } else {
          console.log("No status");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        maxWidth: "88%",
        margin: "auto",
      }}
    >
      <h1>Sign In</h1>
      <div>
        <FormControl fullWidth label="Emal">
          <TextField
            label="Email"
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsIcon />
                </InputAdornment>
              ),
            }}
            margin="normal"
          />
        </FormControl>
      </div>
      <Button style={{ color: "#0063cc", fontWeight: "500", margin: "3px 0" }}>
        Forget Password?
      </Button>

      <CustomButton fullWidth variant="contained">
        Sign in
      </CustomButton>

      <Button
        style={{
          width: "100%",
          margin: 0,
          position: "relative",
          backgroundColor: "#edebeb",
          padding: "10px 12px",
          marginBottom: "20px",
          textTransform: "none",
          border: "none",
          borderRadius: "10px"
        }}
        onClick={signInWithGoogle}
        variant="outlined"
      >
        <img
          style={{
            position: "absolute",
            left: "10px",
          }}
          src={googleIcon}
        />

        <p
          style={{
            width: "90%",
            margin: 0,
            textAlign: "center",
            fontSize: 19,
            color: "#5c5b5b",
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          Sign in with Google
        </p>
      </Button>
    </div>
  );
};
