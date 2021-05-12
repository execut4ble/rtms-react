import React from "react";
// import EditUser from "../users/modalEditUser";
import DeleteUser from "./modalDeleteUser";

const UserList = ({ user, users, setUsers, userIndex }) => {
  return (
    <tr>
      <td id="id">{user.id}</td>
      <td id="email">{user.email}</td>
      <td id="username">{user.username}</td>
      <td id="role">{user.role}</td>
      <td>
        {/* <div className="six columns">
          <EditUser
            users={users}
            userIndex={userIndex}
            userID={user.id}
            userEmail={user.email}
            userName={user.username}
            userRole={user.role}
            setUsers={setUsers}
          />
        </div> */}
        <DeleteUser
          userID={user.id}
          users={users}
          setUsers={setUsers}
          userIndex={userIndex}
        />
      </td>
    </tr>
  );
};

export default UserList;
