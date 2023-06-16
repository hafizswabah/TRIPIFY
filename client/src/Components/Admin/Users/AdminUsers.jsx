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
  }, [refresh])

  const acceptRequest = async (e, email) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "accept this account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Accept it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoad(true)
        const { data } = await axios.post("/admin/agency/accept", { email });
        if (!data.err) {
          Swal.fire(
            'Success!',
            'Successfully Accepted',
            'success'
          )
        } else {
          Swal.fire(
            'Failed!',
            'Something Went Wrong',
            'error'
          )

        }
        setRefresh(!refresh)
        setLoad(false)
      }
    })

  }
  const rejectRequest = async (e, email) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      cancelButtonColor: '##a8a8a8',
      confirmButtonText: 'Yes, Accept it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoad(true)
        const { data } = await axios.post("/admin/agency/reject", { email });
        if (!data.err) {
          Swal.fire(
            'Success!',
            'Successfully Rejected',
            'success'
          )
          setRefresh(!refresh)
        } else {
          Swal.fire(
            'Failed!',
            'Something Went Wrong',
            'error'
          )

        }
        setLoad(false)
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
          <AdminSidebar page={'user'} clicked={clicked}/>
        </Col>
        <Col md={8}>
        <div className="admin-container">
       <h5 className='p-4' style={{fontSize:'22px',fontWeight:300}}>Travel Agencies</h5>
          <Table className='table-main' responsive>
         <thead>
            <tr>
                 <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Proof</th>
                 <th>Document No</th>
                <th>option</th>
             </tr>
             </thead>
              <tbody>
                {
                  users.map((item, index) => {
                    return <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.contact}</td>
                      <td>
                        <a href={item.proof.url} target="_blank">
                        <img src={item.proof.url} className='table-img' alt="" />
                        </a>
                        </td>
                      <td>{item.regNo}</td>
                      <td className='option-btn'>
                        <Dropdown>
                          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <RiMore2Fill />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                    
                            <Dropdown.Item href="#" onClick={(e) => rejectRequest(e, item.email)}>Reject</Dropdown.Item>
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