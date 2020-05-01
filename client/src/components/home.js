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
                <h3>Home Page</h3>
                <img style={imageStyle} src="https://i.pinimg.com/564x/bf/4f/74/bf4f7483a7162b16dbfeaa4be32a2656.jpg" />
            </div>
        )

    }
}

export default Home
