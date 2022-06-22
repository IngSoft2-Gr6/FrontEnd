import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


//search container
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.75),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.70),
    },
    marginLeft: theme.spacing(1),
    width: 'auto',
  }));
  
  //icon container
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  

  //input container
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '20ch',
      '&:focus': {
        width: '25ch',
      }
    },
  }));

  const Searchbar = () => {
    return (
        <Search 				sx={{
            position: "fixed",
            top: 70,
            right: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            m: "0.5rem",
            zIndex: "1000",
        }}>
            <SearchIconWrapper>
                <SearchIcon sx={{color: "#E5E5E5"}}/>
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Search…"
            sx={{color: "#F2F2F2"}}
            inputProps={{ 'aria-label': 'search'}}
            />
        </Search>
    );
  };

  export default Searchbar;