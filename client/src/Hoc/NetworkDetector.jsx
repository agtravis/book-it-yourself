import React, { Component } from "react";
import localForage from "localforage";
import API from "../utils/API";

export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false,
    };

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener("online", this.handleConnectionChange);
      window.addEventListener("offline", this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener("online", this.handleConnectionChange);
      window.removeEventListener("offline", this.handleConnectionChange);
    }

    handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      if (condition === "online") {
        const webPing = setInterval(() => {
          fetch("//google.com", {
            mode: "no-cors",
          })
            .then(() => {
              this.setState({ isDisconnected: false }, () => {
                this.backOnline();
                return clearInterval(webPing);
              });
            })
            .catch(() => this.setState({ isDisconnected: true }));
        }, 2000);
        return;
      }

      return this.setState({ isDisconnected: true });
    };

    backOnline = () => {
      localForage
        .getItem(`postKey`)
        .then(value => {
          if (value) {
            localForage
              .iterate((value, key, iterationNumber) => {
                if (key === `postKey`) {
                  for (const post of value) {
                    API.addPost(post.post).then(postDb => {
                      API.updateUserNewPost(post.user, { id: postDb.data._id })
                        .then(userDb => {})
                        .catch(err => console.error(err));
                    });
                  }
                }
              })
              .then(() => {
                localForage
                  .removeItem(`postKey`)
                  .then(() => {
                    this.setState({ transmitting: false });
                  })
                  .catch(err => console.error(err));
              })
              .catch(err => console.error(err));
          }
        })
        .catch(err => console.error(err));
    };

    render() {
      const { isDisconnected } = this.state;
      return (
        <div>
          {isDisconnected && (
            <div className="internet-error">
              <p>Internet connection lost</p>
            </div>
          )}
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  return NetworkDetector;
}
