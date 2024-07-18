import React, { Component } from 'react';
import axios from '../axiosConfig';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            location: '',
            birthday: '',
            email: '',
            password: '',
            role: 'Client'
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { firstName, lastName, location, birthday, email, password, role } = this.state;
            const response = await axios.post('/user/register', { firstName, lastName, location, birthday, email, password, role });
            console.log(response.data);
            // Handle successful registration, e.g., showing a success message or redirecting
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
        }
    };

    render() {
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required />
                    </div>
                    <div>
                        <label>Location:</label>
                        <input type="text" name="location" value={this.state.location} onChange={this.handleChange} required />
                    </div>
                    <div>
                        <label>Birthday:</label>
                        <input type="date" name="birthday" value={this.state.birthday} onChange={this.handleChange} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                    </div>
                    <div>
                        <label>Role:</label>
                        <select name="role" value={this.state.role} onChange={this.handleChange}>
                            <option value="Client">Client</option>
                            <option value="Professional">Professional</option>
                        </select>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;
