import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../css/Login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        location: '',
        birthday: '',
        email: '',
        password: '',
        role: 'Client',
        education: '',
        portfolio: []
    });
    const [showProfessionalFields, setShowProfessionalFields] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            portfolio: e.target.files
        });
    };

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setFormData({
            ...formData,
            role
        });
        setShowProfessionalFields(role === 'Professional');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { firstName, lastName, location, birthday, email, password, role, education, portfolio } = formData;
            const data = new FormData();
            data.append('firstName', firstName);
            data.append('lastName', lastName);
            data.append('location', location);
            data.append('birthday', birthday);
            data.append('email', email);
            data.append('password', password);
            data.append('role', role);
            if (role === 'Professional') {
                data.append('education', education);
                for (let i = 0; i < portfolio.length; i++) {
                    data.append('portfolio', portfolio[i]);
                }
            }

            const response = await axios.post('http://88.200.63.148:8211/api/user/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Registration response:', response.data);
            Cookies.set('token', response.data.token);

            if (role === 'Professional') {
                navigate('/profile/professional');
            } else {
                navigate('/profile/client');
            }
        } catch (error) {
            if (error.response && error.response.data.code === 'ER_DUP_ENTRY') {
                setErrorMessage('Email already registered. Please use a different email.');
            } else {
                setErrorMessage('Registration failed. Please try again later.');
            }
        }
    };

    return (
        <div className="overlay">
            <form onSubmit={handleSubmit}>
                <div className="con">
                    <header className="head-form">
                        <h2>Register</h2>
                        <p>Register here using your details</p>
                    </header>
                    <br />
                    <div className="field-set">
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <span className="input-item">
                            <i className="fa fa-user-circle"></i>
                        </span>
                        <input className="form-input" type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                        <br />
                        <span className="input-item">
                            <i className="fa fa-user-circle"></i>
                        </span>
                        <input className="form-input" type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                        <br />
                        <span className="input-item">
                            <i className="fa fa-map-marker"></i>
                        </span>
                        <input className="form-input" type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                        <br />
                        <span className="input-item">
                            <i className="fa fa-calendar"></i>
                        </span>
                        <input className="form-input" type="date" name="birthday" placeholder="Birthday" value={formData.birthday} onChange={handleChange} required />
                        <br />
                        <span className="input-item">
                            <i className="fa fa-envelope"></i>
                        </span>
                        <input className="form-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <br />
                        <span className="input-item">
                            <i className="fa fa-key"></i>
                        </span>
                        <input className="form-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        <br />
                        <span className="input-item">
                            <i className="fa fa-user"></i>
                        </span>
                        <select className="form-input" name="role" value={formData.role} onChange={handleRoleChange} required>
                            <option value="Client">Client</option>
                            <option value="Professional">Professional</option>
                        </select>
                        <br />
                        {showProfessionalFields && (
                            <div>
                                <span className="input-item">
                                    <i className="fa fa-university"></i>
                                </span>
                                <input className="form-input" type="text" name="education" placeholder="Education History" onChange={handleChange} required />
                                <br />
                                <span className="input-item">
                                    <i className="fa fa-upload"></i>
                                </span>
                                <input className="form-input" type="file" name="portfolio" multiple onChange={handleFileChange} required />
                                <br />
                            </div>
                        )}
                        <button className="log-in">Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
