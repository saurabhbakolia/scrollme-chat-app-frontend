import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./styles/GlobalStyle";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider
import theme from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<AuthProvider>
				<ChakraProvider theme={theme}>
					<GlobalStyles />
					<App />
				</ChakraProvider>
			</AuthProvider>
		</Router>
	</React.StrictMode>,
);

reportWebVitals();
