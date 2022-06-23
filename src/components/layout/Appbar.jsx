import * as React from "react";
import {AppBar, Avatar,Box,Button,Container,IconButton,Modal,Menu,
        MenuItem,Toolbar,Tooltip,Typography} from "@mui/material";
import {AccountCircle, Logout} from '@mui/icons-material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { LoginForm, SignupForm } from "../auth";

const ResponsiveAppBar = () => {

  const { user, logout } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modal, setModal] = useState(false);
	const location = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  function handleCloseMenu(page){
    setAnchorElNav(null)
    setAnchorElUser(null)
    navigate(page)
  }

	useEffect(() => {
		setModal(!user && location.hash.replace("#", ""));
	}, [user, location]);

  return (
    <AppBar position="static" mb="0">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DirectionsCarIcon sx={{mr: 1 ,display: { xs: 'none', md: 'flex' }}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SPARKING
          </Typography>

          <DirectionsCarIcon sx={{mr: 1 , display: { xs: 'flex', md: 'none' }}} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SPARKING
          </Typography>



          {user ? (
              <>
                <Box sx={{ flexGrow: 0, ml:2}}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} >
                      <Avatar alt="Remy Sharp">{user.name.charAt(0)} </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem key="profile" onClick={() => handleCloseMenu("/users/profile")}>
                      <AccountCircle />
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem key="Logout" onClick={() => logout() && handleCloseMenu("/home")}>
                      <Logout />
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    key='login'
                    onClick={() => navigate("#login")}
                    sx={{ my: 2, ml:2, color: 'white', display: 'block' }}
                  >
                    login
                  </Button>

                  <Button
                    key='signup'
                    onClick={() => navigate("#signup")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    signup
                  </Button>

                </Box>
                <Box sx={{ flexGrow: 0, display: {xs: 'flex',md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    <MenuItem key='login' onClick={() => handleCloseMenu("#login")}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                    <MenuItem key='signup' onClick={() => handleCloseMenu("#signup")}>
                      <Typography textAlign="center">Signup</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
          )}

          <Modal
				    open={modal === "login" || modal === "signup"}
				    onClose={() => navigate("#")}
            sx={{overflow:'scroll'}}
			    >
				    <Box maxWidth="sm" margin="auto" marginTop="2rem">
					    {modal === "login" && <LoginForm />}
					    {modal === "signup" && <SignupForm />}
				    </Box>
			    </Modal>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
