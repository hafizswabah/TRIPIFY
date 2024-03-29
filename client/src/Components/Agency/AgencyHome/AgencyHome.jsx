import React, { useEffect, useState } from 'react'
import AgencyHeader from '../Header/AgencyHeader'
import AgencySidebar from '../SideBar/AgencySidebar'
import { Row, Col, Container } from 'react-bootstrap'
import { BiTrip, BiMoneyWithdraw, BiTimer } from "react-icons/bi";
import { RiFlightLandFill } from "react-icons/ri";
import './AgencyHome.css'
import Chart from "react-apexcharts";
import axios from 'axios';
function AgencyHome() {
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
        setmonthlyData(data.monthlyData)
        setPackageBookedAmount(data.PackageBookedAmount)
        setPlanBookedAmount(data.PlanBookedAmount)
        setcompletedTripsCount(data.completedTripsCount[0].count)
        setpendingTripsCount(data.pendingTripsCount[0].count)
        settotalTripCount(data.totalTripCount)
        setcompletedPlansCount(data.completedPlansCount[0].count)
        settotalPlanCount(data.totalPlanCount)
      }

    })()
  }, [])
  let TotalRevenuie = PackageBookedAmount + PlanBookedAmount;
  let totalBookings = totalTripCount + totalPlanCount
  console.log(totalPlanCount);
  console.log(totalTripCount);
  console.log(pendingPlanCount);
  console.log(pendingTripsCount);
  console.log(monthlyData);
  let totalPending = pendingPlanCount + pendingTripsCount
  let completedBookings = completedPlansCount + completedTripsCount
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
      <AgencyHeader handleClick={handleClick} />
      <Row>
        <Col md={3}>
          <AgencySidebar page={'dashboard'} clicked={clicked} />
        </Col>
        <Col md={9}>
          <Container>
            <div className="rev-area">
              <Row>
                <Col md={3}>
                  <div className="dash-card-full mt-4">
                    <div className="dash-card">
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
                    <div className="dash-card">
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
                    <div className="dash-card">
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
                    <div className="dash-card">
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

export default AgencyHome