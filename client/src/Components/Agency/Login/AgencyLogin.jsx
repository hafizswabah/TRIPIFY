import React from 'react'
import { useState } from 'react';
import { Container } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import './AgencyLogin.css'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
function AgencyLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const dispatch=useDispatch()
  async function handleSubmit(e) {
    e.preventDefault()
    let { data } = await axios.post("/agency/auth/login", { email, password })
    console.log(data);
    if (!data.err) {
      dispatch({type:"refresh"})
    }else{
      setErrMessage(data.message)
    }
  }
  return (

    <Container>
      <div className="Main row">
        <div className="col-5 log-img">
          <h2 className='log-App-name mt-4'>Tripify</h2>
        </div>

        <div className="col-7">
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

            </div>


          </Container>
        </div>
      </div>
    </Container>
  )
}

export default AgencyLogin