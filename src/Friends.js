import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import './Friends.css';

import playIcon from './assets/play.png';
import raceIcon from './assets/race.png';
import earnIcon from './assets/earn.png';
import friendsIcon from './assets/friends.png';
import airdropIcon from './assets/airdrop.png';
import inviteIcon from './assets/friends.png';

import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const FriendsPage = () => {

	const [leaderboardData,setLeaderboardData]=useState([])
	const [friendsData,setFriendsData] = useState(JSON.parse(localStorage.getItem('friends')))
	const [showCopiedPopup, setShowCopiedPopup] = useState(false);
	const [showComingSoon, setShowComingSoon] = useState(false);
	const [activeSection, setActiveSection] = useState('friends'); // New state for active section
	const bottomNavbarRef = useRef(null);
	const navigate = useNavigate();
	const getFriendsData=async()=>{
		let data = await getDocs(userCollection);
     
			let dbdata= data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			let user=dbdata.find(user=>user.username==localStorage.getItem('userName'))
			
			
			console.log(user)
			let friendsObjects = user.friends.map(friendUsername => 
				dbdata.find(user => user.username === friendUsername)
			  );
			  friendsObjects.sort((a, b) => b.coins - a.coins);
		   setFriendsData( friendsObjects)
	}
	useEffect(()=>{
		getFriendsData()
	},[])
	const copyInviteLink = () => {
		navigator.clipboard.writeText(
			`🎮I just came across Bera Bucks. Use my referral code to claim 25k coins for free! 🎉\n
			Referral code:   ${localStorage.getItem('referralCode')} \t Play and Earn $BeraBucks Airdrop!!! \t Game Link: https://t.me/bera_bucks`
		);
		setShowCopiedPopup(true);
		setTimeout(() => setShowCopiedPopup(false), 2000);
	};
	const userCollection = collection(db, "user");

	const handleNavClick = async (option) => {
		if (option === 'play') {
			navigate('/Home');
		} else if (option === 'friends') {
			setActiveSection('friends'); 
			let data = await getDocs(userCollection);
     
			let dbdata= data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			let user=dbdata.find(user=>user.username==localStorage.getItem('userName'))
			
			
			console.log(user)
			let friendsObjects = user.friends.map(friendUsername => 
				dbdata.find(user => user.username === friendUsername)
			  );
			  friendsObjects.sort((a, b) => b.coins - a.coins);
		   setFriendsData( friendsObjects)
		//    setRankArray(dbdata);
		//    const index =dbdata.findIndex(item => item.username === localStorage.getItem('userName'));
		} else if (option === 'leaderboard') {

			let data = await getDocs(userCollection);
     
			let dbdata= data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			let leaderboardObjects=dbdata.sort((a,b)=>b.friends.length-a.friends.length)
			setLeaderboardData(leaderboardObjects.slice(0,1000))
			setActiveSection('leaderboard'); // Set active section
		} else if (option === 'earn' || option === 'race' || option === 'airdrop') {
			setShowComingSoon(true);
			setTimeout(() => {
				setShowComingSoon(false);
			}, 2000);
		}
	};



	

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
									{activeSection === 'friends' ? <th>Coins</th> : <th>Invites</th>}
								</tr>
							</thead>
							<tbody>
								{activeSection === 'friends' ? (
									friendsData.map((friend,index) => (
										<tr key={friend.slNo}>
											<td>{index+1}</td>
											<td>{friend.username}</td>
											<td>{formatNumber(friend.coins)}</td>
										</tr>
									))
								) : (
									leaderboardData.map((leader,index) => (
										<tr key={leader.slNo}>
											<td>{index+1}</td>
											<td>{leader.username}</td>
											<td>{leader.friends.length}</td>
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

