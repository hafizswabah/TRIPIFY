
import React, { useState } from 'react'

import { Container } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ResetPassword from '../resetPassword/ResetPassword';
function ForgotOtp({email}) {

  const [otp, setOtp] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [showReset, setResetPage] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault();
    let { data } = await axios.post("/user/auth/verifyOtp", { otp })
    if (!data.err) {
      setResetPage(true)
    } else {
      setErrMessage(data.message)
    }

  }
  return (
    <Container>
      {!showReset ?
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
                  <h4 className='text-name mb-2'>Enter Your OTP</h4>
                  <TextField
                    id="filled-number"
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value) }}
                    placeholder='Enter Your Otp Number'
                    type="number"
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
        : <ResetPassword otp={otp} email={email}/>}
    </Container>
  )
}

export default ForgotOtp