import React from 'react'
import { useState } from 'react';
import { Container, Row,Col } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { Link,useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function UserLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const Navigate=useNavigate()
  const dispatch=useDispatch()
  async function handleSubmit(e) {
    e.preventDefault()
    let { data } = await axios.post("/user/auth/login", { email, password })
    console.log(data);
    if (!data.err) {
      dispatch({type:"refresh"})
    }else{
      setErrMessage(data.message)
    }
  }

  const [anchorEl, setAnchorEl] = useState(null | HTMLElement>(null));
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  async function DemoUser(e){
    let email="swabahhafizamb@gmail.com";
    let password="123";
    e.preventDefault()
    let { data } = await axios.post("/user/auth/login", { email, password })
    console.log(data);
    if (!data.err) {
      dispatch({type:"refresh"})
    }else{
      setErrMessage(data.message)
    }
    setAnchorEl(null);
  }
  async function DemoAdmin(e){
    let email="admin@gmail.com";
    let password="123";
    e.preventDefault()
    let { data } = await axios.post("/admin/auth/login",{email,password})
    console.log(data);
    if (!data.err) {
      dispatch({type:"refresh"})
      Navigate("/admin")
    }else{
      setErrMessage(data.message)
    }
    setAnchorEl(null);
  }
  async function DemoAgent(e){
    let email="hafizswabahamb@gmail.com";
    let password="Swabahhafiz";
    e.preventDefault()
    let { data } = await axios.post("/agency/auth/login", { email, password })
    console.log(data);
    if (!data.err) {
      dispatch({type:"refresh"})
      Navigate("/agency")
    }else{
      setErrMessage(data.message)
    }
    setAnchorEl(null);
  }
  return (

    <Container>
      <Row className="Main ">
      <Col md={5} sm={0} xs={0} className=" log-img">
          <h2 className='log-App-name mt-4'>Tripify</h2>
        </Col>

        <Col md={7} sm={12} xs={12}>
          <Container className="log-full">
            <div className="text-area mt-5">

              <div className="text-fileds w-100">
                <h4 className='text-name mb-2 w-100'>Mail ID</h4>
                <TextField

                  id="filled-textarea"
                  label="Your Email Address"
                  className='w-100'
                  placeholder="Enter your mail"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  multiline
                  variant="standard"
                />
              </div>

              <div className="text-fileds w-100">
                <h4 className='text-name mb-2'>Password</h4>
                <TextField
                  id="filled-password-input"
                  label="Enter Your Password"
                  className='w-100'
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                />
              </div>
              <div className="log-btn-area mt-3">
                <Button onClick={handleSubmit}
                  variant='contained' style={{ backgroundColor: '#18649b' }} className="log-btn">LOGIN</Button>
              </div>
              <div className='error'>{errMessage}</div>
              <div><h4><Link to={"/forgot"} className='forgot'>Forgot Password?</Link></h4></div>
              <div><h4><Link to={"/signup"} className='forgot'>Dont you have an account Please signup here</Link></h4></div>
                  <div>
      <Button 
         variant='contained'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Demo Login
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={DemoUser}>Demo User</MenuItem>
        <MenuItem onClick={DemoAdmin}>Demo Admin</MenuItem>
        <MenuItem onClick={DemoAgent}>Demo Travel Agent</MenuItem>
      </Menu>
    </div>

            </div>


          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default UserLogin