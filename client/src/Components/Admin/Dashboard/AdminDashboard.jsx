import React, { useEffect, useState } from 'react'

import { Row, Col, Container } from 'react-bootstrap'
import { BiTrip, BiMoneyWithdraw, BiTimer } from "react-icons/bi";
import { RiFlightLandFill } from "react-icons/ri";

import Chart from "react-apexcharts";
import axios from 'axios';
import AdminHeader from '../Header/AdminHeader';
import AdminSidebar from '../SideBar/AdminSideBar';
import { padding, width } from '@mui/system';
function AdminDashboard() {
  const [clicked, setCLicked] = useState(false)
  const [completedTripsCount, setcompletedTripsCount] = useState('')
  const [completedPlansCount, setcompletedPlansCount] = useState('')
  const [PackageBookedAmount, setPackageBookedAmount] = useState('')
  const [pendingTripsCount, setpendingTripsCount] = useState('')
  const [pendingPlanCount, setpendingPlanCount] = useState('')
  const [PlanBookedAmount, setPlanBookedAmount] = useState('')
  const [totalTripCount, settotalTripCount] = useState('')
  const [totalPlanCount, settotalPlanCount] = useState('')
  const [monthlyData, setmonthlyData] = useState([])

  const handleClick = () => {
    setCLicked(!clicked)
  }

  useEffect(() => {
    (async function () {
      let { data } = await axios.get('/agency/dashboard-bookings')
      console.log(data);
      if (!data.err) {
        setcompletedTripsCount(data.completedTripsCount[0].count)
        setPackageBookedAmount(data.PackageBookedAmount)
        setpendingTripsCount(data.pendingTripsCount[0].count)
        settotalTripCount(data.totalTripCount)
        setmonthlyData(data.monthlyData)
        setcompletedPlansCount(data.completedPlansCount[0].count)
        setPlanBookedAmount(data.PlanBookedAmount)
        settotalPlanCount(data.totalPlanCount)
      }

    })()
  }, [])
  let TotalRevenuie = PackageBookedAmount + PlanBookedAmount;
  let totalBookings = totalTripCount + totalPlanCount
  let totalPending=pendingPlanCount+pendingTripsCount
  let completedBookings=completedPlansCount+completedTripsCount
  const state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    },
    series: [
      {
        name: "series-1",
        data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',]
      }
    ]
  };
  monthlyData.forEach(monthlyData => {
    const index = monthlyData._id - 1;
    if (index >= 0 && index < 12) {
      state.series[0].data[index] = monthlyData.totalCost.toString();
    }
  })

  return (
    <div>
      <AdminHeader handleClick={handleClick} />
      <Row>
        <Col md={3} style={{padding:"0px"}}>
          <AdminSidebar page={'dashboard'} clicked={clicked} />
        </Col>
        <Col md={9}>
          <Container>
            <div className="rev-area">
              <Row>
                <Col md={3}>
                  <div className="dash-card-full mt-4">
                    <div className="dash-card" style={{width:"152px"}}>
                      <Row>
                        <Col md={5}>
                          <div className="card-round-full mb-4">
                            <div className="card-round">
                              <BiTrip style={{ fontSize: "30px", color: "white" }} />
                            </div>

                          </div>
                        </Col>
                        <Col md={7} className='d-flex justify-content-center'>
                          <div className="card-headigs">
                            <h5 className='mt-2'>Total Bookings</h5>
                            <div className="card-ddetails">
                              {totalBookings} Bookings
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                  </div>
                </Col>
                <Col md={3}>
                  <div className="dash-card-full mt-4">
                    <div className="dash-card"  style={{width:"152px"}}>
                      <Row>
                        <Col md={5}>
                          <div className="card-round-full mb-4">
                            <div className="card-round">
                              <BiMoneyWithdraw style={{ fontSize: "30px", color: "white" }} />
                            </div>

                          </div>
                        </Col>
                        <Col md={7} className='d-flex justify-content-center'>
                          <div className="card-headigs">
                            <h5 className='mt-2'>Total Revenuie</h5>
                            <div className="card-ddetails">
                              {TotalRevenuie}/-
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                  </div>
                </Col>
                <Col md={3}>
                  <div className="dash-card-full mt-4">
                    <div className="dash-card"  style={{width:"152px"}}>
                      <Row>
                        <Col md={5}>
                          <div className="card-round-full mb-4">
                            <div className="card-round">
                              <BiTimer style={{ fontSize: "30px", color: "white" }} />
                            </div>

                          </div>
                        </Col>
                        <Col md={7} className='d-flex justify-content-center'>
                          <div className="card-headigs">
                            <h5 className='mt-2'>Pending</h5>
                            <div className="card-ddetails">
                              {totalPending} Bookings
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                  </div>
                </Col>
                <Col md={3}>
                  <div className="dash-card-full mt-4">
                    <div className="dash-card"  style={{width:"152px"}}>
                      <Row>
                        <Col md={5}>
                          <div className="card-round-full mb-4">
                            <div className="card-round">
                              <RiFlightLandFill style={{ fontSize: "30px", color: "white" }} />
                            </div>

                          </div>
                        </Col>
                        <Col md={7} className='d-flex justify-content-center'>
                          <div className="card-headigs">
                            <h5 className='mt-2'>Completed</h5>
                            <div className="card-ddetails">
                              {completedBookings} Bookings
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                  </div>
                </Col>

              </Row>
            </div>

            <Row>
              <Chart
                options={state.options}
                series={state.series}
                type="bar"
                className={'w-100 dashboard-chart'}
                height={300}
              />
            </Row>
          </Container>
        </Col>
      </Row>

    </div>
  )
}

export default AdminDashboard