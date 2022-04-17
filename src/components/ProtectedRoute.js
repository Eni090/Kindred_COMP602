import React from 'react';
import { useAuth } from '../context/UserAuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	let { user } = useAuth();

	if (!user) {
		return <Navigate to="/" />;
	}
	return children;
};

export default ProtectedRoute;
