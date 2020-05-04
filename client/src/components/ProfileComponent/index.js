import React, { Component } from "react";
import { Jumbotron, Container, Image } from "react-bootstrap";
import "./style.css";
import image from "../../assets/images/userTest.png";

function ProfileComponent(props) {
  return (
    <div>
      <p>Working</p>
      <p className="username">{props.username}</p>
      <Image src={image} alt="profile pic" />
      <p>{props.location}</p>
      <p>{props.email}</p>
      <p>{props.telephone}</p>
      <p>{props.status}</p>
      {props.role !== undefined ? (
        <ul>
          {props.role.map(role => (
            <li>{role}</li>
          ))}
        </ul>
      ) : null}

      {/* {props.posts !== undefined ? (
        <ul>
          {props.posts.map(post => (
            <li>{post.description}</li>
          ))}
        </ul>
      ) : null} */}
    </div>
  );
}

export default ProfileComponent;
