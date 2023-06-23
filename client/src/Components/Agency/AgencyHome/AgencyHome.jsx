import React, { useState } from 'react'
import AgencyHeader from '../Header/AgencyHeader'
import AgencySidebar from '../SideBar/AgencySidebar'
import { Row, Col, Container } from 'react-bootstrap'
import { BiTrip,BiMoneyWithdraw,BiTimer} from "react-icons/bi";
import './AgencyHome.css'
import Chart from "react-apexcharts";
function AgencyHome() {
  const [clicked, setCLicked] = useState(false)
  const handleClick = () => {
    setCLicked(!clicked)
  }
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
        data: ['85','45','55','75','45','5','25','45','65','15','55','95',]
      }
    ]
  };
  return (
    <div>
      <AgencyHeader handleClick={handleClick} />
      <Row>
        <Col md={3}>
          <AgencySidebar page={'dashboard'} clicked={clicked} />
        </Col>
        <Col md={8}>
          <Container>
            <Row>
              <Col md={4}>
                <div className="dash-card-full mt-4">
                  <div className="dash-card">
                    <Row>
                      <Col md={5}>
                        <div className="card-round-full mb-4">
                          <div className="card-round">
                          <BiTrip style={{fontSize:"30px",color:"white"}}/>
                          </div>

                        </div>
                      </Col>
                      <Col md={7} className='d-flex justify-content-center'>
                        <div className="card-headigs">
                          <h5 className='mt-2'>Total Trips</h5>
                          <div className="card-ddetails">
                            5 Trips
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                </div>
              </Col>
              <Col md={4}>
                <div className="dash-card-full mt-4">
                  <div className="dash-card">
                    <Row>
                      <Col md={5}>
                        <div className="card-round-full mb-4">
                          <div className="card-round">
                          <BiMoneyWithdraw style={{fontSize:"30px",color:"white"}}/>
                          </div>

                        </div>
                      </Col>
                      <Col md={7} className='d-flex justify-content-center'>
                        <div className="card-headigs">
                          <h5 className='mt-2'>Reveniue</h5>
                          <div className="card-ddetails">
                            99,999/-
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                </div>
              </Col>
              <Col md={4}>
                <div className="dash-card-full mt-4">
                  <div className="dash-card">
                    <Row>
                      <Col md={5}>
                        <div className="card-round-full mb-4">
                          <div className="card-round">
                          <BiTimer style={{fontSize:"30px",color:"white"}}/>
                          </div>

                        </div>
                      </Col>
                      <Col md={7} className='d-flex justify-content-center'>
                        <div className="card-headigs">
                          <h5 className='mt-2'>Pending</h5>
                          <div className="card-ddetails">
                            1 Trip
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                </div>
              </Col>

            </Row>
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