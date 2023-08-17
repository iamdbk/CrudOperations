import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          FullStack Application
        </Link>
        <Link to="/adduser" className=" btn btn-outline-light">
          Add User
        </Link>
      </div>
    </nav>
  );
}
