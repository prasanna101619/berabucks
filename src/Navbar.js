import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import playIcon from './assets/play.png';
import raceIcon from './assets/race.png';
import earnIcon from './assets/earn.png';
import friendsIcon from './assets/friends.png';
import airdropIcon from './assets/airdrop.png';

const Navbar = () => {
    const [showComingSoon, setShowComingSoon] = useState(false);

    const showComingSoonPopup = () => {
        setShowComingSoon(true);
        setTimeout(() => {
            setShowComingSoon(false);
        }, 1000);
    };

    return (
        <>
            <div id="navbar">
                <Link to="/Home" className="nav-item" id="nav-play">
                    <img src={playIcon} alt="Play" className="nav-icon" />
                    <span>Play</span>
                </Link>
                <a href="#" className="nav-item" id="nav-race" onClick={showComingSoonPopup}>
                    <img src={raceIcon} alt="Race" className="nav-icon" />
                    <span>Race</span>
                </a>
                <a href="#" className="nav-item" id="nav-earn" onClick={showComingSoonPopup}>
                    <img src={earnIcon} alt="Earn" className="nav-icon" />
                    <span>Earn</span>
                </a>
                <Link to="/friends" className="nav-item" id="nav-friends">
                    <img src={friendsIcon} alt="Invite" className="nav-icon" />
                    <span>Friends</span>
                </Link>
                <a href="#" className="nav-item" id="nav-airdrop" onClick={showComingSoonPopup}>
                    <img src={airdropIcon} alt="Airdrop" className="nav-icon" />
                    <span>Airdrop</span>
                </a>
            </div>
            {showComingSoon && (
                <div id="coming-soon-popup" className="popup">
                    <h2>Coming Soon!</h2>
                </div>
            )}
        </>
    );
};

export default Navbar;