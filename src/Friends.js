import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import './Friends.css';

import playIcon from './assets/play.png';
import raceIcon from './assets/race.png';
import earnIcon from './assets/earn.png';
import friendsIcon from './assets/friends.png';
import airdropIcon from './assets/airdrop.png';
import inviteIcon from './assets/friends.png';

const FriendsPage = () => {
	const [showCopiedPopup, setShowCopiedPopup] = useState(false);
	const [showComingSoon, setShowComingSoon] = useState(false);
	const bottomNavbarRef = useRef(null);
	const navigate = useNavigate();

	const copyInviteLink = () => {
		navigator.clipboard.writeText(
			`🎮I just came across Bera Bucks. Use my referral code to claim 25k coins for free! 🎉\n
			Referral code:   ${localStorage.getItem('referralCode')}  Play and Earn $BeraBucks Airdrop!!! 
			Game Link: https://t.me/bera_bucks`
		);
		setShowCopiedPopup(true);
		setTimeout(() => setShowCopiedPopup(false), 2000);
	};

	const handleNavClick = (option) => {
		if (option === 'play') {
			navigate('/Home');
		} else if (option === 'friends') {

		} else if (option === 'earn' || option === 'race' || option === 'airdrop') {
			setShowComingSoon(true);
			setTimeout(() => {
				setShowComingSoon(false);
			}, 2000);
		}
	};

	return (
		<div className="App">
			<div className="stars"></div>
			<div className="twinkling"></div>
			<div className="clouds"></div>
			<div className="invite-page">
				<div className="invite-container">
					<h1>Invite Your Friends</h1> { }
					<div className="invite-content">
						<img src={inviteIcon} alt="Invite" className="invite-icon" />
						<p>
						Share the fun with your friends and both of you can earn 25k coins when they use your referral link in Bera Bucks!
						</p>
						<div className="invite-link">
						<input type="text" readOnly value=		{localStorage.getItem('referralCode')} />
							<button onClick={copyInviteLink}>
								Copy Link
							</button>
						</div>
					</div>
					{showCopiedPopup && (
						<div className="copied-popup">
							Copied!
						</div>
					)}
				</div>
			</div>

			<div className="bottom-navbar" ref={bottomNavbarRef}>
				<div className="nav-item" onClick={() => handleNavClick('play')}>
					<img src={playIcon} alt="Play" />
					<span>Play</span>
				</div>
				<div className="nav-item" onClick={() => handleNavClick('race')}>
					<img src={raceIcon} alt="Race" />
					<span>Race</span>
				</div>
				<div className="nav-item" onClick={() => handleNavClick('earn')}>
					<img src={earnIcon} alt="Earn" />
					<span>Earn</span>
				</div>
				<div className="nav-item" onClick={() => handleNavClick('friends')}>
					<img src={friendsIcon} alt="Friends" />
					<span>Friends</span>
				</div>
				<div className="nav-item" onClick={() => handleNavClick('airdrop')}>
					<img src={airdropIcon} alt="Airdrop" />
					<span>Airdrop</span>
				</div>
			</div>

			{showComingSoon && (
				<div className="popup coming-soon">
					<div>Coming Soon!</div>
				</div>
			)}
		</div>
	);
};

export default FriendsPage;

