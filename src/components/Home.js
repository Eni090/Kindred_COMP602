import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import database from './firebase';
import './HouseCards.css';

function Home() {
	const [ houses, setHouses ] = useState([]);

	useEffect(() => {
		database.collection('houses').onSnapshot((snapshot) => setHouses(snapshot.docs.map((doc) => doc.data())));
	}, []);

	return (
		<div>
			<h1>Home</h1>

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
