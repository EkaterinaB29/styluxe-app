import React, { Component } from 'react';
import axios from '../axiosConfig';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password } = this.state;
            const response = await axios.post('/user/login', { email, password });
            console.log(response.data);
            // Handle successful login, e.g., storing token and redirecting
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
        }
    };

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
