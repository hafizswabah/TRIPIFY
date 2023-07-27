import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { baseImgUrl } from '../../../urls'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './packageView.css'
import Rating from '@mui/material/Rating';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import ImageViewer from '../ImageViewer/ImageViewer'
import InputAdornment from '@mui/material/InputAdornment';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BookNow from '../../../modal/Booking/BookiNow'
import NavBar from '../NavBar/NavBar'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';
function PackageView() {
    const [packages, setPackages] = useState([])
    const [value, setValue] = useState('');
    const [images, setImages] = useState([])
    const [steps, setSteps] = useState([]);
    const [showBookNow, setShowBookNow] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [reviewer, setreviewer] = useState(null)
    const [review, setReviews] = useState('')
    const [activeStep, setActiveStep] = React.useState(0);
    let { user } = useSelector((state) => {
        return state
    })
    console.log(user);
    let userId = user.details._id
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const { id } = useParams()
    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/user/package-view/" + id)
            if (!data.err) {
                setPackages(data.packages)
                let subImages = data.packages.subImages.map(item => {
                    return { label: item.name, imgPath: baseImgUrl + item.filename }
                })
                setImages([{ label: data.packages.name, imgPath: baseImgUrl + data.packages.mainImage[0].filename }, ...subImages])
                const dayDetails = data.packages.dayDetails;
                const newSteps = dayDetails.map((day, index) => ({
                    label: `Trip Day ${index + 1}`,
                    description: day.description,
                }));
                setSteps(newSteps);
            }
        })()
    }, [])
    useEffect(() => {
        (async function () {
            let { data } = await axios.get(`/user/check-reviewer?userId=${userId}&PackageId=${id}`)
            if (!data.err) {
                setreviewer(data.reviewer)
            }
        })()
    }, [])
    const formattedStartDate = new Date(packages.startDate).toLocaleDateString();
    const formattedEndDate = new Date(packages.endDate).toLocaleDateString()


    async function addReview() {

        if (review == '') {
            let message = 'Enter your expirience'
        } else {
            let { data } = await axios.post("/user/add-review",{review})
        }
    }



    return (
        <>
            <NavBar />
            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="">
                            <div className=" rounded-4 mb-3 d-flex justify-content-center">

                                {
                                    images &&
                                    <ImageViewer data={images} />
                                }
                            </div>


                        </aside>
                    </div>
                    <Row>
                        <Col lg={6}>
                            <div className="stepers m-5">
                                <Stepper activeStep={activeStep} orientation="vertical">
                                    {steps.map((step, index) => (
                                        <Step key={step.label}>
                                            <StepLabel
                                                optional={
                                                    index === 2 ? (
                                                        <Typography variant="caption">Last step</Typography>
                                                    ) : null
                                                }
                                            >
                                                {step.label}
                                            </StepLabel>
                                            <StepContent>
                                                <Typography style={{ fontSize: "11px", fontWeight: '400' }}>{step.description}</Typography>
                                                <Box sx={{ mb: 2 }}>
                                                    <div>
                                                        <Button
                                                            variant="contained"
                                                            onClick={handleNext}
                                                            sx={{ mt: 1, mr: 1 }}
                                                        >
                                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                        </Button>
                                                        <Button
                                                            disabled={index === 0}
                                                            onClick={handleBack}
                                                            sx={{ mt: 1, mr: 1 }}
                                                        >
                                                            Back
                                                        </Button>
                                                    </div>
                                                </Box>
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>
                                {activeStep === steps.length && (
                                    <Paper square elevation={0} sx={{ p: 3 }}>
                                        <Typography style={{ fontSize: "14px", fontWeight: '600' }}>Complted Your Journey OverView</Typography>
                                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                            Reset
                                        </Button>
                                    </Paper>
                                )}
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                    {packages.name}
                                </h4>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">

                                        <Rating
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <span className="h5">{packages.cost}₹</span>
                                    <span className="text-muted">/per head</span>
                                </div>

                                <p className='pkg-desc'>{packages.description}</p>

                                <div className="row">
                                    <dt className="col-3 pkg-det">Destination:</dt>
                                    <dd className="col-9 pkg-details">{packages.destination}</dd>
                                    <dt className="col-3 pkg-det">Date:</dt>
                                    <dd className="col-9 pkg-details">{formattedStartDate} to {formattedEndDate}</dd>

                                    <dt className="col-3 pkg-det">Duration</dt>
                                    <dd className="col-9 pkg-details">{packages.duration}</dd>

                                    <dt className="col-3 pkg-det">Visit Places</dt>
                                    <dd className="col-9 pkg-details">{packages.visitPlaces}</dd>

                                    <dt className="col-3 pkg-det">Flight Bookings</dt>
                                    <dd className="col-9 pkg-details">{packages.flightbooking ? 'Inluded Flight Tickets' : 'No Flight Tickets'}</dd>
                                    <dt className="col-3 pkg-det">Stay Bookings</dt>
                                    <dd className="col-9 pkg-details">{packages.staybooking ? 'Inluded Stay Tickets' : 'No Stay Booking Included'}</dd>
                                    <dt className="col-3 pkg-det">Slots Remaining</dt>
                                    <dd className="col-9 pkg-details">{packages.totalSlots}</dd>
                                </div>

                                <hr />
                                {reviewer ?
                                    <>
                                        <div className="row mb-3">
                                            <Rating
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                            />
                                        </div>
                                        <div className="row mb-3">
                                            <TextField
                                                id="outlined-textarea"
                                                label="Give your feedback"
                                                placeholder="Placeholder"
                                                multiline
                                                onChange={(e) => { setReviews(e.target.value.trim()) }}
                                            />
                                        </div>

                                        <Button onClick={addReview}>Add Review</Button>
                                    </>
                                    : <>
                                    </>

                                }

                                <div className="row mb-4">

                                </div>
                                <button className='bookpkgbtn' onClick={() => setShowBookNow(true)} > Book Package </button>
                            </div>
                        </Col>

                    </Row>
                </div>
            </section>
            {
                showBookNow &&
                <BookNow setShowBookNow={setShowBookNow} refresh={refresh} setRefresh={setRefresh} packages={packages} />
            }

        </>
    )
}

export default PackageView