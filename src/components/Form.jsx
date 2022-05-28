// Form component

import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup as MuiFormGroup,
	IconButton,
	InputAdornment,
	MenuItem,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Form = ({ onSubmit, children, schema, title, ...props }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} {...props}>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					register: { register },
					errors,
				});
			})}
		</form>
	);
};

const FormInput = ({
	name,
	label,
	register,
	errors,
	required,
	onChange,
	...props
}) => {
	const reg = register.register;
	return (
		<TextField
			aria-label={label}
			label={label + (required ? "*" : "")}
			{...props}
			{...reg(name)}
			error={!!errors?.[name]}
			helperText={errors?.[name]?.message}
			fullWidth
			margin="normal"
			onChange={onChange}
		/>
	);
};

const FormPassword = ({
	name,
	label,
	register,
	errors,
	required,
	...props
}) => {
	const reg = register.register;

	const [showPassword, setShowPassword] = useState(false);
	return (
		<TextField
			aria-label={label}
			label={label + (required ? "*" : "")}
			{...props}
			{...reg(name)}
			error={!!errors?.[name]}
			helperText={errors?.[name]?.message}
			fullWidth
			margin="normal"
			type={showPassword ? "text" : "password"}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};

const FormSelect = ({
	name,
	label,
	options,
	register,
	errors,
	required,
	...props
}) => {
	const reg = register.register;
	return (
		<TextField
			aria-label={label}
			label={label + (required ? "*" : "")}
			{...props}
			{...reg(name)}
			error={!!errors?.[name]}
			helperText={errors?.[name]?.message}
			fullWidth
			margin="normal"
			select
		>
			{options.map((option) => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
};

const FormCheckbox = ({
	name,
	label,
	register,
	errors,
	required,
	...props
}) => {
	// const reg = register.register;
	return (
		<FormGroup row style={{ justifyContent: "center" }}>
			<FormControlLabel
				control={<Checkbox color="primary" {...props} />}
				label={label + (required ? "*" : "")}
			/>
		</FormGroup>
	);
};

const FormGroup = ({ children, register, errors, ...props }) => {
	return (
		<MuiFormGroup {...props}>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					register,
					errors,
				});
			})}
		</MuiFormGroup>
	);
};

const FormButton = ({ name, label, ...props }) => {
	return (
		<Button type="submit" variant="contained" fullWidth {...props}>
			{label}
		</Button>
	);
};

export {
	Form,
	FormButton,
	FormCheckbox,
	FormInput,
	FormPassword,
	FormSelect,
	FormGroup,
};
