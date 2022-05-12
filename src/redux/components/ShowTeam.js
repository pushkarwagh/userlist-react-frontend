import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import { MdAccountBox, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUser, getTeam } from "../operations/operations";

function ShowTeam() {
  const { id } = useParams();
  const loggedInUser = useLocation();
  const { users, loading } = useSelector((state) => state.getTeam);
  const teamMembers = Array.from(users);
  const dispatch = useDispatch();

  const deleteUserAccount = async (userId) => {
    const res = await dispatch(deleteUser(userId));
    if (res.delete) {
      dispatch(getTeam(id));
      toast.success("user-deleted successfully");
    }
  };

  return (
    <div>
      <div className="container bg-light p-2">
        <h3 className="text-center ">
          <FaUserCircle /> {loggedInUser.state.data}
        </h3>
      </div>
      {!loading ? (
        <>
          {teamMembers.length > 0 && (
            <Table
              striped
              bordered
              hover
              variant="light"
              style={{ overflowWrap: "anywhere" }}
            >
              <thead>
                <tr>
                  <th scope="col-2">Id</th>
                  <th scope="col-2">Profile</th>
                  <th scope="col">Name</th>
                  <th scope="col-2">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers &&
                  teamMembers.map((user, i) => {
                    return (
                      <tr key={i}>
                        <td>{user._id}</td>

                        <td>
                          <img
                            src={ user.profile}
                            alt="user"
                            className="shadow rounded"
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>

                        <td>
                          <MdAccountBox /> {user.name}
                        </td>

                        <td>
                          <strong>{user.email}</strong>
                        </td>

                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteUserAccount(user._id)}
                          >
                            {" "}
                            <MdDelete />
                            Account
                          </button>
                        </td>
                      </tr>
                    ); //return close...
                  })}
              </tbody>
            </Table>
          )}
        </>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
}

export default ShowTeam;
