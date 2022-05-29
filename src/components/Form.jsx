import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputAdornment,
	MenuItem,
	TextField,
} from "@mui/material";
import React, { forwardRef, useState } from "react";

const FormPassword = forwardRef((props, ref) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<TextField
			{...props}
			ref={ref}
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
});

const FormSelect = forwardRef(({ options, ...props }, ref) => {
	return (
		<TextField {...props} ref={ref} select>
			{options &&
				options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
		</TextField>
	);
});

const FormCheckbox = forwardRef((props, ref) => {
	const label = props.label || "";
	return (
		<FormGroup row style={{ justifyContent: "center" }}>
			<FormControlLabel
				control={<Checkbox color="primary" {...props} />}
				label={label}
			/>
		</FormGroup>
	);
});

export { FormCheckbox, FormPassword, FormSelect };
