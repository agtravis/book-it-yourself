import React, { Component } from "react";
import { Image, Form, Button } from "react-bootstrap";
import "./style.css";
import image from "../../assets/images/userTest.png";
import { Link, Redirect } from "react-router-dom";
import FeedCard from "../FeedCard";
import API from "../../utils/API";
import axios from "axios";

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      editModeLocation: false,
      editModeEmail: false,
      editModePhone: false,
      editModeStatus: false,
      editModeRole: false,
      newLocation: ``,
      newEmail: ``,
      newTelephone: ``,
      newStatus: ``,
      newRole: [],
      imageSrc: image,
    };
  }

  componentDidMount() {
    axios
      .get(`https://randomuser.me/api/`)
      .then(result => {
        this.setState({ imageSrc: result.data.results[0].picture.large });
      })
      .catch(err => console.error(err));
  }

  toggleEdit = (event, field) => {
    event.stopPropagation();
    if (this.state[`editMode${field}`]) {
      this.setState({ [`editMode${field}`]: false });
    } else {
      this.setState({ [`editMode${field}`]: true });
    }
  };

  changeState = (event, field) => {
    this.setState({ [`new${field}`]: event.target.value });
  };

  editField = (event, field) => {
    this.toggleEdit(event, field);
    this.props.editField(
      this.props.userId,
      field.toLowerCase(),
      this.state[`new${field}`]
    );
    this.setState({ newRole: [] });
  };

  handleCheck = (event, roleName) => {
    if (event.target.checked) {
      this.setState({
        newRole: [...this.state.newRole, roleName],
      });
    } else {
      if (this.state.newRole.includes(roleName)) {
        const newRoles = [...this.state.newRole];
        newRoles.splice(newRoles.indexOf(roleName), 1);
        this.setState({ newRole: newRoles });
      }
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.toggleEdit(event, `Role`);
    this.editField(event, `Role`);
  };

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
        <Image
          className="pic"
          src={this.state.imageSrc}
          alt="profile pic"
          style={{ width: `200px` }}
        />
        <br></br>
        <p className="username">
          {this.props.userId ? `Welcome, ` : null}
          {this.props.username}
        </p>
        {this.props.userId ? (
          <p style={{ textAlign: `center` }}>
            To edit your details, click on what you want to edit
          </p>
        ) : null}

        <div className="shade w-75">
          {this.props.userId ? (
            <div className="info">
              <span
                onClick={event => {
                  this.toggleEdit(event, `Location`);
                }}
              >
                Location :
              </span>
              {this.state.editModeLocation ? (
                <input
                  id="Location"
                  placeholder="press ESC to cancel"
                  onBlur={event => {
                    this.toggleEdit(event, `Location`);
                  }}
                  onChange={event => this.changeState(event, `Location`)}
                  onKeyUp={event => {
                    if (event.keyCode === 27) {
                      this.toggleEdit(event, `Location`);
                    }
                    if (event.keyCode === 13) {
                      this.editField(event, `Location`);
                    }
                  }}
                />
              ) : (
                <p
                  onClick={event => {
                    this.toggleEdit(event, `Location`);
                  }}
                >
                  {this.props.location}
                </p>
              )}
            </div>
          ) : (
            <div className="info">
              <span>Location :</span>
              <p>{this.props.location}</p>
            </div>
          )}

          <div className="info">
            <span
              onClick={event => {
                this.toggleEdit(event, `Email`);
              }}
            >
              Email:
            </span>
            {this.state.editModeEmail ? (
              <input
                id="Email"
                placeholder="press ESC to cancel"
                onBlur={event => {
                  this.toggleEdit(event, `Email`);
                }}
                onChange={event => this.changeState(event, `Email`)}
                onKeyUp={event => {
                  if (event.keyCode === 27) {
                    this.toggleEdit(event, `Email`);
                  }
                  if (event.keyCode === 13) {
                    this.editField(event, `Email`);
                  }
                }}
              />
            ) : (
              <p
                onClick={event => {
                  this.toggleEdit(event, `Email`);
                }}
              >
                {this.props.email}
              </p>
            )}
          </div>

          <div className="info">
            <span
              onClick={event => {
                this.toggleEdit(event, `Phone`);
              }}
            >
              Phone:
            </span>
            {this.state.editModePhone ? (
              <input
                id="Phone"
                placeholder="press ESC to cancel"
                onBlur={event => {
                  this.toggleEdit(event, `Phone`);
                }}
                onChange={event => this.changeState(event, `Phone`)}
                onKeyUp={event => {
                  if (event.keyCode === 27) {
                    this.toggleEdit(event, `Phone`);
                  }
                  if (event.keyCode === 13) {
                    this.editField(event, `Phone`);
                  }
                }}
              />
            ) : (
              <p
                onClick={event => {
                  this.toggleEdit(event, `Phone`);
                }}
              >
                {this.props.telephone}
              </p>
            )}
          </div>

          <div className="info">
            <span
              onClick={event => {
                this.toggleEdit(event, `Status`);
              }}
            >
              Status:
            </span>
            {this.state.editModeStatus ? (
              <input
                id="Status"
                placeholder="press ESC to cancel"
                onBlur={event => {
                  this.toggleEdit(event, `Status`);
                }}
                onChange={event => this.changeState(event, `Status`)}
                onKeyUp={event => {
                  if (event.keyCode === 27) {
                    this.toggleEdit(event, `Status`);
                  }
                  if (event.keyCode === 13) {
                    this.editField(event, `Status`);
                  }
                }}
              />
            ) : (
              <p
                onClick={event => {
                  this.toggleEdit(event, `Status`);
                }}
              >
                {this.props.status}
              </p>
            )}
          </div>
          <div className="info">
            <span
              onClick={event => {
                this.toggleEdit(event, `Role`);
              }}
            >
              Role :
            </span>
            {this.state.editModeRole ? (
              <>
                <Form.Group>
                  <Form.Check
                    inline
                    type="checkbox"
                    value="artist"
                    label="Artist"
                    onChange={event => this.handleCheck(event, `artist`)}
                  />
                  <Form.Check
                    inline
                    type="checkbox"
                    value="promoter"
                    label="Promoter"
                    onChange={event => this.handleCheck(event, `promoter`)}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.roleError}
                  </div>
                </Form.Group>
                <Button
                  variant="dark"
                  type="submit"
                  onClick={event => {
                    this.handleSubmit(event);
                  }}
                >
                  Submit Roles
                </Button>{" "}
              </>
            ) : (
              <>
                {this.props.role !== undefined ? (
                  <ul
                    onClick={event => {
                      this.toggleEdit(event, `Role`);
                    }}
                  >
                    {this.props.role.map(role => (
                      <li>{role}</li>
                    ))}
                  </ul>
                ) : null}
              </>
            )}
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
            Write a post
          </Link>
        ) : null}
        <div className="shade w-75">
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
      </div>
    );
  }
}

export default ProfileComponent;
