import React from "react";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = (props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <IconButton>
        <Link to="/">
          <KeyboardArrowLeftRoundedIcon
            sx={{
              fontSize: 45,
              // position: "relative",
              alignItems: "center",
              color: "#333",
              position: "relative",
              top: "4px"
            }}
          />
        </Link>
      </IconButton>

      <p
        style={{
          fontSize: "22px",
          fontWeight: 500,
        }}
      >
        Home
      </p>
    </div>
  );
};
