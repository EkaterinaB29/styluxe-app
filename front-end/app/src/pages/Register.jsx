import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../css/Login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        location: '',
        birthday: '',
        email: '',
        password: '',
        education: '',
    });
    const [file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState('client');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Only allow one file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            const endpoint = activeTab === 'client' ? '/api/user/register/client' : '/api/user/register/professional';
            
            if (activeTab === 'client') {
                // Sending JSON data for client registration
                response = await axios.post(`http://88.200.63.148:8211${endpoint}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                // Sending FormData for professional registration
                const formDataToSend = new FormData();
                Object.keys(formData).forEach(key => {
                    formDataToSend.append(key, formData[key]);
                });
                if (file) {
                    formDataToSend.append('portfolio', file);
                }

                response = await axios.post(`http://88.200.63.148:8211${endpoint}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            const { token } = response.data;
            Cookies.set('token', token);

            navigate('/login');
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
            <div className="tabs">
                <button className={activeTab === 'client' ? 'active' : ''} onClick={() => setActiveTab('client')}>Client</button>
                <button className={activeTab === 'professional' ? 'active' : ''} onClick={() => setActiveTab('professional')}>Professional</button>
            </div>
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
                        <input className="form-input" type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
                        <br />
                        <span className="input-item">
                            <i className="fa fa-user-circle"></i>
                        </span>
                        <input className="form-input" type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
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
                        {activeTab === 'professional' && (
                            <>
                                <span className="input-item">
                                    <i className="fa fa-university"></i>
                                </span>
                                <input className="form-input" type="text" name="education" placeholder="Education History" value={formData.education} onChange={handleChange} required />
                                <br />
                                <span className="input-item">
                                    <i className="fa fa-upload"></i>
                                </span>
                                <input className="form-input" type="file" name="portfolio" onChange={handleFileChange} required />
                                <br />
                            </>
                        )}
                        <button className="log-in">Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
