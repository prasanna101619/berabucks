import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
    const [view, setView] = useState('register');

    const showView = (viewToShow) => {
        setView(viewToShow);
    };

    return (
        <div id="modal">
            {/* Registration View */}
            <div className={`view ${view === 'register' ? 'active' : ''}`} id="register-view">
                <h2>Register</h2>
                <center>
                    <span className="warning-icon">&#9888;</span>
                    <i className="warning-text">Give your original username <br /> otherwise you may lose the airdrop</i>
                </center>
                <br /><br />
                <input type="text" id="register-username" placeholder="Telegram username" />
                <input type="password" id="register-password" placeholder="Code sent on the bot" />
                <input type="password" id="register-repassword" placeholder="Referral code" />
                <button id="register-button">Register</button>
                <div className="switch-view">
                    Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); showView('login'); }}>Login</a>
                </div>
            </div>

            {/* Login View */}
            <div className={`view ${view === 'login' ? 'active' : ''}`} id="login-view">
                <h2>Login</h2>
                <input type="text" id="login-username" placeholder="Telegram username" />
                <input type="password" id="login-password" placeholder="Password" />
                <button id="login-button">Login</button>
                <div className="switch-view">
                    Not registered yet? <a href="#" onClick={(e) => { e.preventDefault(); showView('register'); }}>Register</a>
                </div>
            </div>
        </div>
    );
};

export default Auth;
