import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import axios from 'axios';
import { useDispatch } from 'react-redux';

function OtpPage(props) {
  const [errMessage, setErrMessage] = useState('')
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(60)
  const [resend,setResend]=useState(false)
  const dispatch = useDispatch()
  console.log('resend',resend);

  useEffect(() => {
    // Update the timer every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer>0 ? prevTimer - 1 : 0)
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;


  async function handleSubmit(e) {
    e.preventDefault()
    let { data } = await axios.post("/user/auth/verify", { otp, ...props.data })
    console.log(data);
    if (!data.err) {
      dispatch({ type: "refresh" })
    } else {
      setErrMessage(data.message)
    }
  }
  return (
    <Container className='ag-signup-container' style={{ height: '70vh' }}>
      <Row className='h-100'>
        <Col md={5} className="log-img">
          <div className="log-main-texts">
            <h2 className='log-App-name mt-4'>Tripify</h2>
            <h4 className='log-App-subname mb-4'>Welcom To Your Dream Journey</h4>
          </div>
        </Col>

        <Col md={7} className="h-100">
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
              <div className="timeout-in-otp">
                <span>Time Remining :</span><span style={{color:'red',fontWeight:'500'}}>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
              </div>
              <div className='error'>{errMessage}</div>

            </div>


          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default OtpPage