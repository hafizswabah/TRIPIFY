import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import formatDate from '../helper/formatDate';


const EditPackageModal = ({ showEditModal, handleCloseEditModal, editpkg }) => {
  const [state, setState] = useState({})
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flightBooking, setFlightBooking] = useState(false)
  const [stayBooking, setStayBooking] = useState(false)
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState(null);
  let formData = new FormData()
  useEffect(() => {
    if (editpkg) {
      setStartDate(formatDate(editpkg.startDate))
      setEndDate(formatDate(editpkg.endDate))
      setState(editpkg)
    }
  }, [editpkg])




  async function editPackage(e) {
    e.preventDefault()
    const _id = state._id
    let name = state.name;
    let destination = state.destination
    let duration = state.duration
    let category = state.category
    let visitPlaces = state.visitPlaces
    let cost = state.cost
    let startDate = state.startDate
    let endDate = state.endDate
    let description = state.description
    let flightBooking=state.flightBooking
    let stayBooking=state.stayBooking



    let { data } = await axios.post("/agency/edit-packages",
      { name, destination,description, duration, category, visitPlaces, cost,startDate,endDate,flightBooking,stayBooking,mainImage })

  }

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
                <Form.Select className="form-select-sm" style={{ width: '100%' }} value={state?.category} onChange={(e) => { setState({ ...state, categorry: e.target.value }) }}>
                  <option value="city">City Tour</option>
                  <option value="adventure">Adventure</option>
                  <option value="djNight">Nature</option>
                  <option value="djNight">Snow</option>
                  <option value="djNight">Ocean</option>
                  <option value="djNight">Desert</option>
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
                <Form.Control as="textarea" rows={3} placeholder="Description" style={{ width: '100%' }} value={state?.description} onChange={(e) => { setDescription(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="bookings">
                <Form.Select className="form-select-sm" style={{ width: '100%' }} value={state?.flightBooking} onChange={(e) => { setState({ ...state, flightBooking: e.target.value }) }}>
                  <option value={true}>Flight Booking</option>
                  <option value={false}>No</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="stayBookings">
                <Form.Select className="form-select-sm" style={{ width: '100%' }} value={state?.stayBooking} onChange={(e) => { setState({ ...state, stayBooking: e.target.value }) }}>
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
                <Form.Control type="file" accept='image/*' multiple style={{ width: '100%' }} onChange={(e) => { setSubImages(e.target.files) }} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={handleCloseEditModal} className="flex-grow-1">
          Close
        </Button>
        <Button variant="primary" className="flex-grow-1" onClick={editPackage}>
          Edit Package
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default EditPackageModal;