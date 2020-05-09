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
      editMode: false,
      location: ``,
      email: ``,
      telephone: ``,
      status: ``,
    };
  }

  render() {
    if (this.state.redirect) {
      const redir = this.state.redirect;
      this.setState({ redirect: null });
      return <Redirect to={redir} />;
    }
    return (
      <div>
        <h2 className="title">Personal Info</h2>
        <hr></hr>
        <Image className="pic" src={image} alt="profile pic" />
        <br></br>
        <p className="username">
          {this.props.userId ? `Welcome, ` : null}
          {this.props.username}
        </p>

        <div className="shade w-75">
        {this.props.userId ? (
            <div
              className="info"
              onClick={() => {
                this.setState({ editMode: true });
              }}
            >
              <span>Location :</span>
              {this.state.editMode ? (
                <input
                  id="status-field"
                  placeholder="press ESC to cancel"
                  onChange={event =>
                    this.setState({ location: event.target.value })
                  }
                  onKeyUp={event => {
                    if (event.keyCode === 27) {
                      this.setState({ editMode: false, location: `` });
                    }
                    if (event.keyCode === 13) {
                      this.props.editLocation(
                        this.props.userId,
                        this.state.location
                      );
                      this.setState({ editMode: false, location: `` });
                    }
                  }}
                />
              ) : (
                <p>{this.props.location}</p>
              )}
            </div>
          ) : (
            <div className="info">
              <span>Location :</span>
              <p>{this.props.location}</p>
            </div>
          )}

          <div className="info">
            <span>Email:</span>
            <p>{this.props.email}</p>
          </div>

          {this.props.userId ? (
            <div
              className="info"
              onClick={() => {
                this.setState({ editMode: true });
              }}
            >
              <span>Phone :</span>
              {this.state.editMode ? (
                <input
                  id="status-field"
                  placeholder="press ESC to cancel"
                  onChange={event =>
                    this.setState({ telephone: event.target.value })
                  }
                  onKeyUp={event => {
                    if (event.keyCode === 27) {
                      this.setState({ editMode: false, telephone: `` });
                    }
                    if (event.keyCode === 13) {
                      this.props.editPhone(
                        this.props.userId,
                        this.state.telephone
                      );
                      this.setState({ editMode: false, telephone: `` });
                    }
                  }}
                />
              ) : (
                <p>{this.props.telephone}</p>
              )}
            </div>
          ) : (
            <div className="info">
              <span>Phone :</span>
              <p>{this.props.telephone}</p>
            </div>
          )}
          {this.props.userId ? (
            <div
              className="info"
              onClick={() => {
                this.setState({ editMode: true });
              }}
            >
              <span>Status :</span>
              {this.state.editMode ? (
                <input
                  id="status-field"
                  placeholder="press ESC to cancel"
                  onChange={event =>
                    this.setState({ status: event.target.value })
                  }
                  // onBlur={() => this.setState({ editMode: false, status: `` })}
                  onKeyUp={event => {
                    if (event.keyCode === 27) {
                      this.setState({ editMode: false, status: `` });
                    }
                    if (event.keyCode === 13) {
                      this.props.editStatus(
                        this.props.userId,
                        this.state.status
                      );
                      this.setState({ editMode: false, status: `` });
                    }
                  }}
                />
              ) : (
                <p>{this.props.status}</p>
              )}
            </div>
          ) : (
            <div className="info">
              <span>Status :</span>
              <p>{this.props.status}</p>
            </div>
          )}

          <div className="info">
            <span>Role :</span>
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
        <h2 className="title">Posts</h2>
        {this.props.userId ? (
          <Link
            onClick={() => {
              this.setState({ redirect: `/post` });
            }}
          >
            Write a post
          </Link>
        ) : null}
          {this.props.posts !== undefined &&
          this.props.posts.length > 0 &&
          this.props.userId ? (
            this.props.posts.map((post, index) => {
              // props if user in session profile
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
                // props for generic profile
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
    );
  }
}

export default ProfileComponent;
