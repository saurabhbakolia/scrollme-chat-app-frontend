// src/App.js
import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";

const App = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate("/"); // Redirect to the homepage if user is logged in
			} else {
				navigate("/login"); // Redirect to login if not logged in
			}
		});

		return () => unsubscribe();
	}, [navigate]);

	return (
		<Routes>
			<Route
				path="/"
				exact
				element={<ProtectedRoute element={<HomePage />} />}
			/>
			<Route path="/chat" element={<ProtectedRoute element={<ChatPage />} />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="*" element={<h1>404 Not Found</h1>} />
		</Routes>
	);
};

export default App;
