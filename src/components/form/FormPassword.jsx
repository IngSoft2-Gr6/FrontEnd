import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { forwardRef, useState } from "react";

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

export default FormPassword;
