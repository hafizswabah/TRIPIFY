import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddPackageModal = ({ showModal, handleCloseModal }) => {
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
                <Form.Control type="text" placeholder="Package Name" style={{ width: '100%' }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="mainDestination">
                <Form.Control type="text" placeholder="Main Destination" style={{ width: '100%' }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="duration">
                <Form.Control type="text" placeholder="Duration" style={{ width: '100%' }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="plans">
                <Form.Select className="form-select-sm" style={{ width: '100%' }}>
                  <option value="city">City Tour</option>
                  <option value="adventure">Adventure</option>
                  <option value="djNight">Nature</option>
                  <option value="djNight">Snow</option>
                  <option value="djNight">occean</option>
                  <option value="djNight">Desert</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="slots">
                <Form.Label>Slots</Form.Label>
                <Form.Control type="number" style={{ width: '100%' }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="tripDateFrom">
                <Form.Label>From</Form.Label>
                <Form.Control type="date" style={{ width: '100%' }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="tripDateTo">
                <Form.Label>To</Form.Label>
                <Form.Control type="date" style={{ width: '100%' }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="description">
                <Form.Control as="textarea" rows={3} placeholder="Description" style={{ width: '100%' }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="bookings">
                <Form.Select className="form-select-sm" style={{ width: '100%' }}>
                  <option value="yes">Flight Booking</option>
                  <option value="no">No</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="stayBookings">
                <Form.Select className="form-select-sm" style={{ width: '100%' }}>
                  <option value="yes">Stay Booking</option>
                  <option value="no">No</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Main Package Image</Form.Label>
                <Form.Control type="file" style={{ width: '100%' }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="subImages">
                <Form.Label>Sub Images</Form.Label>
                <Form.Control type="file" multiple style={{ width: '100%' }} />
              </Form.Group>
            </Col>
          </Row>
        
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={handleCloseModal} className="flex-grow-1">
          Close
        </Button>
        <Button variant="primary" className="flex-grow-1">
          Add Package
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPackageModal;
