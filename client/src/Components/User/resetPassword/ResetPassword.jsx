
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
function ResetPassword({ email, otp }) {
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [confirm, setConfirm] = useState('')
const navigate=useNavigate()
  async function handleSubmit(e) {
    e.preventDefault();
    let { data } = await axios.post("/user/auth/reset", { otp, email, password })
    if (!data.err) {
      navigate("/login")
    } else {
      setErrMessage(data.message)
    }

  }
  useEffect(() => {
    if (password != confirm) {
      setErrMessage("password Must Be Same")
    }else{
      setErrMessage("")
    }
  }, [password, confirm])
  return (
    <Container>
      <div className="Main row">
        <div className="col-5 log-img">
          <div className="log-main-texts">
            <h2 className='log-App-name mt-4'>Tripify</h2>
            <h4 className='log-App-subname mb-4'>Welcome To Your Dream Journey</h4>
          </div>
        </div>

        <div className="col-7">
          <Container className="log-full">
            <div className="text-area mt-5">

              <div className="text-fileds">
                <h4 className='text-name mb-2'>New Password</h4>
                <TextField
                  id="filled-number"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  label='New password'
                  placeholder='Set You New password'
                  type="password"
                  variant="standard"

                />
              </div>
              <div className="text-fileds">
                <h4 className='text-name mb-2'>Re Enter</h4>
                <TextField
                  id="filled-number"
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value) }}
                  label='confirm password'
                  placeholder='Re enter your password'
                  type="password"
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
    </Container>
  )
}

export default ResetPassword