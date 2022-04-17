import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { database } from './firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import './HouseCards.css';
import { useAuth } from '../context/UserAuthContext';

function Home() {
	const [ houses, setHouses ] = useState([]);

	useEffect(() => {
		const q = query(collection(database, 'houses'));
		const unsub = onSnapshot(q, (snapshot) => setHouses(snapshot.docs.map((doc) => doc.data())));

		return () => {
			// Cleanup process
			unsub();
		};
	}, []);

	return (
		<div>
			<div className="HouseCards_cardContainer">
				{houses.map((house) => (
					<TinderCard className="swipe" key={house.name} preventSwipe={[ 'up', 'down' ]}>
						<div style={{ backgroundImage: `url(${house.url})` }} className="house">
							<h3>{house.name}</h3>
						</div>
					</TinderCard>
				))}
			</div>
		</div>
	);
}

export default Home;
