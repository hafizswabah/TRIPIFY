import axios from 'axios'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

import ForgotOtp from '../ForgotOtp/ForgotOtp';

function Forgot() {
    const [email,setEmail]=useState('')
    const [errMessage,setErrMessage]=useState('')
    const [showOtpPage,setPage]=useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        let{data}=await axios.post("/user/auth/forgot",{email})
if(!data.err){
    setPage(true)
}else{
    setErrMessage(data.message)
}
    }
  return (
    <Container>
        {!showOtpPage ? 
    <div className="Main row">
      <div className="col-5 log-img">
        <div className="log-main-texts">
          <h2 className='log-App-name mt-4'>Tripify</h2>
          <h4 className='log-App-subname mb-4'>Welcom To Your Dream Journey</h4>
        </div>
      </div>

      <div className="col-7">
        <Container className="log-full">
          <div className="text-area mt-5">

            <div className="text-fileds">
              <h4 className='text-name mb-2'>Enter Your Email</h4>
              <TextField
                id="filled-number"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                label="Enter Email to reset password"
                className='w-100'
                placeholder="Your Email"
                type="email"
               
                variant="standard"

              />
            </div>

            <div className="log-btn-area mt-3">
              <Button
                onClick={handleSubmit}
                variant='contained' style={{ backgroundColor: '#18649b' }} className="log-btn">Submit</Button>
            </div>
            <div className='error'>{errMessage}</div>

          </div>


        </Container>
      </div>
    </div>
    : <ForgotOtp email={email}/>}
  </Container>
  )
}

export default Forgot