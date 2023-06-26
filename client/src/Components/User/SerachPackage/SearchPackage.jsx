import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavBar from '../NavBar/NavBar'
import { useLocation } from 'react-router-dom';


function SearchPackage() {
    const location = useLocation();
    const packages = location.state?.searchResults || [];
    return (
        <div>
            <Row>
                <NavBar></NavBar>
            </Row>
            <Container>
                <Row>
                    <div className="package-heading ms-4 mt-5 mb-4">
                        Explore Your Top Packages
                    </div>
                </Row>
                <Row>
                    {
                        packages.map((item) => {

                            return <Col md={3} className=" d-flex justify-content-center pkg-card">
                                <div className="packages himalaya" style={{ backgroundImage: `url(${baseImgUrl + item.mainImage[0].filename})` }}>

                                    <Row>
                                        <Col md={6} className=" d-flex justify-content-start">
                                            <h5 className='package-details'>{item.destination}</h5>
                                        </Col>
                                        <Col md={6} className=" d-flex justify-content-end">
                                            <h5 className='package-details'>{item.cost}/-</h5>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <span className=' package-info'>
                                            {item.description}
                                        </span>

                                    </Row>
                                    <Row>
                                        <div className="package-btn d-flex justify-content-center mt-2">
                                            <Button className='w-100' variant="contained" style={{ backgroundColor: "white", color: "#1a6795", height: "27px" }}>View Package</Button>
                                        </div>
                                    </Row>
                                </div>
                            </Col>



                        })
                    }
                </Row>
            </Container>
        </div>
    )
}

export default SearchPackage