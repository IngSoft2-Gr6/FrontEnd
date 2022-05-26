import Nav from "../components/Nav";
import SignupForm from "../components/SignupForm";

const Signup = () => {
	return (
		<div>
			<Nav />
			<div style={{ marginTop: "2rem" }}>
				<SignupForm />
			</div>
		</div>
	);
};

export default Signup;
