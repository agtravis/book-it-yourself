import React, { Component } from 'react';
import { Jumbotron, Container, Image } from 'react-bootstrap';

class Home extends Component {
    constructor() {
        super()
    }

    render() {
        return (
        <Jumbotron fluid>
            <Container>
                <h1>Book-it-Yourself</h1>
                <Image src="https://i.pinimg.com/564x/bf/4f/74/bf4f7483a7162b16dbfeaa4be32a2656.jpg" fluid/>
            </Container>
        </Jumbotron>

     )}
}

export default Home;
