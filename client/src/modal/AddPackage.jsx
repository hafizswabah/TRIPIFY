import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddPackageModal = ({ showModal, handleCloseModal }) => {
  const [name, setName] = useState('');
  const [destination, setDestinaton] = useState('');
  const [duration, setDuration] = useState('');
  const [visitPlaces, setPlaces] = useState('');
  const [totalSlots, setTotalSlot] = useState('');
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flightBooking, setFlightBooking] = useState(false)
  const [stayBooking, setStayBooking] = useState(false)
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState(null);



  async function addPackage(e) {
    e.preventDefault()
    console.log(mainImage);
    console.log(subImages);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('destination', destination);
    formData.append('duration', duration);
    formData.append('visitPlaces', visitPlaces);
    formData.append('totalSlots', totalSlots);
    formData.append('cost', cost);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('flightBooking', flightBooking);
    formData.append('stayBooking', stayBooking);
    formData.append('mainImage', mainImage);

    Object.keys(subImages).forEach((image) => {
      formData.append('subImages', subImages[image]);
    });

    let { data } = await axios.post("/agency/add-package",
      formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    handleCloseModal()
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName="modal-md">
      <Modal.Header closeButton>
        <Modal.Title>Add Your Tour Package</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="packageName">
                <Form.Control type="text" placeholder="Package Name" value={name} style={{ width: '100%' }} onChange={(e) => { setName(e.target.value) }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="mainDestination">
                <Form.Control type="text" placeholder="Main Destination" value={destination} onChange={(e) => { setDestinaton(e.target.value) }} style={{ width: '100%' }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="duration">
                <Form.Control type="text" placeholder="Duration" style={{ width: '100%' }} value={duration} onChange={(e) => { setDuration(e.target.value) }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="plans">
                <Form.Select className="form-select-sm" style={{ width: '100%' }} value={category} onChange={(e) => { setCategory(e.target.value) }}>
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
                <Form.Control type="text" style={{ width: '100%' }} placeholder='visit places' value={visitPlaces} onChange={(e) => { setPlaces(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">

                <Form.Control type="number" placeholder='Total Slots' style={{ width: '100%' }} value={totalSlots} onChange={(e) => { setTotalSlot(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">

                <Form.Control type="number" placeholder='Per Head Cost' style={{ width: '100%' }} value={cost} onChange={(e) => { setCost(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="tripDateFrom">
                <Form.Label className="form-label-sm">From</Form.Label>
                <Form.Control type="date" style={{ width: '100%' }} value={startDate} onChange={(e) => { setStartDate(e.target.value) }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="tripDateTo">
                <Form.Label className="form-label-sm">To</Form.Label>
                <Form.Control type="date" style={{ width: '100%' }} value={endDate} onChange={(e) => { setEndDate(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="description">
                <Form.Control as="textarea" rows={3} placeholder="Description" style={{ width: '100%' }} value={description} onChange={(e) => { setDescription(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="bookings">
                <Form.Select className="form-select-sm" style={{ width: '100%' }} value={flightBooking} onChange={(e) => { setFlightBooking(e.target.value) }}>
                  <option value={true}>Flight Booking</option>
                  <option value={false}>No</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="stayBookings">
                <Form.Select className="form-select-sm" style={{ width: '100%' }} value={stayBooking} onChange={(e) => { setStayBooking(e.target.value) }}>
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
        <Button variant="secondary" onClick={handleCloseModal} className="flex-grow-1">
          Close
        </Button>
        <Button variant="primary" className="flex-grow-1" onClick={addPackage}>
          Add Package
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default AddPackageModal;