import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AddPlanModal = ({ showModal, handleCloseModal }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [totalSlots, setTotalSlot] = useState('');
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [programmeDetails, setProgrammeDetails] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(true);
  const [showEventDetails, setShowEventDetails] = useState(false);


  const addProgramDetails = () => {
    if (isEventDetailsOpen) {
      const newProgrammeDetails = [];

      for (let i = 0; i < eventCount; i++) {
        newProgrammeDetails.push({ event: '', description: '' });
      }

      setProgrammeDetails([...programmeDetails, ...newProgrammeDetails]);
    }

    setIsEventDetailsOpen(!isEventDetailsOpen);
  };


  const toggleEventDetails = () => {
    setShowEventDetails(!showEventDetails);
  };


  const { agency } = useSelector((state) => {
    return state
  })
  const agencyId = agency.details._id

  async function addPackage(e) {
    e.preventDefault()
    let eventDetails = [];
    if (showEventDetails) {
      eventDetails = programmeDetails.map((programme) => ({
        events: programme.event,
        description: programme.description,
      }));
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('time', time);
    formData.append('date', date);
    formData.append('totalSlots', totalSlots);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('cost', cost);
    formData.append('mainImage', mainImage);
    formData.append('agencyId', agencyId);
    formData.append('programmeDetails', JSON.stringify(eventDetails));

    Object.keys(subImages).forEach((image) => {
      formData.append('subImages', subImages[image]);
    });

    let { data } = await axios.post("/agency/add-plan",
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
        <Modal.Title>Add Your Activity Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">
                <Form.Control type="text" style={{ width: '100%' }} placeholder='Programme Name' value={name} onChange={(e) => { setName(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="plans">
              <Form.Select className="form-select-sm" placeholder='Type' style={{ width: '100%' }} value={category} onChange={(e) => { setCategory(e.target.value) }}>
                <option value="Dj Night">Dj Night</option>
                <option value="Desert">Desert Safari</option>
                <option value="Sky Dive">Sky Dive</option>
                <option value="Sea Drive">Sea Drive</option>
                <option value="Trucking">Trucking</option>
                <option value="Camp fire">camp Fire</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="Time">
                <Form.Control type="text" style={{ width: '100%' }} placeholder='Location' value={location} onChange={(e) => { setLocation(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">
                <Form.Control type="date" style={{ width: '100%' }} placeholder='Date' value={date} onChange={(e) => { setDate(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="Time">
                <Form.Control type="text" style={{ width: '100%' }} placeholder='Time' value={time} onChange={(e) => { setTime(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">
                <Form.Control type="number" style={{ width: '100%' }} placeholder='Total Slots' value={totalSlots} onChange={(e) => { setTotalSlot(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">
                <Form.Control type="number" style={{ width: '100%' }} placeholder='Per Head Cost' value={cost} onChange={(e) => { setCost(e.target.value) }} />
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
              <Form.Group className="mb-3" controlId="image">
                <Form.Label className="form-label-sm">Event Poster Image</Form.Label>
                <Form.Control type="file" accept='image/*' style={{ width: '100%' }} onChange={(e) => { setMainImage(e.target.files[0]) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="subImages">
                <Form.Label className="form-label-sm">Event Sub Images</Form.Label>
                <Form.Control type="file" accept='image/*' multiple style={{ width: '100%' }} onChange={(e) => { setSubImages(e.target.files) }} />
              </Form.Group>
            </Col>
          </Row>
          {showEventDetails &&
            programmeDetails.map((programme, index) => (
              <div key={index}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId={`event-${index}`}>
                      <Form.Control
                        type="text"
                        style={{ width: '100%' }}
                        placeholder={`Event ${index + 1}`}
                        value={programme.event}
                        onChange={(e) => {
                          const updatedProgrammeDetails = [...programmeDetails];
                          updatedProgrammeDetails[index].event = e.target.value;
                          setProgrammeDetails(updatedProgrammeDetails);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId={`description-${index}`}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Description"
                        style={{ width: '100%' }}
                        value={programme.description}
                        onChange={(e) => {
                          const updatedProgrammeDetails = [...programmeDetails];
                          updatedProgrammeDetails[index].description = e.target.value;
                          setProgrammeDetails(updatedProgrammeDetails);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            ))
          }

          <Button variant="outline-secondary" onClick={toggleEventDetails}>
            {showEventDetails ? 'Close Event Details' : 'Add Event Details'}
          </Button>




        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={handleCloseModal} className="flex-grow-1">
          Close
        </Button>
        <Button variant="primary" className="flex-grow-1" onClick={addPackage}>
          Add Plan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default AddPlanModal;