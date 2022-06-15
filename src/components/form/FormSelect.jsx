import { MenuItem, TextField } from "@mui/material";
import { forwardRef } from "react";

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

export default FormSelect;
