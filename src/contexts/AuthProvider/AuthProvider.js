import React, { useContext } from 'react';
import { createContext } from 'react';
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const goggleAuthProvider = new GoogleAuthProvider();

	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};
	const logout = () => {
		localStorage.removeItem('genius-token');
		return signOut(auth);
	};

	const googleSignIn = () => {
		return signInWithPopup(auth, goggleAuthProvider);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => {
			return unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		createUser,
		login,
		setLoading,
		logout,
		googleSignIn,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
