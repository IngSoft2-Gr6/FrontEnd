import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

//search container
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.background.default, 0.8),
	"&:hover": {
		backgroundColor: alpha(theme.palette.background.default, 0.7),
	},
	marginLeft: theme.spacing(1),
	width: "auto",
}));

//icon container
const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: theme.palette.text.secondary,
}));

//input container
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "20ch",
		"&:focus": {
			width: "25ch",
		},
	},
}));

const Searchbar = () => {
	return (
		<Search
			sx={{
				position: "fixed",
				top: 0,
				left: 50,
				display: "flex",
				flexDirection: "row",
				justifyContent: "flex-end",
				m: "0.5rem",
				zIndex: "1000",
			}}
		>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search…"
				inputProps={{ "aria-label": "search" }}
			/>
		</Search>
	);
};

export default Searchbar;
