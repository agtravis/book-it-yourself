import React, { useState } from "react";
import API from "../utils/API";

function AddUser(props) {
  const [userInfo, setUserInfo] = useState({
    username: ``,
    password: ``,
    location: ``,
    role: [],
    status: ``,
    posts: [],
  });

  return (
    <div>
      <p>AddUser</p>
      <form
        onSubmit={event => {
          event.preventDefault();
          API.saveUser(userInfo)
            .then(() => {
              console.log(userInfo);
              props.getUsers();
              setUserInfo({
                username: ``,
                password: ``,
                location: ``,
                role: [],
                status: ``,
                posts: [],
              });
              document.getElementById("username").value = ``;
              document.getElementById("password").value = ``;
              document.getElementById("location").value = ``;
              document.getElementById("promoter").checked = ``;
              document.getElementById("artist").checked = ``;
            })
            .catch(err => console.error(err));
        }}
      >
        Username:
        <input
          id="username"
          onChange={event => {
            setUserInfo({ ...userInfo, username: event.target.value });
          }}
        />
        <br />
        Password:
        <input
          id="password"
          onChange={event => {
            setUserInfo({ ...userInfo, password: event.target.value });
          }}
        />
        <br />
        Location:
        <input
          id="location"
          onChange={event => {
            setUserInfo({ ...userInfo, location: event.target.value });
          }}
        />
        <br />
        <input
          type="checkbox"
          id="promoter"
          name="type"
          value="promoter"
          onChange={event => {
            if (event.target.checked) {
              setUserInfo({
                ...userInfo,
                role: [...userInfo.role, `promoter`],
              });
            } else {
              if (userInfo.role.includes(`promoter`)) {
                const newRoles = [...userInfo.role];
                newRoles.splice(newRoles.indexOf(`promoter`), 1);
                setUserInfo({ ...userInfo, role: newRoles });
              }
            }
          }}
        />
        <label htmlFor="promoter">Promoter</label>
        <input
          type="checkbox"
          id="artist"
          name="type"
          value="artist"
          onChange={event => {
            if (event.target.checked) {
              setUserInfo({
                ...userInfo,
                role: [...userInfo.role, `artist`],
              });
            } else {
              if (userInfo.role.includes(`artist`)) {
                const newRoles = [...userInfo.role];
                newRoles.splice(newRoles.indexOf(`artist`), 1);
                setUserInfo({ ...userInfo, role: newRoles });
              }
            }
          }}
        />
        <label htmlFor="artist">Artist</label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <br />
      <h3>Current Users:</h3>
      {props.users.map((user, index) => {
        return (
          <p key={index}>
            {user.username} from {user.location} role(s):{" "}
            {user.role.map(role => {
              return `${role}, `;
            })}
          </p>
        );
      })}
    </div>
  );
}

export default AddUser;