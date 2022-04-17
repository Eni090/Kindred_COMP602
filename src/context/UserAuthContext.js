import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../components/firebase';

const userAuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [ user, setUser ] = useState('');
	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function googleSignIn() {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
			setUser(CurrentUser);
		});
		return () => {
			// Clean up
			unsubscribe();
		};
	}, []);

	return (
		<userAuthContext.Provider value={{ user, signUp, login, googleSignIn }}>{children}</userAuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(userAuthContext);
}
