import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);
  const { id } = useParams();

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/getusers");

    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  };
  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Email-ID</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userData, index) => {
              return (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{userData.username}</td>
                  <td>{userData.name}</td>
                  <td>{userData.email}</td>
                  <td>
                    <Link
                      type="button"
                      className="btn  btn-primary mx-2"
                      to={`/viewuser/${userData.id}`}
                    >
                      View
                    </Link>
                    <Link
                      type="button"
                      className="btn  btn-outline-primary mx-2"
                      to={`/edituser/${userData.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn  btn-danger mx-2"
                      onClick={() => {
                        return deleteUser(userData.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
