import { Navigate, useLocation } from "react-router-dom";
import API from "../config/axios";

const VerifyAccount = () => {
	const location = useLocation();

	const token = new URLSearchParams(location.search).get("token");

	const verifyAccount = async () => {
		API.post("/users/verify/account", { token }).catch(() => {
			alert("Invalid token");
		});
	};
	verifyAccount();

	return <Navigate to="/users/login" />;
};

export default VerifyAccount;
