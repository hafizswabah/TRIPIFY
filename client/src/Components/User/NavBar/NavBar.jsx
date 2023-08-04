import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import { FaTelegramPlane } from 'react-icons/fa'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const pages = ['Packages', 'Plans', 'Bookings','Chat'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  async function logout() {
    Swal.fire({
      title: 'Do you want to logout',
      text: "Are you sure ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes,Logout!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        await axios.get("/user/auth/logout");
        dispatch({ type: "refresh" })
      }
    })
  }

  return (
    <AppBar position="static" style={{ backgroundColor: "rgba(255, 255, 255, 0.92)", color: "rgba(55, 83, 156, 1)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TRIPIFY
          </Typography>

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            TRIPIFY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to={'/search-package?category=all'}  style={{textDecoration:"none"}}>
              <Button
                style={{ color: "rgba(55, 83, 156, 1)" }}

                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Packages
              </Button>
            </Link>
            <Link to={'/search-package?plan=all'}  style={{textDecoration:"none"}}>
            <Button
              style={{ color: "rgba(55, 83, 156, 1)" }}

              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Plans
            </Button>
            </Link>
            <Link to={'/Bookings'}  style={{textDecoration:"none"}}>
              <Button
                style={{ color: "rgba(55, 83, 156, 1)" }}

                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Bookings
              </Button>
            </Link>
            <Link to={'/chat'}  style={{textDecoration:"none"}}>
              <Button
                style={{ color: "rgba(55, 83, 156, 1)" }}

                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               Chat
              </Button>
            </Link>


          </Box>

          <Box sx={{ flexGrow: 0 }}>
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

              <MenuItem onClick={handleCloseUserMenu}>
                <Button textAlign="center" onClick={logout}>Logout</Button>
                <Link to={"/profile"}>
                  <Button textAlign="center">Profile</Button>
                </Link>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>

    </AppBar>
  );
}
export default NavBar;