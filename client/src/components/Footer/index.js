import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/images/logo.PNG";
import "./style.css"

function Footer() {
  return (
    <Navbar className="footer" bg="dark" fixed="bottom">
      <Navbar.Brand>
        <img
          src={Logo}
          width="40"
          height="25"
          className="d-inline-block align-top"
          alt="logo"
        />
      </Navbar.Brand>
    </Navbar>
  );
}

export default Footer;
