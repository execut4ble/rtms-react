import React, { useState, useEffect, useRef } from "react";
import apiclient from "../apiclient";
import UserList from "../components/users/userList";
import LoadingSpinner from "../components/loadingSpinner";
import AddUser from "../components/users/modalAddUser";
import useToken from "../components/useToken";

function Users() {
  const { token } = useToken();
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isAuthorized, setAuthorized] = useState(false);

  const page = 2;

  const loopUsers = () => {
    apiclient(token)
      .get("/users")
      .then((response) => {
        const data = response.data;
        setLoading(false);
        setUsers([...users, ...data]);
        setAuthorized(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loopUsers(1, page);
  }, []);

  return (
    <div className="section features" id="feed">
      <div className="container">
        <p className="feed-description"></p>
        <div className="row">
          {!isAuthorized && !isLoading && (
            <div className="section">
              <div className="container">
                <center>
                  <h3 className="section-heading">Access Denied</h3>
                  <p className="section-description">
                    <h6>You are not authorized to view this page.</h6>
                  </p>
                </center>
              </div>
            </div>
          )}
          {isLoading && users.length === 0 && <LoadingSpinner />}
          {((!isLoading && isAuthorized) || users.length > 0) && (
            <div className="twelve columns">
              <h3 className="section-heading">Users</h3>
              <AddUser users={users} setUsers={setUsers} />
              <table className="u-full-width">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <UserList
                      key={i}
                      user={user}
                      users={users}
                      userIndex={i}
                      setUsers={setUsers}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {isLoading && users.length > 0 && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default Users;
