import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let err = '';
        axios.post('/user/login', {
                username: this.state.username,
                password: this.state.password
            }).then(response => {
                    console.log('login response: ')
                    console.log(response)
                    if (response.status === 200) {
                        this.props.updateUser({
                            loggedIn: true,
                            username: response.data.username
                        })
                        this.setState({
                            redirectTo: '/'
                        })
                    }
                }).catch(error => {
                    console.log('login error: ')
                    console.log(error);
                    this.setState({errormessage: err.message});
                })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <Form>
                    <br></br>
                    <h3>Login Page</h3>
                    <br></br>
                    <Form.Group as={Row} controlId="formPlaintextUsername" className="justify-content-center">
                        <Form.Label column sm="1">
                            Username
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword" className="justify-content-center">
                        <Form.Label column sm="1">
                            Password
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        </Col>
                    </Form.Group>
                    <Button variant="dark" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                    { this.state.errorMessage &&
                        <h3 className="error"> { this.state.errorMessage } </h3> }
                </Form>
            )
        }
    }
}

export default LoginForm;
