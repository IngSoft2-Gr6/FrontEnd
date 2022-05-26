import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

// import Views
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import Nav from "./components/Nav";
import Profile from "./views/Profile";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Nav />
		<BrowserRouter>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/users/login" element={<Login />} />
				<Route path="/users/signup" element={<Signup />} />
				<Route path="/users/profile" element={<Profile />} />
				<Route path="*" element={<Navigate to="/home" />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
