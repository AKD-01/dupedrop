import React from "react";
import './Navbar.css'
const Navbar = ({ text }) => {

  return (
    <div className="navbar">
      <h2 style={{ margin: 0 }}>{text}</h2>
    </div>
  );
};

export default Navbar;
