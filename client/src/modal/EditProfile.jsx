import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
 

const EditProfileModal = ({ showModal, handleCloseModal}) => {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
     
    
    const [userName, setUserName] = useState('')
    const [_id, setId] = useState(null)
    const [userEmail, setEmail] = useState('')
    const [userContact, setContact] = useState('')
    const [open, setOpen] =useState(false);

    const { user } = useSelector((state) => {
        return state
    })
    useEffect(() => {
        setUserName(user.details.name)
        setEmail(user.details.email)
        setContact(user.details.contact)
        setId(user.details._id)
    }, [])


    async function editProfile() {
        let { data } = await axios.post("/user/edit-profile", {
            userName, userEmail, userContact, _id
        })
        if (!data.err) {
            setOpen(true);
        }
    }
    return (

        <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName="modal-md">
            <Modal.Header closeButton>
                <Modal.Title>Edit Your Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="slots">
                                <Form.Control type="text" style={{ width: '100%' }} placeholder='Name' defaultValue={user.details.name} onChange={(e) => setUserName(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="slots">

                                <Form.Control type="number" placeholder='Contact' style={{ width: '100%' }} defaultValue={user.details.contact} onChange={(e) => { setEmail(e.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="slots">

                                <Form.Control type="email" placeholder='Email' style={{ width: '100%' }} defaultValue={user.details.email} onChange={(e) => { setContact(e.target.value) }} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="secondary" onClick={handleCloseModal} className="flex-grow-1">
                    Close
                </Button>
                <Button variant="primary" className="flex-grow-1" onClick={editProfile} >
                    Edit Profile
                </Button>
            </Modal.Footer>
            <Snackbar open={open} autoHideDuration={1000} >
                <Alert  severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </Modal>
    );
};


export default EditProfileModal;