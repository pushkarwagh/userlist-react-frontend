import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { ImUserPlus } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import { getTeam } from "../operations/operations";

function User() {
  const singleUser = useSelector((state) => state.getUser.user);
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  useEffect(() => {
    setState(singleUser);
  }, []);

  return (
    <>
      <div
        className="container bg-light text-center d-flex align-items-baseline border-round"
        style={{ height: "100px" }}
      >
        <div className="user-heading m-auto">
          Welcome - <strong> {state.name} </strong> :)
        </div>

        <div style={{ marginBlock: "auto" }}>
          <Link to={`/addUser/${state._id}`} state={{ data: state.name }}>
            <button className="btn btn-primary my-1 shadow">
              <ImUserPlus size={20} /> User
            </button>
          </Link>
        </div>
      </div>

      <div className="card my-2 ">
        <Card className=" p-2 shadow" style={{ backgroundColor: "lightblue" }}>
          <Card.Body>
            <Card.Title className="text-center text-dark border border-dark p-2 ">
              <h4> Id: {state._id} </h4>
            </Card.Title>
            <Card.Text className="p-2 text-dark shadow">
              <ul
                key={state._id}
                className="p-2 border"
                style={{ listStyleType: "none" }}
              >
                <li>
                  {" "}
                  <b> Name: </b> {state.name}{" "}
                </li>
                <li>
                  {" "}
                  <b> Email: </b> {state.email}{" "}
                </li>
                <li>
                  {" "}
                  <b> Admin: </b> {state.isAdmin ? "Yes" : "No"}{" "}
                </li>
              </ul>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div style={{ float: "left" }}>
              Team:
              <Link to={`/getTeam/${state._id}`} state={{ data: state.name }}>
                <FaUsers
                  size={20}
                  className="mx-1"
                  onClick={() => dispatch(getTeam(singleUser._id))}
                />
              </Link>
            </div>

            <div style={{ float: "right" }}>
              Edit:
              <Link to={`/edit/${state._id}`} state={{ data: state }}>
                <MdEdit size={20} className="mx-2 " />
              </Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default User;
