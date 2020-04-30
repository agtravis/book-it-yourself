import React, { Component } from 'react'

class Home extends Component {
    constructor() {
        super()
    }

    render() {
        const imageStyle = {
            width: 400
        }
        return (
            <div>
                <h1>Book it Yourself!</h1>
                <img style={imageStyle} src="https://i.pinimg.com/564x/bf/4f/74/bf4f7483a7162b16dbfeaa4be32a2656.jpg" />
            </div>
        )

    }
}

export default Home
