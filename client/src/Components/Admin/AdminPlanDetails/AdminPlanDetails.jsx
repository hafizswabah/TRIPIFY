import React, { useEffect } from 'react'
import { Container, Row, Dropdown, Table, Col } from 'react-bootstrap';
import AdminHeader from '../Header/AdminHeader'
import AdminSidebar from '../SideBar/AdminSideBar'
import { useState } from 'react';
import axios from 'axios';
import { RiMore2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
function AdminPlanDetails() {
    const [clicked, setCLicked] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [reload, setReload] = useState(false)
    const [PlanList, setPlanList] = useState([])
    const[load,setLoad]=useState(false)
    const handleClick = () => {
        setCLicked(!clicked)
    }

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
        (
            async function () {
                try {
                    const { data } = await axios.get("/admin/plans")
                    if (!data.err) {
                        setPlanList(data.plans)
                    }

                } catch (err) {
                    console.log(err)
                }
            }
        )()
    }, [reload])
    return (
        <>
            <Row>
                <AdminHeader handleClick={handleClick} />
            </Row>
            <Row>
                <Col md={3}>
                    <AdminSidebar page={'plans'} clicked={clicked} />
                </Col>
                <Col md={8}>
                    <div className="admin-container">
                        <h5 className='p-4' style={{ fontSize: '22px', fontWeight: 300 }}>Activity Tickets</h5>
                        <Table className='table-main' responsive size="sm" style={{ fontSize: ".8rem" }}>
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
                            {PlanList.map((item, index) => {
                    const statusColour = item.active ? 'green' : 'red';
                    const PlanDate = new Date(item.date).toDateString();
                   

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
                </Col>
            </Row>
        </>

    )
}

export default AdminPlanDetails