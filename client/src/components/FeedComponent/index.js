import React, { Component } from "react";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import FeedCard from "../FeedCard";
import Nav from "../Nav";
import SideFeedComponent from "../SideFeedComponent";
import axios from "axios";
import localForage from "localforage";
import API from "../../utils/API";
import { Redirect } from "react-router-dom";
import "./style.css";

class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: `bruce`,
      id: ``,
      posts: [],
      filteredPosts: [],
      postTypes: [
        { filterTerm: `artistNeeded`, displayTerm: `Artist Needed` },
        { filterTerm: `showNeeded`, displayTerm: `Show Needed` },
        { filterTerm: `promoterNeeded`, displayTerm: `Promoter Needed` },
      ],
      locationSearch: ``,
      redirect: null,
    };
  }

  componentDidMount() {
    this.getUser();
    this.getPosts();
  }

  filterByType = type => {
    const filtered = this.state.posts.filter(post => post.type === type);
    this.setState({ filteredPosts: filtered });
  };

  filterByLocation = location => {
    const filtered = this.state.posts.filter(
      post => post.location.toLowerCase().indexOf(location.toLowerCase()) !== -1
    );
    this.setState({ filteredPosts: filtered });
  };

  resetPosts = () => {
    this.setState({ filteredPosts: this.state.posts });
  };

  getPosts = () => {
    API.getPosts()
      .then(response => {
        const sortedPosts = response.data
          .filter(
            post =>
              post.complete === false && new Date(post.endDate) > new Date()
          )
          .sort((a, b) => (b.startDate > a.startDate ? 1 : -1));

        this.setState({ posts: sortedPosts, filteredPosts: sortedPosts });
      })
      .catch(err => console.error(err));
  };

  getUser = () => {
    if (navigator.onLine) {
      axios.get("/api/user/").then(response => {
        if (response.data.user) {
          this.setState({
            username: response.data.user.username,
            id: response.data.user._id,
          });
          localForage.setItem(`userKey`, {
            loggedIn: true,
            username: response.data.user.username,
            id: response.data.user._id,
          });
        } else {
          this.setState({
            username: null,
            id: null,
          });
        }
      });
    } else {
      localForage
        .getItem(`userKey`)
        .then(value => {
          if (value) {
          }
          if (value && value.loggedIn) {
            this.setState({
              loggedIn: value.loggedIn,
              username: value.username,
              id: value.id,
            });
          }
        })
        .catch(err => console.error(err));
    }
  };

  render() {
    if (this.state.redirect) {
      const redir = this.state.redirect;
      this.setState({ redirect: null });
      return <Redirect to={redir} />;
    }
    return (
      <div>
        <Nav />
        <Row>
          <Col xl={4}>
            <div className="d-none d-xl-block">
              <SideFeedComponent />
            </div>
          </Col>
          <Col xl={8}>
            <Jumbotron className="maincontain" fluid>
              <Container className="maincontain">
                <button
                  className="btn btn-secondary rounded-pill"
                  onClick={() => {
                    this.setState({ redirect: `/post` });
                  }}
                >
                  New Post
                </button>
                <hr></hr>
                <h5 style={{ marginTop: 60 }}>Filter:</h5>
                <form
                  id="location-search"
                  onSubmit={event => {
                    event.preventDefault();
                    const location = this.state.locationSearch;
                    this.setState({ locationSearch: `` });
                    if (location === ``) {
                      this.resetPosts();
                    } else {
                      this.filterByLocation(location);
                    }
                  }}
                >
                  <label
                    style={{
                      marginRight: 10,
                    }}
                    htmlFor="post-location"
                  >
                    Search Location:
                  </label>
                  <input
                    className="rounded-pill mr-1"
                    type="text"
                    placeholder="   Enter a city"
                    onChange={event => {
                      this.setState({ locationSearch: event.target.value });
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-sm btn-secondary rounded"
                  >
                    Search
                  </button>
                </form>
                <form id="select-post-type" className="mb-5 mt-2">
                  <label
                    style={{
                      marginRight: 40,
                    }}
                    htmlFor="post-types"
                  >
                    Search Type:
                  </label>
                  <select
                    id="post-type"
                    name="post-type-list"
                    onChange={event => {
                      if (event.target.value === ``) {
                        this.resetPosts();
                      } else {
                        this.filterByType(event.target.value);
                      }
                    }}
                  >
                    <option value="" id="default">
                      No Filter
                    </option>
                    {this.state.postTypes.map((postType, index) => {
                      return (
                        <option key={index} value={postType.filterTerm}>
                          {postType.displayTerm}
                        </option>
                      );
                    })}
                  </select>
                </form>
                {this.state.filteredPosts.length > 0
                  ? this.state.filteredPosts.map((post, index) => {
                      return (
                        <FeedCard
                          author={post.author}
                          name={post.name}
                          key={index}
                          title={post.title}
                          location={post.location}
                          startDate={post.startDate}
                          endDate={post.endDate}
                          description={post.description}
                        />
                      );
                    })
                  : null}
              </Container>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FeedComponent;
