import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Container, Table, Dropdown } from 'react-bootstrap';
import AddPlanModal from '../../../modal/AddPlanModal';
import AgencyHeader from '../Header/AgencyHeader';
import AgencySidebar from '../SideBar/AgencySidebar';
import '../Package/agencypackage.css';
import { RiMore2Fill } from 'react-icons/ri';
import axios from 'axios';
import Swal from 'sweetalert2';

function AgencyPlans() {
  const [showModal, setShowModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [plans, setPlans] = useState([]);
  const[reload,setReload]=useState(false)
  const[load,setLoad]=useState(false)
const handleplanAdded=()=>{
  setReload(!reload)
}
  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
async function activate(e,id){
  e.preventDefault()
  Swal.fire({
    title: 'Activate the Plan',
    text: "Do you want to activate the plan",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'green',
    cancelButtonColor: '##a8a8a8',
    confirmButtonText: 'Yes,Activate'
  }).then(async (result) => {
    if (result.isConfirmed) {
      setLoad(true)
      const { data } = await axios.post("/agency/active-plan", {id });
      if (!data.err) {
        Swal.fire(
          'Success!',
          'Activated Plan succesfully',
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
async function Deactivate(e,id){
  e.preventDefault()
  Swal.fire({
    title: 'De-Activate the Plan',
    text: "Do you want to De-Activate the plan",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'red',
    cancelButtonColor: '##a8a8a8',
    confirmButtonText: 'Yes,De-Activate'
  }).then(async (result) => {
    if (result.isConfirmed) {
      setLoad(true)
      const { data } = await axios.post("/agency/deactivate-plan", {id });
      if (!data.err) {
        Swal.fire(
          'Success!',
          'De-Activated Plan succesfully',
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
    title: 'Delete the plan',
    text: "Do you want to Delete the plan",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'red',
    cancelButtonColor: '##a8a8a8',
    confirmButtonText: 'Yes,Delete'
  }).then(async (result) => {
    if (result.isConfirmed) {
      setLoad(true)
      const { data } = await axios.post("/agency/delete-plan", { id });
      if (!data.err) {
        Swal.fire(
          'Success!',
          'Deleted plan succesfully',
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
      let { data } = await axios.get("/agency/get-plans");
      console.log(data);
      if (!data.err) {
        setPlans(data.plans);
      }
    })();
  }, [reload]);

  return (
    <div>
      <AgencyHeader handleClick={handleClick} />
      <Row className='m-0'>
        <Col md={3}>
          <AgencySidebar page={'plans'} clicked={clicked} />
        </Col>
        <Col md={9}>
          <Row>
            <Container className='p-4'>
              <div className='add-package-btn'>
                <Button className='w-25 pkg-btn' onClick={handleModal}>
                  Add Plans
                </Button>
              </div>
            </Container>
            <AddPlanModal showModal={showModal} handleCloseModal={handleCloseModal} handleplanAdded={handleplanAdded}/>
          </Row>
          <Row>
            <div className='admin-container'>
              <h5 className='p-1' style={{ fontSize: '22px', fontWeight: 300 }}>Plans</h5>
              <Table className='table-main' responsive size="sm" style={{fontSize:".8rem"}}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Programme Name</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Total Slots</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((item, index) => {
                    const statusColour = item.active ? 'green' : 'red';
                    const PlanDate = new Date(item.date).toLocaleDateString();
                   

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.location}</td>
                        <td>{item.category}</td>
                        <td>{PlanDate}</td>
                        <td>{item.time}</td>
                        <td>{item.totalSlots}</td>
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
                                 <Dropdown.Item href='#' onClick={(e) => handleDelete(e, item._id)}>
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

export default AgencyPlans;
