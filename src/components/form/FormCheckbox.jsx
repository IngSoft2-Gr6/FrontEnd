import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { forwardRef } from "react";

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

export default FormCheckbox;
