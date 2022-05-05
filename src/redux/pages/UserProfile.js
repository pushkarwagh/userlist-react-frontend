import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

import { updateProfile } from "../operations/operations";

function UserProfile() {
  const singleUser = useSelector((state) => state.getUser.user);
  const dispatch = useDispatch();

  const [state, setState] = useState("");
  const [newProfile, setNewProfile] = useState("");

  useEffect(() => {
    setState(singleUser);
  }, [singleUser]);

  const selectProfile = (e) => {
    setNewProfile(e.target.files[0]);
  };

  const changeProfile = async (state, newProfile) => {
      if (newProfile !== "") {
      const formData = new FormData();
      formData.append("profile", newProfile);

      const res = await dispatch(updateProfile(formData, state._id));
      if (res.editProfile) {
        setState({ ...singleUser, profile: singleUser.profile });
        setNewProfile("")
      }
    }
  };

  return (
    <div className="container my-1">
      <div className="text-center">
        <FaUserCircle />
        <strong> {state.name} </strong>
      </div>

      <div
        className="shadow w-50 m-auto my-2 border text-center align-self-end"
        style={{ backgroundColor: "lightblue" }}
      >
        <div>
          <p className="my-1 p-1">Profile-Photo</p>
          <img
            src={state.profile}
            alt="user_profile"
            style={{
              width: "150px",
              height: "120px",
              border: "2px solid #559dac",
              borderRadius: "5px",
            }}
          />
          <div className="my-2">
            <input
              className="input p-2 "
              type="file"
              placeholder="Profile"
              name="profile"
              filename="profile"
              onChange={selectProfile}
              style={{ font: "-webkit-small-control" }}
            />
          </div>
          <div className="my-2">
            <button
              className="btn btn-success"
              onClick={() => changeProfile(state, newProfile)}
            >
              {" "}
              upload{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
