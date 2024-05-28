import React, { useState } from 'react';
import MainScreen from './MainScreen';
import LoginScreen from './LoginScreen';
import './App.css';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (username, password) => {
        if (username === 'admin' && password === '000') {
            setIsLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                <MainScreen />
            ) : (
                <LoginScreen onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
