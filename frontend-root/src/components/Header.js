import React from "react";
import "./style.css";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    console.log("clicked");
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="header">
      <Link to="/">
        <h3>Goal App</h3>
      </Link>

      <div className="header_right">
        {user ? (
          <button onClick={onLogout} className="btn">
            <LogoutIcon />
            <h3>Logout</h3>
          </button>
        ) : (
          <>
            <Link to="/login">
              <LoginIcon />
              <h3>Login</h3>
            </Link>
            <Link to="/register">
              <PersonIcon />
              <h3>Register</h3>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
