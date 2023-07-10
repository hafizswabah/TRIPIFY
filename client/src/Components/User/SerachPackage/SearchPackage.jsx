import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavBar from '../NavBar/NavBar'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { baseImgUrl } from '../../../urls';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import { DatePicker, Space } from 'antd';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';

function SearchPackage() {
    const [packages, setPackages] = useState([])
    const [pkgUrl, setpkgUrl] = useState(null)
    const [allData, setAllData] = useState([])
    const [page, setPage] = useState(1);
    const [date, setDate] = React.useState(null);
    const [price, setPrice] = React.useState('');
    const [dates, setDates] = useState([])
    const { RangePicker } = DatePicker;
    console.log(date)

    const handleSelectPrice = (event) => {
        const selectedPrice = event.target.value;

        // Sort the packages based on the selected price option
        let sortedPackages = [...packages];
        if (selectedPrice === -1) {
            sortedPackages.sort((a, b) => a.cost - b.cost); // Sort in ascending order
        } else if (selectedPrice === 1) {
            sortedPackages.sort((a, b) => b.cost - a.cost); // Sort in descending order
        }

        // Update the state with sorted packages
        setPackages(sortedPackages);
        setPrice(selectedPrice);
    };

    const handleChange = (event, value) => {
        setPage(value);
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const key = searchParams.get('key') ?? ""
    const category = searchParams.get('category') ?? ""
    const plan = searchParams.get('plan') ?? ""
    const filteredBookings = packages.filter((item) => {
        if (date === 'all') {
            return true;
        }
        return item.startDate === date;
    });

    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/user/search?key=" + key + "&category=" + category + "&plan=" + plan)
            console.log(data)
            if (data.pkg) {
                setPackages(data.packages)
                setAllData(data.packages)
                setpkgUrl(true)
            } else {
                setPackages(data.plans)
                setpkgUrl(false)
            }
        })()
    }, [])


    useEffect(() => {
        if (date) {
            let result = allData.filter((item) => {
                console.log(item.startDate, new Date(item.startDate) >= new Date(date.start), new Date(item.startDate) <= new Date(date.end))
                console.log(item.startDate, new Date(date.start), new Date(date.end))
                return (
                    new Date(item.startDate) >= new Date(date.start) &&
                    new Date(item.startDate) <= new Date(date.end)
                );
            });
            setPackages(result)
        }
    }, [date])
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
                    <div className='d-flex justify-content-end' style={{ gap: "5px" }}>
                        <Space direction="vertical" size={12}>
                            <RangePicker onChange={(data) => setDate({ start: new Date(data[0]), end: new Date(data[1]) })} />
                        </Space>
                        <FormControl sx={{ minWidth: 120 }} size="small" style={{ height: "10px" }}>
                            <InputLabel id="demo-select-small-label">Price</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={price}
                                label="Age"
                                onChange={handleSelectPrice}
                            >
                                <MenuItem value={-1}>Low to high</MenuItem>
                                <MenuItem value={1}>High to low</MenuItem>
                            </Select>
                        </FormControl>
              

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
                                        <Link to={pkgUrl ? `/package-details/${item._id}` : `/plan-details/${item._id}`}>
                                            <Button className='w-100' variant="contained" style={{ backgroundColor: "white", color: "#1a6795", height: "27px" }}>View Package</Button>
                                        </Link>
                                    </Row>
                                </div>
                            </Col>



                        })
                    }
                </Row>
                {/* <Row>
                    <div className="pagination d-flex justify-content-center pt-5">
                        <Stack spacing={2}>
                            <Typography>Page: {page}</Typography>
                            <Pagination count={10} page={page} onChange={handleChange} />
                        </Stack>
                    </div>
                </Row> */}
            </Container>
        </div>
    )
}

export default SearchPackage