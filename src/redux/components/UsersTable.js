import React, { useEffect, useRef, useState } from "react";
import { MdAccountBox, MdDelete } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { getAll, deleteUser } from "../operations/operations";
import { slideDown, slideUp } from "./anim";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers } from "../actions/actionCreators";

function UserTableRow({ user }) {
  const users = useSelector((state) => state.getAllUsers.users);
  const dispatch = useDispatch();

  const textInput = useRef("expanderBody");

  const [expanded, setExpanded] = useState(false);
  const [filterTeam, setFilterTeam] = useState("");

  const neUser = Array.from(users);

  useEffect(() => {
    const filteredValues = neUser.filter((item) => item.leadId == user._id);
    setFilterTeam(filteredValues);
  }, []);

  const toggleExpander = (e) => {
    if (e.target.type === "checkbox") return;

    if (!expanded) {
      setExpanded(true, () => {
        if (textInput) {
          textInput.current.focus();
          slideDown(textInput.current.focus());
        }
      });
    } else {
      slideUp(textInput.current, {
        onComplete: () => {
          setExpanded(false);
        },
      });
    }
  };

  const deleteUserAccount = async (id) => {
    const res = await dispatch(deleteUser(id));
    if (res.delete) {
      dispatch(deleteUsers(id));
      dispatch(getAll());
      toast.success("user-deleted successfully");
    }
  };

  return [
    <tbody>
      <tr key="main" onClick={(e) => toggleExpander(e)}>
        <td>
          <input className="uk-checkbox" type="checkbox" />
        </td>
        <td>{user._id}</td>
        <td>
          <img
            className="uk-preserve-width uk-border-circle"
            src={user.profile}
            width={48}
            alt="avatar"
          />
        </td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          {" "}
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
    </tbody>,
    expanded && (
      <tbody>
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={12}>
            <div ref={textInput} className="inner uk-grid ">
              {filterTeam.map((user, i) => {
                return (
                  <tr key={i}>
                    <td> {i + 1}- </td>
                    <td scope="col-2">{user._id}</td>

                    <td scope="col-2">
                      <img
                        className="shadow rounded"
                        src={user.profile == "" ? <FaUserAlt /> : user.profile}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>

                    <td scope="col">
                      <MdAccountBox /> {user.name}
                    </td>

                    <td scope="col-2">
                      <strong>{user.email}</strong>
                    </td>

                    <td scope="col">
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
            </div>
          </td>
        </tr>
      </tbody>
    ),
  ];
}

export default UserTableRow;
