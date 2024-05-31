import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import MapSearchBox from '../Components/MapBox/MapSearchBox';

// Utility function to format date to YYYY-MM-DD
const formatToISODate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

const EditPlanModal = ({ showEditModal, handleCloseEditModal, editPlan, handleplanAdded, setOpen, setColor, setContent }) => {
  const defaultDate = formatToISODate('14/02/2024');
  const [editPlanDetails, setEditPlanDetails] = useState(null);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [programmeDetails, setProgrammeDetails] = useState([]);

  useEffect(() => {
    if (editPlan) {
      setEditPlanDetails(editPlan);
      setDate(editPlan.date ? editPlan.date.split('T')[0] : defaultDate);
      setLocation(editPlan.location);
      setProgrammeDetails(editPlan.ProgrammeDetails || []);
    }
  }, [editPlan]);

  const addEventDetails = () => {
    const newEvent = { events: '', description: '' };
    setProgrammeDetails([...programmeDetails, newEvent]);
    setEditPlanDetails({ ...editPlanDetails, ProgrammeDetails: [...programmeDetails, newEvent] });
  };

  const removeEventDetails = (index) => {
    const updatedProgrammeDetails = [...programmeDetails];
    updatedProgrammeDetails.splice(index, 1);
    setProgrammeDetails(updatedProgrammeDetails);
    setEditPlanDetails({ ...editPlanDetails, ProgrammeDetails: updatedProgrammeDetails });
  };

  const handleEventChange = (index, field, value) => {

    const updatedProgrammeDetails = [...programmeDetails];
    updatedProgrammeDetails[index][field] = value;
    console.log(updatedProgrammeDetails, index, field, value)
    setProgrammeDetails(updatedProgrammeDetails);
    setEditPlanDetails({ ...editPlanDetails, ProgrammeDetails: updatedProgrammeDetails });
  };

  const editPackage = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('id', editPlanDetails._id);  // Ensure to send the ID for the update
    for (let key in editPlanDetails) {
      if (key === 'mainImage' && editPlanDetails[key] instanceof File) {
        formData.append(key, editPlanDetails[key]);
      } else if (key === 'subImages' && editPlanDetails[key] instanceof FileList) {
        Array.from(editPlanDetails[key]).forEach((file) => formData.append(key, file));
      } else if (key !== 'ProgrammeDetails') {
        formData.append(key, editPlanDetails[key]);
      }
    }
    formData.append('ProgrammeDetails', JSON.stringify(editPlanDetails.ProgrammeDetails));
    formData.append('location', location)


    try {
      const response = await axios.post('/agency/edit-plan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      });
      if (!response.err) {
        setContent("successfully updated")
        setColor("success")
        setOpen(true)
        handleplanAdded()
      } 
      handleCloseEditModal()

    } catch (error) {
      setContent("something went wrong")
      setColor("error")
      setOpen(true)
      handleCloseEditModal()
      console.error(error);
    }
  };
  function handeDate(e) {
    setEditPlanDetails({ ...editPlanDetails, date: e.target.value })
    setDate(e.target.value)
  }

  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered dialogClassName="modal-md">
      <Modal.Header closeButton>
        <Modal.Title>Edit Your Plan Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">
                <Form.Control
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="Programme Name"
                  value={editPlanDetails?.name || ''}
                  onChange={(e) => setEditPlanDetails({ ...editPlanDetails, name: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="plans">
              <Form.Select
                className="form-select-sm"
                style={{ width: '100%' }}
                value={editPlanDetails?.category || ''}
                onChange={(e) => setEditPlanDetails({ ...editPlanDetails, category: e.target.value })}
              >
                <option value="Dj Night">Dj Night</option>
                <option value="Desert">Desert Safari</option>
                <option value="Sky Dive">Sky Dive</option>
                <option value="Sea Drive">Sea Drive</option>
                <option value="Trucking">Trucking</option>
                <option value="Camp fire">Camp Fire</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <MapSearchBox setDestination={setLocation} defaultLocation={location} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">
                <Form.Control
                  type="date"
                  style={{ width: '100%' }}
                  value={date}
                  onChange={(e) => handeDate(e)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="Time">
                <Form.Control
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="Time"
                  value={editPlanDetails?.time || ''}
                  onChange={(e) => setEditPlanDetails({ ...editPlanDetails, time: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">
                <Form.Control
                  type="number"
                  style={{ width: '100%' }}
                  placeholder="Total Slots"
                  value={editPlanDetails?.totalSlots || ''}
                  onChange={(e) => setEditPlanDetails({ ...editPlanDetails, totalSlots: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">
                <Form.Control
                  type="number"
                  style={{ width: '100%' }}
                  placeholder="Per Head Cost"
                  value={editPlanDetails?.cost || ''}
                  onChange={(e) => setEditPlanDetails({ ...editPlanDetails, cost: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="description">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  style={{ width: '100%' }}
                  value={editPlanDetails?.description || ''}
                  onChange={(e) => setEditPlanDetails({ ...editPlanDetails, description: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label className="form-label-sm">Event Poster Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  style={{ width: '100%' }}
                  onChange={(e) => setEditPlanDetails({ ...editPlanDetails, mainImage: e.target.files[0] })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="subImages">
                <Form.Label className="form-label-sm">Event Sub Images</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ width: '100%' }}
                  onChange={(e) => setEditPlanDetails({ ...editPlanDetails, subImages: e.target.files })}
                />
              </Form.Group>
            </Col>
          </Row>

          {programmeDetails?.map((programme, index) => (
            <div key={index}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId={`event-${index}`}>
                    <Form.Control
                      type="text"
                      style={{ width: '100%' }}
                      placeholder={programme.events || `Event ${index + 1}`}
                      value={programme.event}
                      onChange={(e) => handleEventChange(index, 'events', e.target.value)}
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
                      onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="w-100">
                  <Button
                    variant="outline-secondary"
                    className="w-100 mb-2"
                    onClick={() => removeEventDetails(index)}
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </div>
          ))}

          <Button variant="outline-secondary" onClick={addEventDetails} className="w-100">
            Add Event Details
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={handleCloseEditModal} className="flex-grow-1">
          Close
        </Button>
        <Button type="button" variant="primary" className="flex-grow-1" onClick={editPackage}>
          Edit Package
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPlanModal;
