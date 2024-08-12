import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { GrTechnology } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import { IoMdLogOut } from "react-icons/io";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  const { username, email, phone, isAdmin } = user || {};

  return (
    <nav>
      <Link to="/" className="title">
        <span style={{ fontSize: "2em", color: "#22d3ee" }}>
          <GrTechnology /> E_Technology
        </span>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        {isAdmin && (
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/service">Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <ul className={menuOpen ? "open" : ""}>
        {isLoggedIn ? (
          <Dropdown>
            <Dropdown.Toggle className="rounded-5" id="dropdown-basic">
              <FaUserCircle style={{ fontSize: "3em", color: "#22d3ee" }} />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ color: "#22d3ee", textAlign: "center" }}>
              <li>{username}</li>
              <li>{email}</li>
              <li>{phone}</li>
              <li><NavLink to="/logout"><IoMdLogOut /> Logout</NavLink></li>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
