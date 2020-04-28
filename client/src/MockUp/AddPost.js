import React, { useState } from "react";
import API from "../utils/API";

function AddPost(props) {
  const [currentUser, setCurrentUser] = useState();
  const [post, setPost] = useState({
    type: ``,
    title: ``,
    author: ``,
    description: ``,
    location: ``,
    startDate: ``,
    endDate: ``,
  });

  const getUser = id => {
    if (!id) {
      console.log(`no user`);
      setCurrentUser();
      return;
    } else {
      API.getUser(id)
        .then(user => {
          setCurrentUser(user.data);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div>
      <p>AddPost</p>
      <form id="selectUser">
        <label htmlFor="users">Choose a user:</label>
        <select
          id="users"
          name="userlist"
          onChange={event => {
            getUser(event.target.value);
          }}
          onBlur={() => {
            setPost({ ...post, author: currentUser._id });
          }}
        >
          <option value="" id="default">
            Choose a user:
          </option>
          {props.users.map((user, index) => {
            return (
              <option key={index} value={user._id}>
                {user.username}
              </option>
            );
          })}
        </select>
      </form>
      {currentUser ? (
        <div>
          <form
            onSubmit={event => {
              event.preventDefault();
              if (
                !post.type ||
                !post.title ||
                !post.description ||
                !post.location ||
                !post.startDate ||
                !post.endDate ||
                !post.author
              ) {
                alert(`Finish the form!`);
              } else {
                API.addPost(post)
                  .then(postDb => {
                    API.updateUserNewPost(currentUser._id, {
                      id: postDb.data._id,
                    })
                      .then(userDB => {
                        console.log(userDB);
                        setPost({
                          ...post,
                          type: ``,
                          title: ``,
                          description: ``,
                          location: ``,
                          startDate: ``,
                          endDate: ``,
                        });
                        document.getElementById(`type`).value = ``;
                        document.getElementById(`title`).value = ``;
                        document.getElementById(`description`).value = ``;
                        document.getElementById(`location`).value = ``;
                        document.getElementById(`startDate`).value = ``;
                        document.getElementById(`endDate`).value = ``;
                        getUser(currentUser._id);
                      })
                      .catch(err => console.error(err));
                  })
                  .catch(err => console.error(err));
              }
            }}
          >
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              name="typelist"
              onChange={event => {
                setPost({ ...post, type: event.target.value });
              }}
            >
              <option value="">Choose a type:</option>
              <option value="artistNeeded">
                Promoter looking for an artist
              </option>
              <option value="showNeeded">Artist looking for a show</option>
            </select>
            <br />
            Post Title:
            <input
              id="title"
              onChange={event => {
                setPost({ ...post, title: event.target.value });
              }}
            />
            <br />
            Description:
            <input
              id="description"
              onChange={event => {
                setPost({ ...post, description: event.target.value });
              }}
            />
            <br />
            Location:
            <input
              id="location"
              onChange={event => {
                setPost({ ...post, location: event.target.value });
              }}
            />
            <br />
            Starting from:
            <input
              type="date"
              id="startDate"
              onChange={event => {
                setPost({ ...post, startDate: event.target.value });
              }}
            />
            <br />
            Finishing on:
            <input
              type="date"
              id="endDate"
              onChange={event => {
                setPost({ ...post, endDate: event.target.value });
              }}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <p>no current user</p>
      )}
      {currentUser ? (
        currentUser.posts.length > 0 ? (
          <div>
            <h2>Posts:</h2>
            {currentUser.posts.map((post, index) => {
              return (
                <div key={index}>
                  <h4>
                    {post.title} -{" "}
                    <span
                      style={{ cursor: "pointer", fontWeight: "bolder" }}
                      onClick={() => {
                        API.deletePost(post._id)
                          .then(data => {
                            API.updateRemoveUserPost(currentUser._id, {
                              id: data.data._id,
                            });
                            getUser(currentUser._id);
                          })
                          .catch(err => console.error(err));
                      }}
                    >
                      DELETE
                    </span>
                  </h4>
                  <p>{post.location}</p>
                  <p>{post.description}</p>
                  <p>
                    From {Date(post.startDate)} until {Date(post.endDate)}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>no posts yet</p>
        )
      ) : null}
    </div>
  );
}

export default AddPost;
