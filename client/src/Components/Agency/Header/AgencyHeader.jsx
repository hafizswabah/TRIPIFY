import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import './adminHeader.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';

export default function AgencyHeader(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [click, setClick] = React.useState(false)
  const Dispatch=useDispatch()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
 async function handleClose(){
  let {data}=await axios.get("/agency/auth/logout")
  if(!data.err){
    Dispatch({type:"refresh"})
    
  }
 }
  const handleClick = () => {
    setClick(!click)
  }
  console.log(click);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>

        <AppBar position="static" style={{ backgroundColor: '#fff',color:"black",minHeight:"42px" }}>
          <Toolbar style={{minHeight:"43px"}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={props.handleClick}
              className='side-icon'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tripify
            </Typography>

            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
               
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            
              </Menu>
            </div>

          </Toolbar>
        </AppBar>
      </Box>

    </>
  );
}