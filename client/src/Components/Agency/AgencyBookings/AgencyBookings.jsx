import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Row, Table } from 'react-bootstrap'
import AgencyHeader from '../Header/AgencyHeader'
import AgencySidebar from '../SideBar/AgencySidebar'
function AgencyBookings() {
    const [clicked, setCLicked] = useState(false)
    const [BookingList, setBookingList] = useState([])
    const [PlanBookingList, setPlanBookingList] = useState([])
  
    const handleClick = () => {
        setCLicked(!clicked)
    }
    useEffect(() => {
        (
            async function () {
                const { data } = await axios.get("/agency/get-bookings");
                console.log(data);
                if (!data.err) {
                    setBookingList(data.bookings)
                    setPlanBookingList(data.PlanBookings)
                 
                }
            }
        )()
    }, [])
    return (
        <div>
            <AgencyHeader handleClick={handleClick} />
            <Row className='m-0'>
                <Col md={3}>
                    <AgencySidebar page={'bookings'} clicked={clicked} />
                </Col>
                <Col md={8}>
                    <div className="admin-container">
                        <h5 className='p-4' style={{ fontSize: '22px', fontWeight: 300 }}>
                            Bookings Details</h5>
                        <Table className='table-main' responsive size="sm" style={{ fontSize: ".8rem" }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>Package/Plan</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Tickets</th>
                                    <th>Booked Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PlanBookingList?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.userId.email}</td>
                                            <td>{item.PlanId.name}</td>
                                            <td>{new Date(item.PlanId.date).toDateString()}</td>
                                            <td>{item.PlanId.location}</td>
                                            <td>{item.BookedSlots}</td>
                                            <td>{new Date(item.createdAt).toDateString()}</td>
                                            <td>{item.status=="upcoming" ? "paid" : "Refund Proceess"}</td>

                                        </tr>
                                    )
                                })

                                }
                            </tbody>
                        </Table>
                    </div>
                </Col>

            </Row>

        </div >
    )
}

export default AgencyBookings