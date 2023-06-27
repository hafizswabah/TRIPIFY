import { React, useEffect, useState } from 'react'
import NavBar from '../../../Components/User/NavBar/NavBar'
import './Home.css'
import { Col, Container, Row } from 'react-bootstrap'
import Button from '@mui/material/Button';
import axios from 'axios';
import { baseImgUrl } from '../../../urls';
import TextField from '@mui/material/TextField';
import { Link, Navigate, useNavigate } from 'react-router-dom';


function HomePage() {
    const [age, setAge] = useState('');
    const [packages, setPackages] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/user/get-pkg")

            if (!data.err) {
                setPackages(data.packages)
            }
        }

        )()
    }, [refresh])



    const handleSearch = async (key) => navigate("/search-package?key=" + key)


    return (
        <div className='home-main'>
            <Row>
                <NavBar></NavBar>
            </Row>
            <Row>
                <div className="home-img">
                 <div className="headings  mt-5 pt-5 d-flex flex-column">
                    <h1 className='text-center main-head'>Explore the World With Us</h1>
                    <h6 className='text-center mt-2 main-sub-head'>Get Best Travel Packages With Tripify</h6>
                 </div>
                    <div className="search-bar">
                        <Row>
                            <Col md={1} >
                                <div className="search-img">

                                </div>
                            </Col>
                            <Col md={9} className='d-flex justify-content-center align-items-center'>
                                <input className='search-input w-75'
                                    onChange={(e) => { setSearch(e.target.value) }} />
                            </Col>
                            <Col md={2}>
                                <Button onClick={() => { handleSearch(search) }}>Search</Button>
                            </Col>
                        </Row>

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
                                <Link to={"/search-package?category=adventure"}>
                                    <div className="cat-img img1">
                                    </div>
                                </Link>
                                <h3 className='each-cat-head'>Adventure</h3>
                            </Col>
                            <Col md={2} className="d-flex justify-content-center each-cat">
                                <Link to={"/search-package?category=city"}>
                                    <div className="cat-img img2"> </div>
                                </Link>
                                <h3 className='each-cat-head'>City Tour</h3>
                            </Col>
                            <Col md={2} className="d-flex justify-content-center each-cat">
                                <Link to={"search-package?category=nature"}>
                                    <div className="cat-img img3"> </div>
                                </Link>
                                <h3 className='each-cat-head'>Nature</h3>
                            </Col>
                            <Col md={2} className="d-flex justify-content-center each-cat">
                                <Link to={"search-package?category=desert"}>
                                    <div className="cat-img img4"> </div>
                                </Link>
                                <h3 className='each-cat-head'>Desert</h3>
                            </Col>
                            <Col md={2} className="d-flex justify-content-center each-cat">
                                <Link to={"search-package?category=desert"}>
                                    <div className="cat-img img5"> </div>
                                </Link>
                                <h3 className='each-cat-head'>Occens</h3>
                            </Col>
                            <Col md={2} className="d-flex justify-content-center each-cat">
                                <Link to={"search-package?category=snow"}>
                                    <div className="cat-img img6"> </div>
                                </Link>
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
                <Container>
                    <Row>
                        <div className="package-heading ms-4 mt-5 mb-4">
                            Get Your Favorite Adventures
                        </div>
                    </Row>
                    <Row>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                        <Link to={"search-package?plan=skydive"}>
                            <div className="plans sky">
                                <Row>
                                    <Col md={5} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>Sky Dive</h3>
                                    </Col>
                                    <Col md={7} className=" d-flex justify-content-center mt-3">
                                    
                                        <h3 className='plan-rate'>Starting @55,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <span className='plan-info mt-4 p-5 pt-0'>

                                        Experience the ultimate rush of freedom as you soar through the sky,
                                        defying gravity with each heart-pounding moment. Sky Dive, the epitome of adrenaline-fueled adventure,
                                        beckons you to embrace the extraordinary. Imagine the exhilaration as you leap from a plane, plunging into a world of endless possibilities.
                                        The wind rushes past you, creating a symphony of excitement that resonates deep within your soul.
                                        Your heart beats with anticipation
                                    </span>


                                </Row>
                            </div>
                            </Link>
                        </Col>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                        <Link to={"search-package?plan=skydive"}>
                            <div className="plans dj">
                                <Row>
                                    <Col md={5} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>DJ Nights</h3>
                                    </Col>
                                    <Col md={7} className=" d-flex justify-content-center mt-3">
                                    <h3 className='plan-rate'>Starting @1,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className='p-5 plan-info mt-4 pt-0'>
                                        Step into a world where music pulses through the air,
                                        creating a vibrant symphony that moves your body and ignites your spirit.
                                        DJ Night, a euphoric celebration of beats and melodies, invites you to immerse
                                        yourself in a nocturnal extravaganza that will leave you craving for more.
                                        The bass reverberates through your core, syncing with the rhythm of your heartbeat.
                                    </span>

                                </Row>
                            </div>
                            </Link>
                        </Col>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                        <Link to={"search-package?plan=skydive"}>
                            <div className="plans desert">
                                <Row>
                                    <Col md={5} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>Desert Safari</h3>
                                    </Col>
                                    <Col md={7} className=" d-flex justify-content-center mt-3">
                                    <h3 className='plan-rate'>Starting @25,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className='p-5 plan-info mt-3'>
                                        Desert Safari is an invitation to connect with the raw beauty of nature,
                                        to embrace the serenity of the desert, and to create memories that will last a lifetime.
                                        It's a journey of discovery, where you find solace in the simplicity of the vast desert
                                        landscape and awaken your spirit to the untamed wonders that lie beyond the city's hustle and bustle.
                                    </span>

                                </Row>
                            </div>
                            </Link>
                        </Col>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                        <Link to={"search-package?plan=skydive"}>
                            <div className="plans sea">
                                <Row>
                                    <Col md={5} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>Sea Drive</h3>
                                    </Col>
                                    <Col md={7} className=" d-flex justify-content-center mt-3">
                                    <h3 className='plan-rate'>Starting @15,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className='p-5 plan-info mt-3'>
                                        Sea Drive is more than just a journey;
                                        it's an invitation to connect with the raw power and breathtaking beauty of the ocean.
                                        It's an opportunity to immerse yourself in nature's embrace,
                                        to witness the harmony of life beneath the waves,
                                        and to cultivate a profound appreciation for the fragile
                                        ecosystem that exists beneath the surface. Get Your Sloats

                                    </span>

                                </Row>
                            </div>
                            </Link>
                        </Col>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                        <Link to={"search-package?plan=skydive"}>
                            <div className="plans trucking">
                                <Row>
                                    <Col md={5} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>Trucking</h3>
                                    </Col>
                                    <Col md={7} className=" d-flex justify-content-center mt-3">
                                    <h3 className='plan-rate'>Starting @4,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className='p-5 plan-info mt-3'>
                                        Trucking to the Mountain is just a thrilling ride;
                                        it's an immersive experience that connects you with the raw power and majesty of the natural world.
                                        It's an opportunity to leave the constraints of daily life behind, to embrace the freedom of the open road,
                                        and to witness firsthand the awe-inspiring beauty that lies beyond the urban landscape.Book Your Slot with Our Expirienced Trainers
                                    </span>

                                </Row>
                            </div>
                            </Link>
                        </Col>
                        <Col md={6} className=" d-flex justify-content-center mb-5">
                        <Link to={"search-package?plan=skydive"}>
                            <div className="plans campfire">
                                <Row>
                                    <Col md={5} className=" d-flex justify-content-center mt-3">
                                        <h3 className='plan-details'>Camp Fire</h3>
                                    </Col>
                                    <Col md={7} className=" d-flex justify-content-center mt-3">
                                    <h3 className='plan-rate'>Starting @2,999/-</h3>
                                    </Col>
                                </Row>
                                <Row>

                                    <span className='p-5 plan-info mt-3'>
                                        Campfire is more than just a gathering of flames; it's a timeless ritual that connects us to nature,
                                        to each other, and to the depths of our own souls. It's a place where stories are shared, laughter is born,
                                        and memories are etched into the fabric of our lives.so get your tickets as soon as possible
                                    </span>

                                </Row>
                            </div>
                            </Link>
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