import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavBar from '../NavBar/NavBar'
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { baseImgUrl } from '../../../urls';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function SearchPackage() {
    const [packages, setPackages] = useState([])
    const [page, setPage] =useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const key = searchParams.get('key') ?? ""
    const category = searchParams.get('category') ?? ""
    const plan = searchParams.get('plan') ?? ""
    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/user/search?key=" + key + "&category=" + category + "&plan=" + plan)
            console.log(data)
            if (data.pkg) {
                setPackages(data.packages)
            } else {
                setPackages(data.plans)
            }
        })()
    }, [])


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
                                            <h5 className='package-details'>{item.name}</h5>
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
                <Row>
                    <div className="pagination d-flex justify-content-center pt-5">
                        <Stack spacing={2}>
                            <Typography>Page: {page}</Typography>
                            <Pagination count={10} page={page} onChange={handleChange} />
                        </Stack>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default SearchPackage