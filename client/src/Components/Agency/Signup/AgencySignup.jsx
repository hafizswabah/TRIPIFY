import React, { useEffect, useState } from 'react'
import { Container, Row, Form,Col } from 'react-bootstrap'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import './AgencySignup.css'
import axios from 'axios';
import validatePassword from '../../../helper/validatePassword';
import { Link } from 'react-router-dom';
function AgencySignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddressse] = useState('')
  const [contact, setContact] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [regNo, setRegNo] = useState('')
  const [image, setImage] = useState(null)
  const [finalImage, setFinalImage] = useState(null)

  function validForm() {
    if (name.trim() === "" || !validatePassword(password).status || address.trim() === "" || email.trim() === "" || password.trim() === "" || contact.toString().length !== 10 || regNo.trim() === "") {
      return false
    }
    return true
  }
  console.log(finalImage)

  async function handleSubmit(e) {
    e.preventDefault();

    if (validForm()) {
      const { data } = await axios.post("/agency/auth/signup", {
        email, name, password, contact, address, regNo, proof: image
      },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (data.err) {
        setErrMessage(data.message)
      } else {
        Swal.fire(
          'Success!',
          'Thank You for Registration. We will Inform you once account has got Approved',
          'success'
        )
        dispatch({ type: "refresh" })
      }
    }
  }
  const isValidFileUploaded = (file) => {
    
    const validExtensions = ['png', 'jpeg', 'jpg']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
  }
  const handleImage = (e) => {
    if (isValidFileUploaded(e.target.files[0])) {
      setImage(e.target.files[0])
      setErrMessage("")
      ImageTOBase(e.target.files[0])
    } else {
      setErrMessage("Invalid File type")
    }
  }
  const ImageTOBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFinalImage(reader.result)
    }
  }
  useEffect(() => {
    if (password) {
      !validatePassword(password).status ?
        setErrMessage(validatePassword(password).message[0].message.replace("string", 'password')) :
        setErrMessage("")
    }
  }, [password])
  return (
    <Container>

        <div className='Main'>
      <Row >
        <Col md={5} className="log-img">
          <div className="log-main-texts">
            <h2 className='log-App-name mt-4'>Tripify</h2>
            <h4 className='log-App-subname mb-4'>Welcom To Your Dream Journey</h4>
          </div>
        </Col>

          <Col md={7}>
          <div className="log-full">
            <div className="text-area w-50 ">
              <div className="text-fileds w-100">
         
                <TextField

                  id="filled-textarea"
                  label="Agency Name"
                  className='w-100'
                  placeholder="Enter your Company name"
                  multiline
                  variant="standard"
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                />
              </div>
              <div className="text-fileds w-100">
          
                <TextField

                  id="filled-textarea"
                  label="Your Contact Email"
                  className='w-100'
                  placeholder="Enter your Agency Mail ID"
                  multiline
                  variant="standard"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </div>
              <div className="text-fileds w-100">
              
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
              </div>
              <div className="text-fileds w-100">
            
                <TextField
                  id="filled-number"
                  className='w-100'
                  label="Company Contact"
                  placeholder='Enter Agency contact No'
                  type="number"
                  value={contact}
                  variant="standard"
                  onChange={(e) => { setContact(e.target.value) }}
                />
              </div>
         

              <div className="text-fileds w-100">
               
                <TextField

                  id="filled-textarea"
                  label="Contact Adrress"
                  className='w-100'
                  placeholder="Enter your Agency Address"
                  multiline
                  variant="standard"
                  value={address}
                  onChange={(e) => { setAddressse(e.target.value) }}
                />
              </div>
              <div className="text-fileds w-100">
              
                <TextField

                  id="filled-textarea"
                  label="Agency Registration No"
                  className='w-100'
                  placeholder="Enter your Agency Reg No"
                  multiline
                  variant="standard"
                  value={regNo}
                  onChange={(e) => { setRegNo(e.target.value) }}
                />
              </div>
              <div className="text-fileds w-100">
                <h4 className='text-name  w-100'>Company Permit</h4>
                <Form.Group controlId="formFile" className="mt-4 w-100">

                  <Form.Control type="file" accept='image/*' className='w-100' onChange={handleImage} />
                </Form.Group>
              </div>
            
              <div className="mt-3 w-100">
                <Button onClick={handleSubmit} disabled={!validForm()}
                  variant='contained' style={{ backgroundColor: '#18649b', color: "white" }} className="w-100">Sign Up</Button>
              </div>
              <div className='error'>{errMessage}</div>
              <div className="go-login">
                <h4><Link to={'/login'}>Already have an account please Login</Link> </h4>
              </div>
              

            </div>


          </div>

          </Col>

      

      </Row>
        </div>


    </Container>

  )
}

export default AgencySignup