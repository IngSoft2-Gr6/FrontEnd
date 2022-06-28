import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	FormHelperText,
} from "@mui/material";
import { forwardRef } from "react";

const FormCheckbox = forwardRef(
	({ error, helperText, label, fullWidth, ...props }, ref) => {
		return (
			<FormGroup row style={{ justifyContent: "center" }} ref={ref}>
				<FormControlLabel
					control={<Checkbox color="primary" {...props} />}
					label={label}
				/>
				{error && <FormHelperText error>{error}</FormHelperText>}
				{helperText && <FormHelperText>{helperText}</FormHelperText>}
			</FormGroup>
		);
	}
);

export default FormCheckbox;
