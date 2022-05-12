import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

import { addUser } from "../operations/operations";

function AddUser() {
  const { id } = useParams();
  const loggedInUser = useLocation();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
  });

  const [profile, setProfile] = useState("");

  const selectProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = user;
    const emailCheck = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    if (name === "") {
      setError({ nameErr: "name is required " });
    } else if (name.length < 3) {
      setError({ nameErr: " name must have three characters " });
    } else if (email === "") {
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
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("profile", profile);
      const res = await dispatch(addUser(formData, id));
      if (res.addNew) {
        setProfile("");
        setUser({
          name: "",
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <>
      <div className="text-center">
        <FaUserCircle />
        <strong> {loggedInUser.state.data} </strong>
      </div>
      <div
        className="container my-2 border p-2"
        style={{ backgroundColor: "lightblue" }}
      >
        <div className="header text-center text-secondary d-flex">
          <div>
            {" "}
            <Link to={"/user"}>
              <button className="btn btn-secondary" type="button">
                <BiArrowBack />
              </button>
            </Link>
          </div>{" "}
          <div
            className="heading"
            style={{ marginInline: "auto", alignSelf: "center" }}
          >
            <FaUserPlus /> AddUser{" "}
          </div>
        </div>

        <form className="form-wrapper w-50 my-2 m-auto " onSubmit={onSubmit}>
          <div className="name p-1">
            <div className="label">
              <label>Name:</label>
            </div>
            <input
              style={{ width: "-webkit-fill-available" }}
              className="form-control input border-2px-danger round"
              type="text"
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={onChange}
            />
            {error && error.nameErr ? (
              <p style={{ color: "red", fontSize: "12px" }}>
                {" "}
                {error.nameErr}{" "}
              </p>
            ) : (
              ""
            )}
          </div>

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
              <p style={{ color: "red", fontSize: "12px" }}>
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
              <p style={{ color: "red", fontSize: "12px" }}>
                {" "}
                {error.passwordErr}{" "}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="profile p-1 ">
            <input
              style={{ fontSize: "12px" }}
              className="form-control input"
              type="file"
              placeholder="Profile"
              name="profile"
              filename="profile"
              onChange={selectProfile}
            />
          </div>

          <div className="buttons d-flex my-2 p-1">
            <div>
              <button className="btn btn-success" type="submit">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUser;
