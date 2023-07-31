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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function PackageView() {
    const [packages, setPackages] = useState([])
    const [value, setValue] = useState('');
    const [images, setImages] = useState([])
    const [steps, setSteps] = useState([]);
    const [showBookNow, setShowBookNow] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [reviewer, setreviewer] = useState(null)
    const [review, setReviews] = useState('')
    const [userReview, setUSerReview] = useState('')
    const [rating, setRating] = useState(null)
    const [activeStep, setActiveStep] = React.useState(0);
    const [open, setOpen] = useState(false);
    const [snackPos, setsnackPos] = React.useState({

        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal } = snackPos;
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    let { user } = useSelector((state) => {
        return state
    })

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
    const handleClickVariant = (variant) => () => {
        enqueueSnackbar('Thank You for your Feedback!', { variant });
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
    }, [review])
    const formattedStartDate = new Date(packages.startDate).toLocaleDateString();
    const formattedEndDate = new Date(packages.endDate).toLocaleDateString()


    async function addReview() {
        if (review == '') {
            let message = 'Enter your expirience'
        } else {

            let { data } = await axios.post("/user/add-review", { review, id, userId, value })
            if (!data.err) {
                setOpen(true)
            }
        }
    }
    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/user/get-userReview?packageId=" + id)
            if (!data.err) {
                setUSerReview(data.review)
                setRating(data.review?.[0].rating)
            }
        })()
    }, []
    )

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    async function handleChat(agentId, userId) {
        console.log(agentId);
        let reciverId = agentId
        let senderId = userId
        let { data } = await axios.post("/chat", { senderId, reciverId })
        if(!data.err){
            console.log('hii');
            <Link to={'/chat'}/>
        }
    }
    return (
        <>
            <NavBar />
            <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseSnackBar} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Thank you for your feedback
                </Alert>
            </Snackbar>

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
                                    {packages?.name}
                                </h4>
                                <div className="d-flex flex-row my-3">

                                    <span className="text-muted">  {packages?.agencyId?.name.toUpperCase()}

                                    </span>

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
                                    <div className="row">
                                        {userReview.length > 0 ?
                                            (
                                                <>
                                                    <h4 className='mt-4 reviewerName'>
                                                        {userReview[0]?.userId.name}
                                                    </h4>
                                                    <div className='reviewer mt-2 mb-0'>
                                                        <h4>
                                                            {userReview[0]?.review}
                                                        </h4>
                                                    </div>
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={rating}

                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <h4 className='mt-4 reviewerName'>
                                                        No User Reviewed
                                                    </h4>
                                                    <div className='reviewer mt-2 mb-0'>
                                                        <h4>
                                                            No Reviews
                                                        </h4>
                                                    </div>
                                                </>
                                            )
                                        }

                                    </div>
                                </div>

                                <hr />
                                {reviewer ?
                                    <>

                                        <div className="row mb-3">
                                            <TextField
                                                id="outlined-textarea"
                                                label="Give your feedback"
                                                placeholder="Placeholder"
                                                multiline
                                                onChange={(e) => { setReviews(e.target.value.trim()) }}
                                            />
                                        </div>
                                        <div className="row mb-3">
                                            <Rating
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                            />
                                        </div>

                                        <Button onClick={addReview}>Add Review</Button>
                                    </>
                                    : <>
                                    </>

                                }

                                <div className="book-pkg-and-chat">
                                    <div>
                                        <button className='bookpkgbtn' onClick={() => setShowBookNow(true)} > Book Package </button>
                                    </div>
                                    <div >
                                        <button className='bookpkgbtn' onClick={() => handleChat(packages.agencyId._id, userId)}> Chat for more Enquiries</button>
                                    </div>
                                </div>


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