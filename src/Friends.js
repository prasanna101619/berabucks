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
	const [activeSection, setActiveSection] = useState('friends'); // New state for active section
	const bottomNavbarRef = useRef(null);
	const navigate = useNavigate();

	const copyInviteLink = () => {
		navigator.clipboard.writeText(
			`🎮I just came across Bera Bucks. Use my referral code to claim 25k coins for free! 🎉\n
			Referral code:   ${localStorage.getItem('referralCode')} \t Play and Earn $BeraBucks Airdrop!!! \t Game Link: https://t.me/bera_bucks`
		);
		setShowCopiedPopup(true);
		setTimeout(() => setShowCopiedPopup(false), 2000);
	};

	const handleNavClick = (option) => {
		if (option === 'play') {
			navigate('/Home');
		} else if (option === 'friends') {
			setActiveSection('friends'); // Set active section
		} else if (option === 'leaderboard') {
			setActiveSection('leaderboard'); // Set active section
		} else if (option === 'earn' || option === 'race' || option === 'airdrop') {
			setShowComingSoon(true);
			setTimeout(() => {
				setShowComingSoon(false);
			}, 2000);
		}
	};

	const friendsData = [
		{ slNo: 1, name: 'Alice', coins: 25000 },
		{ slNo: 2, name: 'Bob', coins: 30000 },
		{ slNo: 3, name: 'Charlie', coins: 15000 },
		{ slNo: 4, name: 'David', coins: 20000 },
		{ slNo: 5, name: 'Eve', coins: 35000 },
		{ slNo: 6, name: 'Frank', coins: 40000 },
		{ slNo: 7, name: 'Grace', coins: 45000 },
		{ slNo: 8, name: 'Hank', coins: 50000 },
		{ slNo: 9, name: 'Ivy', coins: 55000 },
		{ slNo: 10, name: 'Jack', coins: 60000 },
	];

	const leaderboardData = Array.from({ length: 100 }, (_, i) => ({
		slNo: i + 1,
		name: `User${i + 1}`,
		invites: Math.floor(Math.random() * 100),
	}));

	const formatNumber = (num) => {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'm';
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'k';
		}
		return num;
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
				<div className="invite-container">
					<div className="section-container">
						<div 
							className={`section ${activeSection === 'friends' ? 'active' : ''}`} 
							onClick={() => handleNavClick('friends')}
						>
							Friends
						</div>
						<div 
							className={`section leaderboard ${activeSection === 'leaderboard' ? 'active' : ''}`} 
							onClick={() => handleNavClick('leaderboard')}
						>
							Leaderboard
						</div>
					</div>
					<div className="table-container">
						<table>
							<thead>
								<tr>
									<th className="slno-column">Sl.No</th>
									<th className="name-column">Name</th>
									{activeSection === 'friends' ? <th>Total Coins</th> : <th>Invites</th>}
								</tr>
							</thead>
							<tbody>
								{activeSection === 'friends' ? (
									friendsData.map((friend) => (
										<tr key={friend.slNo}>
											<td>{friend.slNo}</td>
											<td>{friend.name}</td>
											<td>{formatNumber(friend.coins)}</td>
										</tr>
									))
								) : (
									leaderboardData.map((leader) => (
										<tr key={leader.slNo}>
											<td>{leader.slNo}</td>
											<td>{leader.name}</td>
											<td>{leader.invites}</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
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

