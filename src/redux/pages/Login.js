import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAll, loginUser } from "../operations/operations";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error,setError] = useState({
    emailErr: "",
    passwordErr: "",
  })

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const cookieEmail = getCookie("myEmail");
    const cookiePassword = getCookie("myPassword");

    setUser({
      email: cookieEmail,
      password: cookiePassword,
    });

    setTimeout(() => {
      document.cookie = "myEmail=; MaxAge=0; secure ; path=http://localhost:3000";
      document.cookie ="myPassword=; MaxAge=0; secure ; path=http://localhost:3000";
    }, 5000);

  }, []);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      remember();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAll());
    }, 2000);
  }, []);

 

  const getCookie = (key) => {
    const name = key + "=";
    const arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      while (item.charAt(0) == " ") {
        return (item = item.substring(1));
      }
      if (item.indexOf(name) === 0) {
        return item.substring(name.length, item.length);
      }
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const remember = () => {
    //set cookies...
    document.cookie =
      "myEmail=" + user.email + "; path=http://localhost:3000";
    document.cookie =
      "myPassword=" + user.password + "; path=http://localhost:3000";
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = user;
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    if (email === "") {
      setError({ emailErr: " Email is Required " });
    } else if (!emailCheck) {
      setError({ emailErr: " Enter a valid Email" });
    } else if (password === "") {
      setError({ passwordErr: "password is required  " });
    } else if (password.length < 7) {
      setError({
        passwordErr: "password  must contain  eight characters ",
      });
    } else {
    const res = await dispatch(loginUser(user));
    if (res.login) {
      navigate("/user");
    }
  }
  };

  return (
    <div className="container my-2 border p-2">
      <div className="header text-center text-secondary"> Login </div>
      <form className="form-wrapper my-2 w-50 m-auto p-2" onSubmit={onSubmit}>
        <div className="email p-1">
          <div className="label">
            <label>Email:</label>
          </div>
          <input
            style={{ width: "-webkit-fill-available" }}
            className="form-control input"
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={onChange}
          />
          {error && error.emailErr ? (
            <p style={{ color: "#e50e0e", fontSize: "12px" }}>
              {" "}
              {error.emailErr}{" "}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="password p-1">
          <div className="label">
            <label>Password:</label>
          </div>
          <input
            style={{ width: "-webkit-fill-available" }}
            className="form-control input"
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={onChange}
          />
         {error && error.passwordErr ? (
            <p style={{ color: "#e50e0e", fontSize: "12px" }}>
              {" "}
              {error.passwordErr}{" "}
            </p>
          ) : (
            ""
          )}

        </div>

        <div className="remember-me p-1">
          <input
            // style={{ width: "-webkit-fill-available" }}
            className="checkbox mx-1"
            type="checkbox"
            name="remember me"
            checked={checked}
            onChange={handleChecked}
          />
          <label>Remember me</label>
        </div>

        <div className="button my-2 p-1">
          <button className="submit btn-warning mb-2" type="submit">
            <FaSignInAlt /> Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
