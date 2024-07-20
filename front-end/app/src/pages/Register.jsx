import React, { Component } from 'react';
import axios from '../axiosConfig';
import '../css/Login.css'; // Use the same CSS for styling

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
            role: 'Client', // Default role
            showProfessionalFields: false
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleRoleChange = (e) => {
        const role = e.target.value;
        this.setState({ role, showProfessionalFields: role === 'Professional' });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { firstName, lastName, location, birthday, email, password, role } = this.state;
            const response = await axios.post('/user/register', { firstName, lastName, location, birthday, email, password, role });
            console.log(response.data);
            // Handle successful registration, e.g., redirecting to login or home page
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
        }
    };

    render() {
        return (
            <div className="overlay">
                <form onSubmit={this.handleSubmit}>
                    <div className="con">
                        <header className="head-form">
                            <h2>Register</h2>
                            <p>Register here using your details</p>
                        </header>
                        <br />
                        <div className="field-set">
                            <span className="input-item">
                                <i className="fa fa-user-circle"></i>
                            </span>
                            <input className="form-input" type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} required />
                            <br />

                            <span className="input-item">
                                <i className="fa fa-user-circle"></i>
                            </span>
                            <input className="form-input" type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} required />
                            <br />

                            <span className="input-item">
                                <i className="fa fa-map-marker"></i>
                            </span>
                            <input className="form-input" type="text" name="location" placeholder="Location" value={this.state.location} onChange={this.handleChange} required />
                            <br />

                            <span className="input-item">
                                <i className="fa fa-calendar"></i>
                            </span>
                            <input className="form-input" type="date" name="birthday" placeholder="Birthday" value={this.state.birthday} onChange={this.handleChange} required />
                            <br />

                            <span className="input-item">
                                <i className="fa fa-envelope"></i>
                            </span>
                            <input className="form-input" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                            <br />

                            <span className="input-item">
                                <i className="fa fa-key"></i>
                            </span>
                            <input className="form-input" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                            <br />

                            <span className="input-item">
                                <i className="fa fa-user"></i>
                            </span>
                            <select className="form-input" name="role" value={this.state.role} onChange={this.handleRoleChange} required>
                                <option value="Client">Client</option>
                                <option value="Professional">Professional</option>
                            </select>
                            <br />

                            {this.state.showProfessionalFields && (
                                <div>
                                    {/* Additional fields for Professionals */}
                                    <span className="input-item">
                                        <i className="fa fa-university"></i>
                                    </span>
                                    <input className="form-input" type="text" name="education" placeholder="Education History" onChange={this.handleChange} required />
                                    <br />
                                    <span className="input-item">
                                        <i className="fa fa-upload"></i>
                                    </span>
                                    <input className="form-input" type="file" name="portfolio" multiple onChange={this.handleChange} required />
                                    <br />
                                </div>
                            )}
                            <button className="log-in">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
