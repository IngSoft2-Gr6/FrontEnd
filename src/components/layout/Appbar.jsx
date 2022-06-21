import * as React from 'react';
import {Modal} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { AccountCircle, Logout, Map } from "@mui/icons-material";
import { LoginForm, SignupForm } from "../auth";
import {Profile} from '../../views';

const pages = ['login','signup'];
const settings = ['profile', 'Logout'];

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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseNavMenuLogin = () => {
    navigate("/users/login")
    setAnchorElNav(null);
  };

  const handleCloseNavMenuSignup = () => {
    navigate("/users/signup")
    setAnchorElNav(null)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

	useEffect(() => {
		setModal(!user && location.hash.replace("#", ""));
	}, [user, location]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DirectionsCarIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
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



          {user ? (
              <>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}></Box>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    <MenuItem key='login' onClick={() => navigate("#login")}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                    <MenuItem key='signup' onClick={() => navigate("#signup")}>
                      <Typography textAlign="center">Signup</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )}

          <DirectionsCarIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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

              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    key='login'
                    onClick={() => navigate("#login")}
                    sx={{ my: 2, color: 'white', display: 'block' }}
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
              </>
          )}

          
          {user && (
              <>
                <Box sx={{ flexGrow: 0}}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem key="profile" onClick={() => navigate("/users/profile")}>
                      <AccountCircle />
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem key="Logout" onClick={() => logout() && navigate("/home")}>
                      <Logout />
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )}
            <Modal
				      open={modal === "login" || modal === "signup" || modal =="profile"}
				      onClose={() => navigate("#")}
			      >
				      <Box maxWidth="sm" margin="auto" marginTop="2rem">
					      {modal === "login" && <LoginForm />}
					      {modal === "signup" && <SignupForm />}
                {modal === "profile" && <Profile />}
				      </Box>
			      </Modal>
            


        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
