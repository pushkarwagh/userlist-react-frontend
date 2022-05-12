import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";

import { getAll } from "../operations/operations";
import UserTableRow from "../components/UsersTable";

function Home() {
  const users = useSelector((state) => state.getAllUsers.users);
  const loginUser = useSelector((state) => state.login.users);
  const dispatch = useDispatch();

  const neUser = Array.from(users);

  useEffect(() => {    
    dispatch(getAll())    
  },[])
  

  const [filterList, setFilterList] = useState(neUser);

  const handleSearch = (event) => {
    if (event.target.value === "") {
      setFilterList(neUser);
      return;
    }
    const filteredValues = neUser.filter(
      (item) =>
        item.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
    );
    setFilterList(filteredValues);
  };

 return (
    <>
      {loginUser.isAdmin ? (
        <div className="main">
          <div
            className="container bg-light text-center"
            style={{ height: "100px" }}
          >
            <div>USER'S-LIST</div>

          </div>

          <div className="user-table " >
            <input
              className="my-1 shadow border border-none"
              type="search"
              placeholder="Search user"
              onChange={handleSearch}
            />
            {users.length > 0 ? (
              <Table
                striped
                bordered
                hover
                variant="light"
                style={{ overflowWrap: "anywhere"}}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th scope="col-2">Id</th>
                    <th scope="col-2">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col-2">Email</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                {/* <tbody> */}
                  {filterList &&
                    filterList.map((user, i) => {
                      if (user.leadId == 0)
                        return (
                          <UserTableRow key={i} index={i + 1} user={user} />
                        );
                    })}
                {/* </tbody> */}
              </Table>
            ) : (
              <h3 className="text-center text-warning"> No users yEt!? </h3>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%)",
            minHeight: "60vh",
            color: "white",
            textAlign: "center",
          }}
        >
          {" "}
          Not Admin?!
        </div>
      )}
    </>
  );
}

export default Home;
