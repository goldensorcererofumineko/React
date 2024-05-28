import React from 'react';
import { Container } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

const MainScreen = () => {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <img src={logo} className="spin-logo" alt="logo" />
            <h1>Main Screen</h1>
            <p>Welcome, admin!</p>
        </Container>
    );
};

export default MainScreen;
