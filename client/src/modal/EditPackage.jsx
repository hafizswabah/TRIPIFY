import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import formatDate from '../helper/formatDate';


const EditPackageModal = ({ showEditModal, handleCloseEditModal, editpkg ,handlePackageAdded }) => {
  const [state, setState] = useState({})
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [name, setName] = useState('');
  const [flightBooking, setFlightBooking] = useState(false)
  const [stayBooking, setStayBooking] = useState(false)
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);

 
  useEffect(() => {
    if (editpkg) {
      setStartDate(formatDate(editpkg.startDate))
      setEndDate(formatDate(editpkg.endDate))
      setState(editpkg)
    }
  }, [editpkg])


  async function editPackage(e) {
      e.preventDefault();
    const formData = new FormData();
    formData.append('mainImage', mainImage);
    for (let i = 0; i < subImages.length; i++) {
        formData.append('subImages', subImages[i]);
    }
    const packageData = {
      ...state, 
    };

    formData.append('state', JSON.stringify(packageData));
    const {data} = await axios.post("/agency/edit-packages", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if(!data.err){
      handleCloseEditModal()
      handlePackageAdded ()
    }
}
console.log(state,"state");

  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered dialogClassName="modal-md">
      <Modal.Header closeButton>
        <Modal.Title>Edit Your Tour Package</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="packageName">
                <Form.Control type="text" placeholder="Package Name" value={state.name} style={{ width: '100%' }} onChange={(e) => { setState({ ...state, name: e.target.value }) }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="mainDestination">
                <Form.Control type="text" placeholder="Main Destination" value={state.destination} onChange={(e) => { setState({ ...state, destination: e.target.value }) }} style={{ width: '100%' }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="duration">
                <Form.Control type="text" placeholder="Duration" style={{ width: '100%' }} value={state.duration} onChange={(e) => { setState({ ...state, duration: e.target.value }) }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="plans">
                <Form.Select className="form-select-sm" style={{ width: '100%' }} value={state?.category} onChange={(e) => { setState({ ...state, category: e.target.value }) }}>
                <option value="city">City Tour</option>
                  <option value="adventure">Adventure</option>
                  <option value="nature">Nature</option>
                  <option value="snow">Snow</option>
                  <option value="ocean">Ocean</option>
                  <option value="desert">Desert</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">
                <Form.Control type="text" style={{ width: '100%' }} placeholder='visit places' value={state?.visitPlaces} onChange={(e) => { setState({ ...state, visitPlaces: e.target.value }) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">

                <Form.Control type="number" placeholder='Total Slots' style={{ width: '100%' }} value={state?.totalSlots} onChange={(e) => { setState({ ...state, totalSlots: e.target.value }) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">

                <Form.Control type="number" placeholder='Per Head Cost' style={{ width: '100%' }} value={state?.cost} onChange={(e) => { setState({ ...state, cost: e.target.value }) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="tripDateFrom">
                <Form.Label className="form-label-sm">From</Form.Label>
                <Form.Control type="date" style={{ width: '100%' }}
                  value={formatDate(state.startDate)} onChange={(e) => { setState({ ...state, startDate: e.target.value }) }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="tripDateTo">
                <Form.Label className="form-label-sm">To</Form.Label>
                <Form.Control type="date" style={{ width: '100%' }} value={formatDate(state.endDate)} onChange={(e) => { setState({ ...state, endDate: e.target.value }) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="description">
                <Form.Control as="textarea" rows={3} placeholder="Description" style={{ width: '100%' }} value={state?.description} onChange={(e) => {setState({...state,description:e.target.value}) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="bookings">
                <Form.Select className="form-select-sm" style={{ width: '100%' }} value={state?.flightbooking} onChange={(e) => { setState({ ...state, flightbooking: e.target.value }) }}>
:
                  <option value={true}>Flight Booking</option>
                  <option value={false}>No</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="stayBookings">
                <Form.Select className="form-select-sm" style={{ width: '100%' }} value={state?.staybooking} onChange={(e) => { setState({ ...state, staybooking: e.target.value }) }}>
                  <option value={true}>Stay Booking</option>
                  <option value={false}>No</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label className="form-label-sm">Main Package Image</Form.Label>
                <Form.Control type="file" accept='image/*' style={{ width: '100%' }} onChange={(e) => { setMainImage(e.target.files[0]) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="subImages">
                <Form.Label className="form-label-sm">Sub Images</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ width: '100%' }}
                  onChange={(e) => { setSubImages([...e.target.files]); }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={handleCloseEditModal} className="flex-grow-1">
          Close
        </Button>
        <Button type='button' variant="primary" className="flex-grow-1" onClick={editPackage}>
          Edit Package
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default EditPackageModal;