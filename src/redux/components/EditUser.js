import React, { useState } from "react";
import { FaBackward, FaUserCircle, FaUserEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getAll, editUser } from "../operations/operations";

function EditUser() {
  const prevUser = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id, name, email } = prevUser.state.data;
  const [user, setUser] = useState({
    _id: _id,
    name: name,
    email: email,
    password: "",
  });

  const [newPass, setNewPass] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (user.name === "") {
      toast.warning("name cannot be empty");
      return { edit: false };
    }

    const res = await dispatch(editUser(user));
    if (res.edit) {
      dispatch(getAll());
      navigate("/user");
      setUser({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="container bg-light p-2">
      <h3 className="text-center ">
        <FaUserCircle /> {name}
      </h3>

      <form
        className="form-wrapper my-3 p-4 w-50 m-auto border border-success rounded"
        style={{ backgroundColor: "lightblue" }}
        onSubmit={onSubmit}
      >
        <div className="name p-2">
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
        </div>

        <div className="email p-2">
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
            disabled
          />
        </div>

        {newPass ? (
          <div className="new-password p-2">
            <div className="label">
              <label>New-Password:</label>
            </div>
            <input
              style={{ width: "-webkit-fill-available" }}
              className="form-control input"
              type="password"
              placeholder="Pasword"
              name="password"
              value={user.password}
              onChange={onChange}
            />
          </div>
        ) : (
          ""
        )}

        <div className="form-check">
          <input
            className=" form-check-input"
            type="checkbox"
            value=""
            id="flexCheckIndeterminate"
            onClick={() => setNewPass(!newPass)}
          />
          <label className="form-check-label" htmlFor="flexCheckIndeterminate">
            Change Password
          </label>
        </div>

        <div className="button my-2 p-2">
          <Link to="/user">
            <button className="btn-danger me-2 rounded" type="button">
              <FaBackward /> Back
            </button>
          </Link>

          <button className="submit btn-warning rounded" type="submit">
            <FaUserEdit /> Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
