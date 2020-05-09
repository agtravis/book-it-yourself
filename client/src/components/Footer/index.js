import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/images/logo.PNG";
import "./style.css"

function Footer() {
  return (
    <Navbar className="footer" bg="dark" fixed="bottom">
      <a className="copy">&copy; Book-it-Yourself</a>
    </Navbar>
  );
}

export default Footer;
