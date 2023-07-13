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
// import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import { DatePicker, Space } from 'antd';
import mapboxAPI from '../../MapBox/MapBoxApi';
import { Select } from 'antd';
function SearchPackage() {
    const [pack, setPack] = useState([])
    const [pkgUrl, setpkgUrl] = useState(null)
    const [allData, setAllData] = useState([])
    const [page, setPage] = useState(1);
    const [date, setDate] = React.useState(null);
    const [price, setPrice] = React.useState('');
    const [dates, setDates] = useState([])

    const { RangePicker } = DatePicker;
    const location = useLocation()
    console.log(location, 'location');
    const [latitude, setLatitude] = useState(location.state.lat )
    const [longitude, setLongitude] = useState(location.state.lng)
    console.log('hiiiii', latitude, longitude);
    const handleSelectPrice = (event) => {
        const selectedPrice = event.target.value;

        // Sort the packages based on the selected price option
        let sortedPackages = [...pack];
        if (selectedPrice === -1) {
            sortedPackages.sort((a, b) => a.cost - b.cost); // Sort in ascending order
        } else if (selectedPrice === 1) {
            sortedPackages.sort((a, b) => b.cost - a.cost); // Sort in descending order
        }

        // Update the state with sorted packages
        setPack(sortedPackages);
        setPrice(selectedPrice);
    };

    const handleChange = (event, value) => {
        setPage(value);
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const key = searchParams.get('key') ?? ""
    const category = searchParams.get('category') ?? ""
    const plan = searchParams.get('plan') ?? ""

console.log();
    // useEffect(() => {
    //     (async function () {
    //         let { data } = await axios.get("/user/search?key=" + key + "&category=" + category + "&plan=" + plan)
    //         console.log(data)
    //         if (data.pkg) {
    //             setPackages(data.packages)
    //             setAllData(data.packages)
    //             setpkgUrl(true)
    //         } else {
    //             setPackages(data.plans)
    //             setpkgUrl(false)
    //         }
    //     })()
    // }, [])


    useEffect(() => {
        if (date) {
            let result = pack?.filter((item) => {
                console.log(item.startDate, new Date(item.startDate) >= new Date(date.start), new Date(item.startDate) <= new Date(date.end))
                console.log(item.startDate, new Date(date.start), new Date(date.end))
                return (
                    new Date(item.startDate) >= new Date(date.start) &&
                    new Date(item.startDate) <= new Date(date.end)
                );
            });
            setPack(result)
        }
    }, [date])

    useEffect(() => {
        if (latitude && longitude) {
            axios
                .get('/user/search')
                .then((response) => {
                    const packages = response.data.packages;
                    const promises = packages.map((mechanic) => {
                        const location = mechanic.destination;
                        console.log('loc', mechanic.destination);

                        return mapboxAPI.get(
                            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`,
                            {
                                params: {
                                    access_token: 'pk.eyJ1Ijoic2hpamFzMDkiLCJhIjoiY2xpaXUyZHQzMDFzeDNlcGEwbHd6ejJmOCJ9.TZzIUmMeUTVSKfdqqSWgWg',
                                    limit: 1,
                                },
                            }
                        ).then((geocodingResponse) => {
                            const features = geocodingResponse.data.features;
                            if (features.length > 0) {
                                const coordinates = features[0].geometry.coordinates;
                                const userLocation = [longitude, latitude];
                                const distance = calculateDistance(userLocation, coordinates);
                                console.log('hello', distance);
                                if (distance <= 200000) {
                                    mechanic.distance = (distance / 1000).toFixed(1);
                                    console.log("DISTANCE :", mechanic);
                                    return mechanic;
                                }
                            }
                            return null;
                        });
                    });

                    Promise.all(promises)
                        .then((results) => {
                            const filteredMechanics = results.filter((mechanic) => mechanic !== null);
                            setPack([...pack, ...filteredMechanics]);
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        }
    }, [latitude, longitude]);

    function calculateDistance(coord1, coord2) {
        const [lon1, lat1] = coord1;
        const [lon2, lat2] = coord2;

        const R = 6371;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance * 1000;
    }


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
                        {/* <FormControl sx={{ minWidth: 120, height: "10px" }} size="small">
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
                        </FormControl> */}
                        <Select
                            defaultValue="Price"
                            style={{ width: 120 }}
                            onChange={handleSelectPrice}
                            options={[
                                { value: -1, label: "Low to High" },
                                { value: 1, label: 'High to Low' },
                            ]}
                        />
                        <Space direction="vertical" size={12}>
                            <RangePicker onChange={(data) => setDate({ start: new Date(data[0]), end: new Date(data[1]) })} />
                        </Space>
                    </div>


                </Row>
                <Row>
                    {
                        pack?.map((item) => {

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
                                        <Link to={'/package-details/' + item._id} >
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