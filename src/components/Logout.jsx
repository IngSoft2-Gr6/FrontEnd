import { Navigate } from "react-router-dom";

const Logout = () => {
	localStorage.removeItem("loggedIn");
	return <Navigate to="/home" />;
};

export default Logout;
