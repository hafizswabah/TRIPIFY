import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Row, Table } from 'react-bootstrap'
import axios from 'axios';
import AdminHeader from '../Header/AdminHeader';
import AdminSidebar from '../SideBar/AdminSideBar';

function AdminTripDetails() {
    const [clicked, setClicked] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [trips, setTrips] = useState([]);
    const handleClick = () => {
        setClicked(!clicked)
    }

    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/admin/get-trips")
            console.log(data);
            if (!data.err) {
                setTrips(data.packages)
            }
        })()

    }, [refresh])

    return (
        <div>
            <AdminHeader handleClick={handleClick} />
            <Row className='m-0'>
                <Col md={3}>
                    <AdminSidebar page={'trips'} clicked={clicked} />
                </Col>
                <Col md={8}>
                    <div className="admin-container">
                        <h5 className='p-4' style={{ fontSize: '22px', fontWeight: 300 }}>Trips Details</h5>
                        <Table className='table-main' responsive size="sm" style={{ fontSize: ".8rem" }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Trip</th>
                                    <th>Date</th>
                                    <th>Destination</th>
                                    <th>Travel Agent</th>
                                    <th>Bookings</th>
                                    <th>Balance Slot</th>
                                    <th>status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    trips?.map((item, index) => {
                                        const currentDate = new Date();
                                        const startDate = new Date(item.startDate);
                                        const endDate = new Date(item.endDate);
                                        let status = "";
                                        let clr = "";

                                        if (currentDate >= startDate && currentDate <= endDate) {
                                            status = "Ongoing";
                                            clr = "yellow";
                                        } else if (currentDate < startDate) {
                                            const timeDiff = startDate.getTime() - currentDate.getTime();
                                            const daysCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
                                            status = `${daysCount} days left`;
                                            clr = "#c70000";
                                        } else {
                                            status = "Completed";
                                            clr = "green";
                                        }

                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{startDate.toDateString()} To {endDate.toDateString()}</td>
                                                <td>{item.destination}</td>
                                                <td>{item.agencyId.name}</td>
                                                <td style={{color:"#00a500",fontWeight:"500"}}>{item.totalSlots - item.balanceSlot} Bookings</td>
                                                <td style={{color:"#ff5400",fontWeight:"500"}}>{item.balanceSlot} Slot Available</td>
                                                <td style={{ color: clr ,fontWeight:"600"}}>{status}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default AdminTripDetails