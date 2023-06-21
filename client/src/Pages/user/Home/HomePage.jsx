import React from 'react'
import NavBar from '../../../Components/User/NavBar/NavBar'
import './Home.css'
import { Col, Container, Row } from 'react-bootstrap'
import Button from '@mui/material/Button';
function HomePage() {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className='home-main'>
            <Row>
                <NavBar></NavBar>
            </Row>
            <Row>
                <div className="home-img">


                    <div className="search-bar">
                        {/* <Row >
                            <Col md={1} className=''>
                                <div className="location-search-icon">
                                    <BiPaperPlane className='search-icon' />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="location-search">
                                    <input type="text" />
                                </div>
                            </Col>
                        </Row> */}

                    </div>
                </div>
                <div className="wave-img">
                    <svg width="100%" height="30%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 48.84924264453197,229.25336382140685 97.69848528906394,258.5067276428137 150,263 C 202.30151471093606,267.4932723571863 258.0553014882762,247.226453250152 302,220 C 345.9446985117238,192.773546749848 378.0803087578313,158.5874593565783 429,160 C 479.9196912421687,161.4125406434217 549.6234634803985,198.4237093235348 596,219 C 642.3765365196015,239.5762906764652 665.4258373205741,243.71770334928232 702,230 C 738.5741626794259,216.28229665071768 788.6731872373049,184.70547727933592 841,178 C 893.3268127626951,171.29452272066408 947.881413730207,189.46038753337388 999,215 C 1050.118586269793,240.53961246662612 1097.8011578418675,273.4529725871686 1144,263 C 1190.1988421581325,252.54702741283145 1234.9139549023234,198.72772211795186 1284,181 C 1333.0860450976766,163.27227788204814 1386.5430225488383,181.63613894102406 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="#ffffff" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
                </div>

            </Row>
            <Row>

                <Container fluid>
                    <div className="category-sec mt-5">
                        <Row >    <h3 className='category-head ms-4 mt-5 '>Categories</h3></Row>
                        <Row className='pt-3'>
                            <Col md={2} className="d-flex justify-content-center each-cat">
                                <div className="cat-img img1">

                                </div>
                                <h3 className='each-cat-head'>Adventure</h3>
                            </Col>
                            <Col md={2} className="d-flex justify-content-center each-cat">
                                <div className="cat-img img2"> </div>
                                <h3 className='each-cat-head'>City Tour</h3>
                            </Col>
                            <Col md={2} className="d-flex justify-content-center each-cat">
                                <div className="cat-img img3"> </div>
                                <h3 className='each-cat-head'>Nature</h3>
                            </Col>
                            <Col md={2} className="d-flex justify-content-center each-cat">
                                <div className="cat-img img4"> </div>
                                <h3 className='each-cat-head'>Desert</h3>
                            </Col>
                            <Col md={2} className="d-flex justify-content-center each-cat">
                                <div className="cat-img img5"> </div>
                                <h3 className='each-cat-head'>Occens</h3>
                            </Col>
                            <Col md={2} className="d-flex justify-content-center each-cat">
                                <div className="cat-img img6"> </div>
                                <h3 className='each-cat-head'>Snow</h3>
                            </Col>



                        </Row>
                    </div>
                </Container>
                <Container>
                    <Row>
                        <div className="package-heading ms-4 mt-5 mb-4">
                            Explore Your Top Packages
                        </div>
                    </Row>
                    <Row>
                
                        <Col md={3} className=" d-flex justify-content-center pkg-card">
                            <div className="packages himalaya">
                                <Row>
                                    <Col md={6} className=" d-flex justify-content-start">
                                        <h5 className='package-details'>Himalaya</h5>
                                    </Col>
                                    <Col md={6} className=" d-flex justify-content-end">
                                        <h5 className='package-details'>25,999/-</h5>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className=' package-info'>
                                        Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place
                                    </span>

                                </Row>
                                <Row>
                                    <div className="package-btn d-flex justify-content-center mt-2">
                                    <Button className='w-100' variant="contained" style={{backgroundColor:"white",color:"#1a6795",height:"27px"}}>View Package</Button>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                        <Col md={3} className=" d-flex justify-content-center pkg-card">
                            <div className="packages himalaya">
                                <Row>
                                    <Col md={6} className=" d-flex justify-content-start">
                                        <h5 className='package-details'>Himalaya</h5>
                                    </Col>
                                    <Col md={6} className=" d-flex justify-content-end">
                                        <h5 className='package-details'>25,999/-</h5>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className=' package-info'>
                                        Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place
                                    </span>

                                </Row>
                                <Row>
                                    <div className="package-btn d-flex justify-content-center mt-2">
                                    <Button className='w-100' variant="contained" style={{backgroundColor:"white",color:"#1a6795",height:"27px"}}>View Package</Button>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                        <Col md={3} className=" d-flex justify-content-center pkg-card">
                            <div className="packages himalaya">
                                <Row>
                                    <Col md={6} className=" d-flex justify-content-start">
                                        <h5 className='package-details'>Himalaya</h5>
                                    </Col>
                                    <Col md={6} className=" d-flex justify-content-end">
                                        <h5 className='package-details'>25,999/-</h5>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className=' package-info'>
                                        Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place
                                    </span>

                                </Row>
                                <Row>
                                    <div className="package-btn d-flex justify-content-center mt-2">
                                    <Button className='w-100' variant="contained" style={{backgroundColor:"white",color:"#1a6795",height:"27px"}}>View Package</Button>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                        <Col md={3} className=" d-flex justify-content-center pkg-card">
                            <div className="packages himalaya">
                                <Row>
                                    <Col md={6} className=" d-flex justify-content-start">
                                        <h5 className='package-details'>Himalaya</h5>
                                    </Col>
                                    <Col md={6} className=" d-flex justify-content-end">
                                        <h5 className='package-details'>25,999/-</h5>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className=' package-info'>
                                        Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place
                                    </span>

                                </Row>
                                <Row>
                                    <div className="package-btn d-flex justify-content-center mt-2">
                                    <Button className='w-100' variant="contained" style={{backgroundColor:"white",color:"#1a6795",height:"27px"}}>View Package</Button>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                      
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <div className="package-heading ms-4 mt-5 mb-4">
                            Get Your Favorite Adventures
                        </div>
                    </Row>
                    <Row>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                            <div className="plans sky">
                            <Row>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>Sky Dive</h3>
                                    </Col>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>99,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className='p-5 plan-info mt-3'>
                                        Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place
                                    </span>

                                </Row>
                            </div>
                        </Col>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                            <div className="plans dj">
                            <Row>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>DJ Nights</h3>
                                    </Col>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>5,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className='p-5 plan-info mt-3'>
                                        Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place
                                    </span>

                                </Row>
                            </div>
                        </Col>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                            <div className="plans trucking">
                            <Row>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>Trucking</h3>
                                    </Col>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>8,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className='p-5 plan-info mt-3'>
                                        Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place
                                    </span>

                                </Row>
                            </div>
                        </Col>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                            <div className="plans campfire">
                            <Row>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>Camp Fire</h3>
                                    </Col>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>4,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className='p-5 plan-info mt-3'>
                                        Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place
                                    </span>

                                </Row>
                            </div>
                        </Col>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                            <div className="plans desert">
                            <Row>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>Desert Safari</h3>
                                    </Col>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>59,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className='p-5 plan-info mt-3'>
                                        Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place
                                    </span>

                                </Row>
                            </div>
                        </Col>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                            <div className="plans sea">
                            <Row>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>Sea Drive</h3>
                                    </Col>
                                    <Col md={6} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>45,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className='p-5 plan-info mt-3'>
                                        Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place Dubai Trip With Ten nights and Ten days
                                        with most our crew and whole the bookings
                                        included bhurj khalifa bhurj al arab and
                                        other more place
                                    </span>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <div className="package-heading ms-4 mt-5 mb-4">
                            Exprirince Your Best Tour With us
                        </div>
                    </Row>
                    <Row>
                        <div className="banner-sec d-flex justify-content-center mb-5 ">
                            <div className="agency-banner">

                            </div>
                        </div>

                    </Row>

                </Container>
            </Row>



        </div>

    )
}

export default HomePage