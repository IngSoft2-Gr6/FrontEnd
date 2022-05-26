import "../assets/css/Forms.css";

import API from "../config/axios";

import { Form, Input, Button, Select, Typography } from "antd";

const { Item } = Form;
const { Option } = Select;
const { Password } = Input;
const { Title, Text } = Typography;

const SignupForm = () => {
	const handleSubmit = (values) => {
		API.post("/users/signup", values)
			.then((res) => {
				console.log(res.data.message);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<>
			<div className="containerPrincipal">
				<div className="containerForm">
					<Title level={4}>¿Nuevo en SParking?</Title>
					<Title level={5}>
						Por favor llena todos los campos para registrarte:
					</Title>
					<Form
						name="Register"
						labelCol={{ span: 12 }}
						autoComplete="off"
						onFinish={handleSubmit}
					>
						<Item
							label="Email"
							name="email"
							rules={[
								{ required: true, message: "Por favor ingresa tu email!" },
								{
									type: "email",
									message: "Por favor ingresa un correo email valido",
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

						<Item
							label="Nombre"
							name="name"
							rules={[
								{ required: true, message: "Por favor ingresa tu nombre!" },
							]}
						>
							<Input />
						</Item>

						<Item
							label="Tipo de identificacion"
							name="identityCardType"
							rules={[
								{
									required: true,
									message: "Por favor ingresa tu tipo de idetificacion!",
								},
							]}
						>
							<Select placeholderlabel="Selecciona tu identificacion">
								<Option value="1">Documento de identidad</Option>
								<Option value="2">Pasaporte</Option>
								<Option value="3">Licencia de conduccion</Option>
							</Select>
						</Item>

						<Item
							label="Numero de identificacion"
							name="identityCard"
							rules={[
								{
									required: true,
									message: "Por favor ingresa tu numero de identificacion!",
								},
								{
									type: "text",
									message: "Por favor ingresa un valor de idenficacion valido",
								},
							]}
						>
							<Input />
						</Item>

						<Item
							label="Telefono"
							name="phone"
							rules={[
								{
									required: true,
									message: "Por favor ingresa tu numero de telefono!",
								},
								{
									type: "text",
									message: "Por favor ingresa un valor de telefono valido",
								},
							]}
						>
							<Input />
						</Item>

						<Item
							label="Rol"
							name="roleId"
							rules={[{ required: true, message: "Por favor ingresa tu rol!" }]}
						>
							<Select placeholder="Selecciona tu rol">
								<Option value="1">Conductor</Option>
								<Option value="2">Dueño de parqueado</Option>
								<Option value="3">Empleado</Option>
								<Option value="4">Admin</Option>
							</Select>
						</Item>

						<Item>
							<Button type="primary" htmlType="submit">
								Registrar como nuevo usuario
							</Button>
						</Item>
					</Form>
					<Text>
						Ya tienes una cuenta? <a href="/users/login">Ingresa!</a>
					</Text>
				</div>
			</div>
		</>
	);
};

export default SignupForm;
