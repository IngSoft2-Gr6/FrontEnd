import Nav from "../components/Nav";
import LoginForm from "../components/LoginForm";

const Login = () => {
	return (
		<div>
			<Nav />
			<div style={{ marginTop: "2rem" }}>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
