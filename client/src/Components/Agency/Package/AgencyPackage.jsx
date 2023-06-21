import React, { useState } from 'react';
import { Row, Col, Button, Container, Table } from 'react-bootstrap';
import AddPackageModal from '../../../modal/AddPackage';
import AgencyHeader from '../Header/AgencyHeader';
import AgencySidebar from '../SideBar/AgencySidebar';
import './agencypackage.css';

function AgencyPackage() {
  const [showModal, setShowModal] = useState(false);
  const [clicked, setCLicked] = useState(false);

  const handleClick = () => {
    setCLicked(!clicked)
  }
const handleModal=()=>{
  setShowModal(true)
}
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <AgencyHeader handleClick={handleClick} />
      <Row className='m-0'>
        <Col md={3}>
          <AgencySidebar page={'package'} clicked={clicked} />
        </Col>
        <Col md={9}>
          <Row>
            <Container className='p-4'>
              <div className="add-package-btn">
                <Button className='w-25 pkg-btn' onClick={handleModal}>
                  Add Package
                </Button>
              </div>
            </Container>
            <AddPackageModal showModal={showModal} handleCloseModal={handleCloseModal} />
          </Row>
          <Row>
          <div className="admin-container">
            <h5 className='p-1' style={{ fontSize: '22px', fontWeight: 300 }}>Packages</h5>
            <Table className='table-main' responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>option</th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  users.map((item, index) => {
                    const statusColour = item.block ? 'red' : 'green'
                    return <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.contact}</td>
                      <td
                        style={{ color: statusColour }}
                      >{item.block ? 'Blocked' : 'Allowed'}</td>



                      <td className='option-btn'>
                        <Dropdown>
                          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <RiMore2Fill />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {item.block ?
                              <Dropdown.Item href="#" onClick={(e) => unBlockUser(e, item.email)}>Alow</Dropdown.Item>
                              :
                              <Dropdown.Item href="#" onClick={(e) => blockUser(e, item.email)}>Block</Dropdown.Item>
                            }
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  })
                } */}

              </tbody>
            </Table>

          </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AgencyPackage;
