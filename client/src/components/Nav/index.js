import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../assets/images/logo.PNG";
import Search from "../Search";
import "./style.css";

function Navigation() {
  return (
    <Navbar
      collapseOnSelect
      className="fixed-top"
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand>
        <img
          src={Logo}
          width="75"
          height="50"
          className="d-inline-block align-top"
          alt="logo"
        />
      </Navbar.Brand>
      <Navbar.Brand href="/">Book it Yourself</Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        className="justify-content-end"
        id="responsive-navbar-nav"
      >
        <Nav.Link href="/addpost">Post</Nav.Link>
        <Nav.Link href="/adduser">Sign Up</Nav.Link>
        <Nav.Link href="/home">Feed</Nav.Link>
        <Nav.Link className="d-block d-sm-none" href="/calendar">
          Calendar
        </Nav.Link>
        <Nav.Link className="d-block d-sm-none" href="/maps">
          Map
        </Nav.Link>
        <Nav.Link className="d-block d-sm-none" href="/search">
          Search
        </Nav.Link>
      </Navbar.Collapse>

      <div className=" d-none d-sm-block justify-content-end">
        <Search />
      </div>
    </Navbar>
  );
}

export default Navigation;
