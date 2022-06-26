import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	FormHelperText,
} from "@mui/material";
import { forwardRef } from "react";

const FormCheckbox = forwardRef((props, ref) => {
	const label = props.label || "";
	return (
		<FormGroup row style={{ justifyContent: "center" }} ref={ref}>
			<FormControlLabel
				control={<Checkbox color="primary" {...props} />}
				label={label}
			/>
			{props.error && <FormHelperText error>{props.error}</FormHelperText>}
		</FormGroup>
	);
});

export default FormCheckbox;
