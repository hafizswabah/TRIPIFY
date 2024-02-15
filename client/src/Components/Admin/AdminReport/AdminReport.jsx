import * as React from 'react';
import { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Backdrop, CircularProgress, setRef } from '@mui/material';
import { useEffect } from 'react';

import { FcCancel, FcOk, FcOvertime, FcTodoList } from "react-icons/fc";

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import './AdminReport.css'
import { DatePicker, Space } from 'antd';
import AdminHeader from '../Header/AdminHeader'
import AdminSidebar from '../SideBar/AdminSideBar'
import axios from 'axios';

function AdminReport() {
    const [clicked, setCLicked] = useState(false)
    const [BookingList, setBookingList] = useState([])
    const [PlanBookingList, setPlanBookingList] = useState([])
    const { RangePicker } = DatePicker;
    const handleClick = () => {
        setCLicked(!clicked)
    }
    const [refresh, setRefresh] = useState(false)
    const [startDate, setStartDate] = useState((new Date(new Date().setDate(new Date().getDate() - 7))))
    const [endDate, setEndDate] = useState((new Date()))
    const [load, setLoad] = useState(false)
    const [data, setData] = useState({})
    const [completedTrips, setCompletedTrip] = useState([])
    const [completedPlans, setCompletedPlans] = useState([])

    const [date, setDate] = useState({})
    const [filter, setFilter] = useState("")

    useEffect(() => {
        (
            async function () {
                const { data } = await axios.get("/admin/report?startDate=" + startDate + "&endDate=" + endDate);
                console.log("data", data);
                if (!data.err) {
                    setCompletedTrip(data.completedTrips)
                    setCompletedPlans(data.completedPlans)

                }
            }
        )()

    }, [startDate, endDate]);
    console.log("cc", completedTrips);

    const handleLastWeekChange = () => {
        const today = new Date();
        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 6);
        setStartDate(startOfWeek);
        setEndDate(today);
        setRefresh(!refresh);
        setFilter('lastWeek')
    };
    const handleThisMonthChange = () => {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        setStartDate(startOfMonth);
        setEndDate(endOfMonth);
        setRefresh(!refresh);
        setFilter('thisMonth')
    };
    const handleLastMonthChange = () => {
        const today = new Date();
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        setStartDate(lastMonthStart);
        setEndDate(lastMonthEnd);
        setRefresh(!refresh);
        setFilter('lastMonth')
    };
    const handleThisYearChange = () => {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const endOfYear = new Date(today.getFullYear(), 11, 31);
        setStartDate(startOfYear);
        setEndDate(endOfYear);
        setRefresh(!refresh);
        setFilter('thisYear')
    };
    const handleLastYearChange = () => {
        const today = new Date();
        const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
        const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);
        setStartDate(lastYearStart);
        setEndDate(lastYearEnd);
        setRefresh(!refresh);
        setFilter('lastYear')
    };


    const downloadPdf = () => {
        const completedTripsArr = completedTrips.map(((item, index) => [index + 1, item.packages[0].name, item.user[0].name, item.agency[0].name,new Date(item.createdAt).toDateString() ,item.BookedSlots, item.totalCost]))
        const completedPlansArr = completedPlans.map(((item, index) => [index + 1, item.plans[0].name, item.user[0].name, item.agency[0].name, new Date(item.createdAt).toDateString(),item.BookedSlots, item.totalCost]))
        const doc = new jsPDF();
        doc.setFontSize(13);
        doc.text("TRIPIFY Booking Report ( " + new Date(startDate).toLocaleDateString() + " - " + new Date(endDate).toLocaleDateString() + " )", 13, 10);

        autoTable(doc, {
            head: [["No", "Package/Plan", "Booked User", "Travel agent","Booking Date", "Count", "Profit"]],
            body: [...completedPlansArr, ...completedTripsArr],
            startY: 20

        })

        doc.save("a4.pdf");
    }


    return (
        <div>
            <AdminHeader handleClick={handleClick} />
            <Row className='m-0'>
            <Col md={3} style={{padding:"0px"}}>
                    <AdminSidebar page={'reports'} clicked={clicked} />
                </Col>
                <Col md={8}>
                    <Container fluid>

                        <div className="admin-container" id="textHtml">
                            <div className="container-header" style={{ display: "flex", justifyContent: "space-between", paddingTop: "20px" }}>
                                <h5>Booking report</h5>
                                <button className='btn btn-dark' onClick={downloadPdf}>Download Pdf</button>
                            </div>
                            <Row>

                                <Container fluid>
                                    <Row>

                                        <Col md={6} >
                                            <div className="report-box">
                                                <div className="report-input">
                                                    <h5>Choose Date</h5>
                                                </div>
                                                <div className="report-input">
                                                    <div className="report-input-row">

                                                        <div className="report-input-radio">
                                                            <input type="radio" id='lastweek'
                                                                checked={filter == 'lastWeek'}
                                                                onChange={handleLastWeekChange}

                                                                name='date' />
                                                            <label htmlFor="lastweek">Last Week</label>
                                                        </div>
                                                    </div>
                                                    <div className="report-input-row">
                                                        <div className="report-input-radio">
                                                            <input type="radio" id='thismonth'
                                                                checked={filter == 'thisMonth'}

                                                                onChange={handleThisMonthChange}
                                                                name='date' />
                                                            <label htmlFor="thismonth">This Month</label>
                                                        </div>
                                                        <div className="report-input-radio">
                                                            <input type="radio" id='lastmonth'
                                                                checked={filter == 'lastMonth'}
                                                                onChange={handleLastMonthChange}

                                                                name='date' />
                                                            <label htmlFor="lastmonth">Last month</label>
                                                        </div>
                                                    </div>
                                                    <div className="report-input-row">
                                                        <div className="report-input-radio">
                                                            <input type="radio" id='thisyear'
                                                                checked={filter == 'thisYear'}
                                                                onChange={handleThisYearChange}
                                                                name='date' />
                                                            <label htmlFor="thisyear">This Year</label>
                                                        </div>
                                                        <div className="report-input-radio">
                                                            <input type="radio" id='lastyear'
                                                                checked={filter == 'lastYear'}
                                                                onChange={handleLastYearChange}
                                                                name='date' />
                                                            <label htmlFor="lastyear">Last Year</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="report-input">
                                                    <div className="report-input-date-picker">
                                                        <h5>Choose Custom Date</h5>
                                                    </div>
                                                    <div className="report-input-row">
                                                        <div className="report-input-date-picker">
                                                            <Space direction="vertical" size={12}>
                                                                <RangePicker onChange={(data) => {
                                                                    setStartDate(new Date(data[0]))
                                                                    setEndDate(new Date(data[1]))
                                                                }
                                                                } />
                                                            </Space>
                                                        </div>

                                                    </div>



                                                </div>

                                            </div>

                                        </Col>
                                        <Col md={6} >
                                            <div className="report-box total">

                                                <div className="report-box-item">
                                                    {/* <div>
                                                                <h6>Total {item._id}</h6>
                                                                <h3>{item.name}</h3>
                                                            </div> */}

                                                </div>

                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Table className='table-main  report' responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Package/Plan</th>
                                                    <th>Booked User</th>
                                                    <th>Travell Agent</th>
                                                    <th>Booked Date</th>
                                                    <th>Count</th>
                                                    <th>Profit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    completedTrips.map((item, index) => {
                                                        return (<tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.packages[0].name}</td>
                                                            <td>{item.user[0].name}</td>
                                                            <td>{item.agency[0].name}</td>
                                                            <td>{new Date(item.createdAt).toDateString()}</td>
                                                            <td>{item.BookedSlots} Slots</td>
                                                            <td>{item.totalCost}/-</td>

                                                        </tr>
                                                        )
                                                    })
                                                }
                                                {
                                                    completedPlans.map((item, index) => {
                                                        return (<tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.plans[0].name}</td>
                                                            <td>{item.user[0].name}</td>
                                                            <td>{item.agency[0].name}</td>
                                                            <td>{new Date(item.createdAt).toDateString()}</td>
                                                            <td>{item.BookedSlots} Slots</td>
                                                            <td>{item.totalCost}/-</td>

                                                        </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </Table>


                                    </Row>

                                </Container>
                            </Row>



                        </div>


                    </Container>
                </Col>

            </Row>
        </div>
    )
}
export default AdminReport