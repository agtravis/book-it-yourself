import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',

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
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}

render() {
	if (this.state.redirectTo) {
		return <Redirect to={{ pathname: this.state.redirectTo }} />
	}
	return (
		<div className="SignupForm">
			<h4>Create Account</h4>
			<form className="form-horizontal">
				<div className="form-group">
					<label for="exampleInputUsername1">Username: </label>
					<input className="form-input"
						type="text"
						id="username"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<label for="exampleInputPassword1">Password: </label>
					<input className="form-input"
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
				</div>
				<div className="form-group ">
					<div className="col-7"></div>
					<button
						className="btn btn-primary col-1 col-mr-auto"
						onClick={this.handleSubmit}
						type="submit"
					>Submit</button>
				</div>
			</form>
		</div>

	)
}
}

export default Signup
