import React, { Component } from "react";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import FeedCard from "../FeedCard";
import Nav from "../Nav";
import SideFeedComponent from "../SideFeedComponent";
import axios from "axios";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";

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
        console.log(response.data);
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
    axios.get("/api/user/").then(response => {
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");
        this.setState({
          username: response.data.user.username,
          id: response.data.user._id,
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          username: null,
          id: null,
        });
      }
    });
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
            <Jumbotron fluid>
              <Container>
                <h1>Posts</h1>{" "}
                <Link
                  onClick={() => {
                    this.setState({ redirect: `/post` });
                  }}
                >
                  Make a post
                </Link>
                <h3>Filter:</h3>
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
                  <label htmlFor="post-location">
                    For where are you searching?
                  </label>
                  <input
                    type="text"
                    placeholder="Search for a location"
                    onChange={event => {
                      this.setState({ locationSearch: event.target.value });
                    }}
                  />
                  <button type="submit">Search</button>
                </form>
                <form id="select-post-type">
                  <label htmlFor="post-types">What kind of post?</label>
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
