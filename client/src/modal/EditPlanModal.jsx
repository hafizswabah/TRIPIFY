import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import formatDate from '../helper/formatDate';


const EditPlanModal = ({ showEditModal, handleCloseEditModal, editPlan ,handlePackageAdded }) => {
  const [state, setState] = useState({})
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [name, setName] = useState('');
  const [flightBooking, setFlightBooking] = useState(false)
  const [stayBooking, setStayBooking] = useState(false)
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);

 
//   useEffect(() => {
//     if (editpkg) {
//       setStartDate(formatDate(editpkg.startDate))
//       setEndDate(formatDate(editpkg.endDate))
//       setState(editpkg)
//     }
//   }, [editpkg])


  async function editPackage(e) {
    //   e.preventDefault();
    // const formData = new FormData();
    // formData.append('mainImage', mainImage);
    // for (let i = 0; i < subImages.length; i++) {
    //     formData.append('subImages', subImages[i]);
    // }
    // const packageData = {
    //   ...state, 
    // };

    // formData.append('state', JSON.stringify(packageData));
    // const {data} = await axios.post("/agency/edit-packages", formData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     },
    // });
    // if(!data.err){
    //   handleCloseEditModal()
    //   handlePackageAdded ()
    // }
}
console.log(editPlan.name,"state");

  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal} centered dialogClassName="modal-md">
      <Modal.Header closeButton>
        <Modal.Title>Edit Your Tour Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {/* <Form>
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
              <MapSearchBox setDestination={setLocation}></MapSearchBox>
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
           {
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
                <Row>
                  <Col md={12} className='w-100'>
                    <Button
                      variant="outline-secondary"
                      className='w-100 mb-2'
                      onClick={() => removeEventDetails(index)}
                    >
                      Close
                    </Button>
                  </Col>
            
                </Row>
              </div>
            ))
   
          }
                  
            <Button variant="outline-secondary" onClick={addEventDetails}
            className='w-100'>
              Add Event Details
            </Button>
   
        </Form> */}
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


export default EditPlanModal;