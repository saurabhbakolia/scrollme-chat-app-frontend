// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, auth } from "../services/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => React.useContext(AuthContext);
