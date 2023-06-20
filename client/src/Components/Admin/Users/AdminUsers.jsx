import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { Container, Row, Dropdown, Table, Col } from 'react-bootstrap';
import { RiMore2Fill } from 'react-icons/ri';
import AdminHeader from '../Header/AdminHeader';
import AdminSidebar from '../SideBar/AdminSideBar';
import Swal from 'sweetalert2'
import { Backdrop, CircularProgress } from '@mui/material';


export default function AdminUsers() {
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
      <Row>
        <AdminHeader handleClick={handleClick} />
      </Row>
      <Row>
        <Col md={3}>
          <AdminSidebar page={'user'} clicked={clicked} />
        </Col>
        <Col md={8}>
          <div className="admin-container">
            <h5 className='p-4' style={{ fontSize: '22px', fontWeight: 300 }}>Users</h5>
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

  );
}