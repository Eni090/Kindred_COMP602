import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes, link } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			{/* Header Component*/}
			<Header />
			<Router>
				<Routes>
					<Route path="/chat" element={<h1>Chat</h1>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
