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
                <input type="password" id="register-password" placeholder="Password" />
                <input type="password" id="register-repassword" placeholder="Re-enter Password" />
                <button id="register-button">Register</button>
                <div className="switch-view">
                    Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); showView('login'); }}>Login</a>
                </div>
                <br />
                <div className="report-problem">
                    <span className="warning-icon">&#9888;</span>
                    Can't Register/Login?<br /><br />
                    <button onClick={() => showView('report')}>Report Problem</button>
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
                <br />
                <div className="report-problem">
                    <span className="warning-icon">&#9888;</span>
                    Can't Register/Login?<br /><br />
                    <button onClick={() => showView('report')}>Report Problem</button>
                </div>
            </div>

            {/* Report Problem View */}
            <div className={`view ${view === 'report' ? 'active' : ''}`} id="report-form">
                <h2>Report Problem</h2>
                <input type="text" id="report-username" placeholder="Telegram username" />
                <textarea id="report-message" placeholder="Message"></textarea>
                <button id="submit-report" onClick={() => { alert('Report submitted'); showView('register'); }}>Submit</button>
                <div className="go-back">
                    <a href="#" onClick={(e) => { e.preventDefault(); showView('register'); }}>Go Back</a>
                </div>
            </div>
        </div>
    );
};

export default Auth;
