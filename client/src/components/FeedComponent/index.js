import React, { Component } from "react";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import NameCard from "../NameCard";
import FeedCard from "../FeedCard";
import Nav from "../Nav";
import SideFeedComponent from "../SideFeedComponent";
import axios from "axios";
import API from "../../utils/API";

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

  //   author: "5ea863ce84d81942203caba9"
  // complete: false
  // description: "Looking for a show, any ideas please get in touch!"
  // endDate: "2020-01-01T00:00:00.000Z"
  // location: "Seattle"
  // postedDate: "2020-05-06T20:21:49.558Z"
  // startDate: "2019-01-01T00:00:00.000Z"
  // title: "Looking for a show"
  // type: "artistNeeded"
  // _id: "5ea866f6298ddd2a5c1de8fc"

  getPosts = () => {
    API.getPosts()
      .then(response => {
        console.log(response.data);
        this.setState({ posts: response.data, filteredPosts: response.data });
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
    return (
      <div>
        <Nav />
        <Row>
          <Col sm={4}>
            <SideFeedComponent />
          </Col>
          <Col sm={8} xs={12}>
            <Jumbotron fluid>
              <Container>
                <h1>Posts</h1>
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
