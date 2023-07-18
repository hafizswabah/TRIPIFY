import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Row, Table } from 'react-bootstrap'
import AdminHeader from '../Header/AdminHeader'
import AdminSidebar from '../SideBar/AdminSideBar'

function AdminReport() {
    const [clicked, setCLicked] = useState(false)
    const [BookingList, setBookingList] = useState([])
    const [PlanBookingList, setPlanBookingList] = useState([])

    const handleClick = () => {
        setCLicked(!clicked)
    }
    useEffect(() => {
        (
            async function () {
                const { data } = await axios.get("/admin/get-bookings");
                if (!data.err) {
                    setBookingList(data.bookings)
                    setPlanBookingList(data.PlanBookings)

                }
            }
        )()
    }, [])
    return (
        <div>
            <AdminHeader handleClick={handleClick} />
            <Row className='m-0'>
                <Col md={3}>
                    <AdminSidebar page={'reports'} clicked={clicked} />
                </Col>
                <Col md={8}>
                    <div className="admin-container">
                        <h5 className='p-4' style={{ fontSize: '22px', fontWeight: 300 }}>
                            Sales Report</h5>
                    </div>
                    </Col>
                
                    </Row>
                </div>
    )
}
export default AdminReport