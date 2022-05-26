import { Menu } from "antd";

const Nav = () => {
	return (
		<Menu mode="horizontal">
			<Menu.Item key="login">
				<a href="/users/login">Login</a>
			</Menu.Item>
			<Menu.Item key="signup">
				<a href="/users/signup">Signup</a>
			</Menu.Item>
		</Menu>
	);
};

export default Nav;
