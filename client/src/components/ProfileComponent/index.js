import React from "react";
import {  Image } from "react-bootstrap";
import "./style.css";
import image from "../../assets/images/userTest.png";

function ProfileComponent(props) {
  return (
    <div>
      <h3 className="title">Personal Info</h3>
      <hr></hr>
      <Image className="pic" src={image} alt="profile pic" />
      <br></br>
      <p className="username">Welcome, {props.username}</p>

      <div className="shade w-75">
        <div className="info">
          <span>Location:</span>
          <p>{props.location}</p>
        </div>

        <div className="info">
          <span>Email:</span>
          <p>{props.email}</p>
        </div>

        <div className="info">
          <span>Phone:</span>
          <p>{props.telephone}</p>
        </div>

        <div className="info">
          <span>Status:</span>
          <p>{props.status}</p>
        </div>

        <div className="info">
          <span>Role:</span>
          {props.role !== undefined ? (
            <ul>
              {props.role.map(role => (
                <li>{role}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <hr></hr>
      <h3 className="title">Posts</h3>
      <div className="shade w-75">
        <p>This is a sample post</p>
        {/* {props.posts !== undefined ? (
        <ul>
          {props.posts.map(post => (
            <li>{post.description}</li>
          ))}
        </ul>
      ) : null} */}
      </div>
    </div>
  );
}

export default ProfileComponent;
