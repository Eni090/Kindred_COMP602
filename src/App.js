import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contact from './components/Contact';
import Home from './components/Home';
import Profile from './components/Profile';
import Nopage from './components/NoPage';

function App() {
	return (
		<div className="App">
			{/* Header Component*/}
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="/contact" element={<Contact />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="*" element={<Nopage />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
