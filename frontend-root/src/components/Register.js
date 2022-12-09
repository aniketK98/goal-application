import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/authSlice";
import Spinner from "./Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, email, password, cPassword } = formData;

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      toast.error("Password do not match");
    } else {
      const userData = { name, email, password };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="form_container">
        <h1>
          <PersonIcon fontSize="large" />
          Register
        </h1>
        <h2>Register and Start setting GOALS</h2>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={onChange}
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={onChange}
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={onChange}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={cPassword}
                onChange={onChange}
                id="cPassword"
                name="cPassword"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group">
              <button>Register</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Register;
