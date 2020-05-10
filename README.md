# Book-It-Yourself

### UML

![BIYUML](https://user-images.githubusercontent.com/56744605/81463819-67fa2480-9171-11ea-94e2-08c4b4ab895c.png)




Check out the repo [here](https://github.com/agtravis/book-it-yourself), and see the app in operation [here](https://book-it-yourself.herokuapp.com/).

This app runs in the browser - see [Setup](#setup) below for instructions on how to use.

## Table of contents
- [About](#about)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Code Examples](#code-examples)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Contact](#contact)



## About

Book-it-yourself is an app that connects artists and promoters across the globe. The inspiration for our project came from the 90's publication Book Your Own Fuc*in Life. This publication was instrumental in the 90's to help connect bands and promoters across the world. Unfortunately with the rise in technology in the 2000's the publication went away, and it in turn made it harder for artists to connect with other artists and promoters... Until now! With Book-it-Yourself artists and promoters around the globe have the ability to all be connected on one app. Users can search for and connect with other individuals, explore posts all around the globe based on location or type of post. The time has come for artists to take back the ability to Book Your Own Fuc*in Life!!!

## Screenshots


![Screenshot (154)](https://github.com/agtravis/book-it-yourself/blob/master/client/src/assets/images/indexcap.PNG?raw=true)
Above is the main log in screen on desktop. The styling is based off of the old Publication Book Your Own Fuc*in Life. 
![Screenshot (155)](https://github.com/agtravis/book-it-yourself/blob/master/client/src/assets/images/indexmcap.PNG?raw=true)
Above is the log in screen on mobile. One key functionality about the App that will be explained more in this Readme is the ability for the app to be a downloadable web app, as mobile is the preferred use of application 
![Screenshot (156)](https://github.com/agtravis/book-it-yourself/blob/master/client/src/assets/images/feedcap.PNG?raw=true)
Above is an example of layout responsiveness with an Ipad on feed. 
![Screenshot (157)](https://github.com/agtravis/book-it-yourself/blob/master/client/src/assets/images/profilecap.PNG?raw=true)
Example of user profile above. 


## Technologies

This app was built with React.

### Back-end package.json dependencies:

```js
"dependencies": {
    "axios": "^0.19.2",
    "bcryptjs": "^2.4.3",
    "connect-mongo": "^3.2.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "if-env": "^1.0.4",
    "localforage": "^1.7.3",
    "mongoose": "^5.9.7",
    "morgan": "^1.10.0",
    "passport": "^0.4.1",
    "passport-local": "^1.0.0",
    "react-calendar": "^3.0.1"
  }
```

### Front-end package.json dependecies:

```js
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "axios": "^0.19.2",
    "bootstrap": "^4.4.1",
    "localforage": "^1.7.3",
    "react": "^16.13.1",
    "react-bootstrap": "^1.0.1",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.4.1"
  },
```

## Code Examples

### localForage

`localForage` is a library for IndexedDB. It makes utilizing this feature of the browser much easier to enable offline functionality. This runs in parallel with the fact that the app is a Progressive Web App (specifically installable).

This app uses localForage for two main parts of its UI - keeping the user in session, and allowing the user to make posts while offline, and it does this by effectively using the local storage feature.

When a user makes a post, the code first checks to see if the browser is online:

```js
 if (navigator.onLine) {
```

If it is, it will perform a regular database `POST` using `mongoose` through the model schema for our `MongoDB` database. Once the post is confirmed, the user ID is then used to `PUT` the user collection and `$push` the post `._id` to the array of posts stored in the user collection (to enable a `population` when called upon). Similarly, when the user deletes their post, an equivalent `$pull` - `PUT` is made to remove it, but leave the other posts intact.

If the browser is offline, an object is created to be `POST`ed later, and then here's how the code looks:

```js
localForage
  .getItem("postKey")
  .then(value => {
    postArr.push(postObj);
    if (value && value.length > 0) {
      for (const post of value) {
        postArr.push(post);
      }
    }
    localForage
      .setItem(`postKey`, postArr)
      .then(value => {
        console.log(`localForage success - post stored offline!`);
        this.setState({ offlineSuccess: true });
        console.log(value);
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
```

The code first gets the key from the local storage. It will be an array, if it is not already, so this first block checks to see if it exists and if it has a length, and if so takes each post already there and pushes them to a new array (`postArr`). If there is nothing there in storage, it doesn't attempt to retrieve anything.

Next it then uses `setItem` to write a new object to the storage, and using the same key name ensure the old data is overwritten. Finally, when the new key exists, the state of the component is adjusted (in this case so a success message appears to the user).

The really interesting part is how the app knows when to try to post the stored data. We have a component called `NetworkDetector`, there's too much code to paste in here, but click [here](https://github.com/agtravis/book-it-yourself/blob/master/client/src/Hoc/NetworkDetector.jsx) to see it.

Now instead of exporting `App` by itself, we first import that component in app.js, and then when we export app we run it as an argument through the NetworkDetector, like so:

```js
export default NetworkDetector(App);
```

This file will check to see with event listeners and by pinging google.com to see if the app is online. If it finds that it is online, a function called `backOnline` is called. Again, the code is long, so click on the link to view it, but the interesting parts are:

```js
localForage
    .iterate((value, key, iterationNumber) => {
        if (key === `postKey`) {
            for (const post of value) {
                API.addPost(post.post).then(postDb => {
                    API.updateUserNewPost(post.user, { id: postDb.data._id })
```

which ensures first we are looking at the right key, then loops through the array and for each post makes the `POST` request and subsequent `PUT` push, and then:

```js
localForage.removeItem(`postKey`);
```

Ensures there are no lingering posts to get duplicated.


### ServiceWorker 

React comes with a built in service worker. It was really important for our application to take full advantage of this as the intended purpose for this app is to be a downloadable mobile web app. 

```js 
function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
```
First the service worker checks to see if it is registered or unregistered. If it is registered it will continue, otherwise it will end with an reload of the page.   

```js 
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use.')
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}
```

Now we have registered the service worker which has updated the precached content. The previous service worker will continue to run until all tabs are close. When all content has been precached the app has the ability to work for offline use. 


## Setup

If the user just wants to use the app, all they have to do is sign up for an account!

If the user has forked the repo and wants to see the code and potentially make changes to it, they should run `npm -i` or `npm install` in the terminal at the server level. This will automatically run the package.json dependencies at both back and front end levels. Then if the user wants they can run `npm run seed` to populate the database with a few users and posts.

## Features

This Progressive Web Application has offline abilities, is responsive and features encrypted user passwords.

Maps.......

Chat.......

## Status & Future Developement

..........

## Contact

Created by [@agtravis](https://agtravis.github.io/portfolio) | [@ddhoang21](https://ddhoang21.github.io/My-Portfolio/) | [@FrantzCFelix](https://github.com/FrantzCFelix) | [@Issouf03](https:///) | [@remyguts](https:///)| [@resousa](https://github.com/resousa/)

