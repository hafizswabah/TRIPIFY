import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import axios from 'axios';
import OtpPage from '../VerifyOTP/OtpPage';
import '../../signupcss/Signup.css'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, Navigate, useNavigate } from 'react-router-dom';
function UserSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirm] = useState('')
  const [contact, setContact] = useState(0)
  const [errMessage, setErrMessage] = useState('')
  const [showOtpPage, setOtpPage] = useState(false)
  const [load,setLoad]=useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    let { data } = await axios.post("/user/auth/signup", { email, password, contact, name })
    console.log(data);
    if (data.err) {
      setErrMessage(data.message)
    } else {
      setLoad(false)
      setOtpPage(true)
    }
  }
  useEffect(() => {
    if (password != confirmPassword) {
      setErrMessage("Password Must Be Same")
    } else {
      setErrMessage("")
    }
  }, [password, confirmPassword])

  function validateForm() {
    if (contact.toString().length !== 10 || password != confirmPassword) {
      return false
    }
    return true
  }
  return (
    <div className="Mains">
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    {!showOtpPage ?

   
    <Container className='ag-signup-container' 
    style={{padding:"0px",borderRadius:"20px"}}>
        <Row>
          <Col md={5} xs={0} sm={0} className="log-img">
            <div className="log-main-texts">
              <h2 className='log-App-name mt-4'>Tripify</h2>
              <h4 className='log-App-subname mb-4'>Welcom To Your Dream Journey</h4>
            </div>
          </Col>

          <Col md={7} xs={12} sm={12} className="h-100">
            <Container className="log-full">
              <div className="text-area  ">
                <div className="text-fileds w-100">
                  <h4 className='text-name mb-2'>Name</h4>
                  <TextField

                    id="filled-textarea"
                    label="Your Name"
                    className='w-100'
                    placeholder="Enter your name"
                    multiline
                    variant="standard"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                  />
                </div>
                <div className="text-fileds w-100">
                  <h4 className='text-name mb-2 w-100'>Mail ID</h4>
                  <TextField

                    id="filled-textarea"
                    label="Your Email Address"
                    className='w-100'
                    placeholder="Enter your mail"
                    multiline
                    variant="standard"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div className="text-fileds w-100">
                  <h4 className='text-name mb-2 w-100'>Contact</h4>
                  <TextField
                    id="filled-number"
                    className='w-100'
                    label="Your Email Address"
                    placeholder='Mention your contact No'
                    type="number"

                    variant="standard"
                    onChange={(e) => { setContact(e.target.value) }}
                  />
                </div>
                <div className="text-fileds w-100">
                  <h4 className='text-name mb-2'>Password</h4>
                  <TextField
                    id="filled-password-input"
                    label="Set Your Password"
                    className='w-100'
                    placeholder='Type your password'
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                </div><div className="text-fileds w-100">
                  <h4 className='text-name mb-2 w-100'>Confirm Password</h4>
                  <TextField
                    id="filled-password-input"
                    className='w-100'
                    label="Confirm Your Password"
                    placeholder='Re Enter your password'
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    value={confirmPassword}
                    onChange={(e) => { setConfirm(e.target.value) }}
                  />
                </div>
                <div className="mt-3 w-100">
                  <Button onClick={handleSubmit} disabled={!validateForm()}
                    variant='contained' style={{ backgroundColor: '#18649b', color: "white" }} className="w-100">Sign Up</Button>
                </div>
                <div className='error'>{errMessage}</div>
                <div><Link to={'/login'}>Back to Login</Link></div>

              </div>


            </Container>
          </Col>
        </Row>
        </Container>
        : <OtpPage data={{name,email,contact,password}}/>}
        </div>
        
  )
}

export default UserSignup