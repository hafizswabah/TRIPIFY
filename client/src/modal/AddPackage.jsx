import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import mapboxAPI from '../Components/MapBox/MapBoxApi';
import MapSearchBox from '../Components/MapBox/MapSearchBox';

const AddPackageModal = ({ showModal, handleCloseModal, handlePackageAdded }) => {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
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
  const [dayDetails, setDayDetails] = useState([]);

  const { agency } = useSelector((state) => {
    return state
  })
  const agencyId = agency.details._id

  const handleAddDay = () => {
    const newDayDetails = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the number of days between start and end dates
    const duration = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    for (let i = 0; i < duration; i++) {
      const dayNumber = i + 1;
      const day = {
        day: `Day ${dayNumber}`,
        description: ''
      };
      newDayDetails.push(day);
    }

    setDayDetails(newDayDetails);
  };


  const handleDayChange = (index, key, value) => {
    const newDayDetails = [...dayDetails];
    newDayDetails[index][key] = value;
    setDayDetails(newDayDetails);
  };

  async function addPackage(e) {
    e.preventDefault();
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
    formData.append('dayDetails', JSON.stringify(dayDetails));
    formData.append('agencyId', agencyId);
    Object.keys(subImages).forEach((image) => {
      formData.append('subImages', subImages[image]);
    });

    try {
      const response = await mapboxAPI.get('/geocoding/v5/mapbox.places/' + encodeURIComponent(destination) + '.json');
  
      const features = response.data.features;
      if (features.length > 0) {
        const coordinates = features[0].geometry.coordinates;
        console.log(coordinates)
        formData.append('location.type', 'Point');
        formData.append('location.coordinates',JSON.stringify(coordinates));
      }
  
      const packageResponse = await axios.post('/agency/add-package', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(packageResponse.data); // Handle the response from the server
      handlePackageAdded();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      // Handle the error
    }
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
          </Row>
          <Row>
            <Col>
              <MapSearchBox setDestination={setDestination}></MapSearchBox>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="duration">
                <Form.Control type="text" placeholder="Duration" style={{ width: '100%' }} value={duration} onChange={(e) => { setDuration(e.target.value) }} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="plans">
                <Form.Select className="form-select-sm" style={{ width: '100%' }} value={category} onChange={(e) => { setCategory(e.target.value) }}>
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
                <Form.Control type="text" style={{ width: '100%' }} placeholder='Visit Places' value={visitPlaces} onChange={(e) => { setPlaces(e.target.value) }} />
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
          <Row>
            <Col>
              <Form.Label className="form-label-sm">Day Details</Form.Label>
              {dayDetails.map((day, index) => (
                <div key={index} className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder={`Day ${index + 1}`}
                    value={day.day}
                    onChange={(e) => handleDayChange(index, 'day', e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Description"
                    value={day.description}
                    onChange={(e) => handleDayChange(index, 'description', e.target.value)}
                  />
                </div>
              ))}

            </Col>
          </Row>
          <Row>
            <div className="add-day-btn" style={{ height: "44px" }}>
              <Button variant="secondary" onClick={handleAddDay} className="mb-3 w-100">
                Add Day
              </Button>
            </div>

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