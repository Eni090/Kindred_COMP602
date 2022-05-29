import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Contact from './components/Contact';
import Home from './components/Home';
import Profile from './components/Profile';
import Nopage from './components/NoPage';
import Login from './components/Login';
import Chat from './components/Chat';
import Buttons from './components/Buttons';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContextProvider } from './context/UserAuthContext';

function App() {
	return (
		<Container>
		<div className="App">
			{/* Header Component*/}
			<Router>
				<AuthContextProvider>
				<Routes>
					<Route path="/home" element={<ProtectedRoute><><Home /><Header /><Buttons /></></ProtectedRoute>} />
					<Route path="/" element={<Container className = "d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
						<div className='w-100' style = {{maxWidth: "400px"}}><Login />
						</div>
						</Container>} />
					<Route path="/signup" element={<Container className = "d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
						<div className='w-100' style = {{maxWidth: "400px"}}><Signup />
						</div>
						</Container>} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<Nopage />} />
				</Routes>
				</AuthContextProvider>
			</Router>
		</div>
		</Container>
	);
}

export default App;
