import "./index.css";
import "antd/dist/antd.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import LoginView from "./views/LoginView";
import SignupView from "./views/SignupView";

import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="users">
					<Route path="signup" element={<SignupView />} />
					<Route path="login" element={<LoginView />} />
				</Route>
				<Route path="*" element={<Navigate replace to="/users/login" />} />
			</Routes>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
