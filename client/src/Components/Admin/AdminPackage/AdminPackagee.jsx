import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Container, Table, Dropdown } from 'react-bootstrap';
import AddPackageModal from '../../../modal/AddPackage';
import AdminHeader from '../Header/AdminHeader';
import AdminSidebar from '../SideBar/AdminSideBar';
import { RiMore2Fill } from 'react-icons/ri';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditPackageModal from '../../../modal/EditPackage';

function AdminPackage() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [packages, setPackages] = useState([]);
  const [reload, setReload] = useState(false)
  const [editpkg, setEditpkg] = useState(null)
  const [load, setLoad] = useState(false)
  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleModal = () => {
    setShowModal(true);
  };
  const handleEditModal = (item) => {
    console.log(item);
    setEditpkg(item)
    setShowEditModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  async function activate(e, id) {
    e.preventDefault()
    Swal.fire({
      title: 'Activate the Package',
      text: "Do you want to activate the package",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes,Activate'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoad(true)
        const { data } = await axios.post("/agency/active-package", { id });
        if (!data.err) {
          Swal.fire(
            'Success!',
            'Activated Package succesfully',
            'success'
          )
        } else {
          Swal.fire(
            'Failed!',
            'Something Went Wrong',
            'error'
          )

        }

        setLoad(false)
        setReload(!reload)
      }
    })
  }
  async function Deactivate(e, id) {
    e.preventDefault()
    Swal.fire({
      title: 'De-Activate the Package',
      text: "Do you want to De-Activate the package",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes,De-Activate'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoad(true)
        const { data } = await axios.post("/agency/deactivate-package", { id });
        if (!data.err) {
          Swal.fire(
            'Success!',
            'De-Activated Package succesfully',
            'success'
          )
        } else {
          Swal.fire(
            'Failed!',
            'Something Went Wrong',
            'error'
          )

        }

        setLoad(false)
        setReload(!reload)
      }
    })
  }
  async function handleDelete(e,id) {
    e.preventDefault()
    Swal.fire({
      title: 'Delete the Package',
      text: "Do you want to Delete the package",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes,Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoad(true)
        const { data } = await axios.post("/agency/delete-package", { id });
        if (!data.err) {
          Swal.fire(
            'Success!',
            'Deleted Package succesfully',
            'success'
          )
        } else {
          Swal.fire(
            'Failed!',
            'Something Went Wrong',
            'error'
          )

        }

        setLoad(false)
        setReload(!reload)
      }
    })
  }
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/agency/get-packages");
      console.log(data);
      if (!data.err) {
        setPackages(data.packages);
      }
    })();
  }, [reload]);

  return (
    <div>
      <AdminHeader handleClick={handleClick} />
      <Row className='m-0'>
        <Col md={3}>
          <AdminSidebar page={'package'} clicked={clicked} />
        </Col>
        <Col md={9}>
      
          <Row>
            <div className='admin-container'>
              <h5 className='p-1' style={{ fontSize: '22px', fontWeight: 300 }}>Packages</h5>
              <Table className='table-main' responsive size="sm" style={{ fontSize: ".8rem" }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Package Name</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Total Slots</th>
                    <th>Stay Bookings</th>
                    <th>Flight Bookings</th>
                    <th>Cost</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((item, index) => {
                    const statusColour = item.active ? 'green' : 'red';
                    const formattedStartDate = new Date(item.startDate).toLocaleDateString();
                    const formattedEndDate = new Date(item.endDate).toLocaleDateString()

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.destination}</td>
                        <td>{item.category}</td>
                        <td>{formattedStartDate} to {formattedEndDate}</td>
                        <td>{item.totalSlots}</td>
                        <td>{item.staybooking ? 'Yes' : 'No'}</td>
                        <td>{item.flightbooking ? 'Yes' : 'No'}</td>
                        <td>{item.cost}/-</td>
                        <td style={{ color: statusColour }}>{item.active ? 'Valid' : 'Expired'}</td>
                        <td className='option-btn'>
                          <Dropdown>
                            <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
                              <RiMore2Fill />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {item.active ? (
                                <>
                                  <Dropdown.Item href='#' onClick={(e) => Deactivate(e, item._id)}>
                                    Deactivate
                                  </Dropdown.Item>
                                  <Dropdown.Item href='#' onClick={() => { handleEditModal(item) }}>
                                    Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item href='#' onClick={(e) => { handleDelete(e,item._id) }}>
                                    Delete
                                  </Dropdown.Item>
                                </>
                              ) : (
                                <Dropdown.Item href='#' onClick={(e) => activate(e, item._id)}>
                                  Activate
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Row>
        </Col>
      </Row>
   
    </div>
  );
}

export default AdminPackage;
