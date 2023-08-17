import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${id}`, user);
    navigate("/");
  };
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onClick = () => {
    navigate("/");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m4">Edit User</h2>
          <form
            action=""
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <div className="mb-3">
              <label htmlFor="name" className=" form-label">
                Name
              </label>
              <input
                type="text"
                className=" form-control"
                placeholder="Enter your name"
                id="name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className=" form-label">
                Username
              </label>
              <input
                type="text"
                className=" form-control"
                placeholder="Enter your username"
                id="username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email-id" className=" form-label">
                Email-ID
              </label>
              <input
                type="text"
                className=" form-control"
                placeholder="Enter your email-id"
                id="email-id"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Change
            </button>
            <button
              type="button"
              className="btn btn-outline-danger mx-2"
              onClick={onClick}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
