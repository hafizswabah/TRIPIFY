import React from 'react'
import { Container } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import './signup.css'
function UserSignup() {
  return (
    <Container>
      <div className="Main row">
        <div className="col-5 log-img">
          <h2 className='log-App-name mt-4'>Tripify</h2>
        </div>

        <div className="col-7">
          <Container className="log-full">
            <div className="text-area mt-5">
              <div className="text-fileds">
                <h4 className='text-name mb-2'>Name</h4>
                <TextField

                  id="filled-textarea"
                  label="Your Name"
                  placeholder="Enter your name"
                  multiline
                  variant="standard"
                />
              </div>
              <div className="text-fileds">
                <h4 className='text-name mb-2'>Mail ID</h4>
                <TextField

                  id="filled-textarea"
                  label="Your Email Address"
                  placeholder="Enter your mail"
                  multiline
                  variant="standard"
                />
              </div>
              <div className="text-fileds">
                <h4 className='text-name mb-2'>Contact</h4>
                <TextField
                  id="filled-number"

                  placeholder='Mention your contact No'
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                />
              </div>
              <div className="text-fileds">
                <h4 className='text-name mb-2'>Password</h4>
                <TextField
                  id="filled-password-input"
                  label="Set Your Password"
                  placeholder='Type your password'
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                />
              </div>
              <div className="log-btn-area mt-3">
              <Button variant='contained' style={{backgroundColor:'#18649b'}} className="log-btn">Sign Up</Button>
              </div>

            </div>


          </Container>
        </div>
      </div>
    </Container>

  )
}

export default UserSignup