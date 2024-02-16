import { Backdrop, CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Col, Dropdown, Row, Table } from 'react-bootstrap'
import AgencyHeader from '../Header/AgencyHeader'
import AgencySidebar from '../SideBar/AgencySidebar'
import { RiMore2Fill } from 'react-icons/ri';
function AgnecyUsers() {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [load, setLoad] = useState(false)
    const [reload, setreLoad] = useState(false)
    const [clicked, setCLicked] = useState(false)
  
    const handleClick = () => {
      setCLicked(!clicked)
    }
    React.useEffect(() => {
      (
        async function () {
          try {
            const { data } = await axios.get("/admin/users")
            if (!data.err) {
              setUsers(data.users)
            }
  
          } catch (err) {
            console.log(err)
          }
        }
      )()
    }, [refresh,reload])
  
    const unBlockUser = async (e, email) => {
      e.preventDefault();
      Swal.fire({
        title: 'UnBlock User',
        text: "Allow this account!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '##a8a8a8',
        confirmButtonText: 'Yes,UnBlock'
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoad(true)
          const { data } = await axios.post("/admin/unblock-user", { email });
          if (!data.err) {
            Swal.fire(
              'Success!',
              'Unblocked User',
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
          setreLoad(!reload)
        }
      })
  
    }
    const blockUser = async (e, email) => {
      e.preventDefault();
      Swal.fire({
        title: 'Block this User?',
        text: "Are you sure ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: '##a8a8a8',
        confirmButtonText: 'Yes,Block the User!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoad(true)
          const { data } = await axios.post("/admin/block-user", { email });
          if (!data.err) {
            Swal.fire(
              'Success!',
              'Successfully Blocked',
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
          setreLoad(!reload)
        }
      })
    }
    return (
        <div>
            <AgencyHeader handleClick={handleClick} />
            <Row className='m-0'>
            <Col md={3} style={{padding:"0px"}}>
                    <AgencySidebar page={'user'} clicked={clicked} />
                </Col>
                <Col md={8}>
          <div className="admin-container">
            <h5 className='p-4' style={{ fontSize: '22px', fontWeight: 300 }}>Users</h5>
            <Table className='table-main' responsive size="sm" style={{ fontSize: ".8rem" }}>
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
                {
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
                }

              </tbody>
            </Table>

          </div>


          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={load}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Col>
            </Row>
        </div>
    )
}

export default AgnecyUsers