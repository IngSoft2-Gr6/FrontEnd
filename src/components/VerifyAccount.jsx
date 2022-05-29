import { Navigate, useLocation } from "react-router-dom";
import API from "../config/axios";
import { until } from "../helpers/until";

const VerifyAccount = () => {
	const location = useLocation();

	const token = new URLSearchParams(location.search).get("token");

	(async () => {
		const [err, res] = await until(
			API.post("/users/verify/account", { token })
		);
		console.log("Verify account");
		if (err) return console.log(err.response.data?.message);
		console.log(res.data?.message);
	})();

	return <Navigate to="/users/login" />;
};

export default VerifyAccount;
