import "../assets/css/Forms.css";

import { Form, Input, Button, Checkbox, Typography } from "antd";

const { Item } = Form;
const { Password } = Input;
const { Title, Text } = Typography;

const LoginForm = () => {
	const handleSubmit = (values) => {
		console.log(values);
	};
	return (
		<>
			<div className="containerPrincipal">
				<div className="containerForm">
					<Title level={4}>¡Bienvenido a SParking!</Title>
					<Title level={5}>
						Por favor llena todos los campos para ingresar:
					</Title>
					<Form
						name="login"
						labelCol={{ span: 8 }}
						initialValues={{ remember: true }}
						autoComplete="off"
						onFinish={handleSubmit}
					>
						<Item
							label="Email"
							name="email"
							rules={[
								{ required: true, message: "Por favor ingresa tu usuario!" },
								{
									type: "email",
									message: "Por favor ingresa un correo valido",
								},
							]}
						>
							<Input />
						</Item>
						<Item
							label="Contraseña"
							name="password"
							rules={[
								{ required: true, message: "Por favor ingresa tu contraseña!" },
							]}
						>
							<Password />
						</Item>
						<Text>
							<a href="/#">olvidaste tu contraseña?</a>
						</Text>
						<Item name="remember" valuePropName="checked">
							<Checkbox>Recuerdame</Checkbox>
						</Item>
						<Item>
							<Button type="primary" htmlType="submit">
								Iniciar usuario
							</Button>
						</Item>
					</Form>
					<Text>
						No tienes una cuenta? <a href="/users/signup">Registrate!</a>
					</Text>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
