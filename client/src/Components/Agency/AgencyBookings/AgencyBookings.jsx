import React, { useState } from 'react'
import { Col, Dropdown, Row, Table } from 'react-bootstrap'
import AgencyHeader from '../Header/AgencyHeader'
import AgencySidebar from '../SideBar/AgencySidebar'
function AgencyBookings() {
    const [clicked, setCLicked] = useState(false)
    const handleClick = () => {
        setCLicked(!clicked)
    }
    return (
        <div>
            <AgencyHeader handleClick={handleClick} />
            <Row className='m-0'>
                <Col md={3}>
                    <AgencySidebar page={'bookings'} clicked={clicked} />
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
                            </tbody>
                        </Table>
                    </div>
                </Col>

            </Row>

        </div >
    )
}

export default AgencyBookings