import React, { useEffect, useState } from 'react'
import AgencyHeader from '../Header/AgencyHeader'
import AgencySidebar from '../SideBar/AgencySidebar'
import { Col, Dropdown, Row, Table } from 'react-bootstrap'
import axios from 'axios';

function AgencyTrip() {
    const [clicked, setClicked] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [trips, setTrips] = useState([]);
    const handleClick = () => {
        setClicked(!clicked)
    }

    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/agency/get-packages")
            console.log(data);
            if (!data.err) {
                setTrips(data.packages)
            }
        })()

    }, [refresh])
  
    return (
        <div>
            <AgencyHeader handleClick={handleClick} />
            <Row className='m-0'>
                <Col md={3}>
                    <AgencySidebar page={'trips'} clicked={clicked} />
                </Col>
                <Col md={8}>
                    <div className="admin-container">
                        <h5 className='p-4' style={{ fontSize: '22px', fontWeight: 300 }}>Users</h5>
                        <Table className='table-main' responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Trip</th>
                                    <th>Date</th>
                                    <th>Destination</th>
                                    <th>Bookings</th>
                                    <th>status</th>
                                    <th>option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    trips?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.name}</td>
                                            <td>{new Date(item.startDate).toLocaleDateString()} To {new Date(item.endDate).toLocaleDateString()}</td>
                                            <td>{item.destination}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default AgencyTrip