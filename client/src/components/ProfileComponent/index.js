import React, { Component } from "react";
import { Image } from "react-bootstrap";
import "./style.css";
import image from "../../assets/images/userTest.png";
import { Link, Redirect } from "react-router-dom";
import FeedCard from "../FeedCard";
import API from "../../utils/API";

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
  }

  // deletePost = (id, author) => {
  //   API.deletePost(id)
  //     .then(data => {
  //       API.updateRemoveUserPost(author, {
  //         id: data.data._id,
  //       })
  //         .then(data => console.log(data))
  //         .catch(err => console.error(err));
  //     })
  //     .catch(err => console.error(err));
  // };

  render() {
    if (this.state.redirect) {
      const redir = this.state.redirect;
      this.setState({ redirect: null });
      return <Redirect to={redir} />;
    }
    return (
      <div>
        <h3 className="title">Personal Info</h3>
        <hr></hr>
        <Image className="pic" src={image} alt="profile pic" />
        <br></br>
        <p className="username">Welcome, {this.props.username}</p>

        <div className="shade w-75">
          <div className="info">
            <span>Location:</span>
            <p>{this.props.location}</p>
          </div>

          <div className="info">
            <span>Email:</span>
            <p>{this.props.email}</p>
          </div>

          <div className="info">
            <span>Phone:</span>
            <p>{this.props.telephone}</p>
          </div>

          <div className="info">
            <span>Status:</span>
            <p>{this.props.status}</p>
          </div>

          <div className="info">
            <span>Role:</span>
            {this.props.role !== undefined ? (
              <ul>
                {this.props.role.map(role => (
                  <li>{role}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <hr></hr>
        <h3 className="title">Posts</h3>
        {this.props.userId ? (
          <Link
            onClick={() => {
              this.setState({ redirect: `/post` });
            }}
          >
            Make a post
          </Link>
        ) : null}
        <div className="shade w-75">
          {this.props.posts !== undefined &&
          this.props.posts.length > 0 &&
          this.props.userId ? (
            this.props.posts.map((post, index) => {
              return (
                <FeedCard
                  key={index}
                  id={post._id}
                  author={post.author}
                  deletePost={this.props.deletePost}
                  togglePostStatus={this.props.togglePostStatus}
                  delete={true}
                  complete={post.complete ? `closed` : `open`}
                  title={post.title}
                  location={post.location}
                  startDate={post.startDate}
                  endDate={post.endDate}
                  description={post.description}
                />
              );
            })
          ) : this.props.posts !== undefined &&
            this.props.posts.length > 0 &&
            !this.props.userId ? (
            this.props.posts
              .sort((a, b) => (b.startDate > a.startDate ? 1 : -1))
              .map((post, index) => {
                return (
                  <FeedCard
                    key={index}
                    delete={false}
                    complete={`negative`}
                    title={post.title}
                    location={post.location}
                    startDate={post.startDate}
                    endDate={post.endDate}
                    description={post.description}
                  />
                );
              })
          ) : (
            <p>No posts yet!</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
