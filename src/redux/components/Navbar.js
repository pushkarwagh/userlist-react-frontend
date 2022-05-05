import React, { useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaStreetView, FaUserAlt } from "react-icons/fa";
import { SiHomebridge } from "react-icons/si";
import { BiLogOutCircle } from "react-icons/bi";

const Navbar = () => {
  const [state, setState] = useState({
    token: "",
    isActive: true,
  });

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(`token`);
    setState({ token: "", isActive: true });
    toast.info("user logged out");
    navigate("/login");
  };

  useEffect(() => {
    const Token = localStorage.getItem(`token`);
    if (Token) {
      setState({ token: Token, isActive: false });
    }
  });

  return (
    <div className="main_navbar">
      <Nav className="navbar shadow navbar-expand-sm  bg-dark mb-2">
        <div className="container text-light m-auto">
          <Link
            to="/"
            className="text-light navbar-brand"
            style={{ textDecoration: "none" }}
          >
            React_Node
          </Link>

          <div className="nav-link d-flex">
            {state.isActive ? (
              <>
                <Link
                  to="/register"
                  className="text-light mx-2"
                  style={{ textDecoration: "none" }}
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className="text-light "
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/user"
                  className="text-light "
                  style={{ textDecoration: "none" }}
                >
                  <SiHomebridge /> Home
                </Link>
                
                <NavDropdown
                  id="basic-nav-dropdown"
                  title={<FaStreetView className="text-light shadow" />}
                  className="dropdown"
                  style={{ textDecoration: "none", marginTop: "-8px"  }}
                >
                  <NavDropdown.Item as={Link} to="/user/profile">
                    {" "}
                    <FaUserAlt />
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    <BiLogOutCircle /> Log-Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </div>
        </div>
      </Nav>
    </div>
  );
};

export default Navbar;
