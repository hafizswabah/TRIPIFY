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
import NavBar from '../NavBar/NavBar'
import { useSelector } from 'react-redux'
import BookNow from '../../../modal/Booking/BookiNow'
import PlanBookNow from '../../../modal/Booking/PlanBookNow'
function PlanView() {
    const [plans, setPlans] = useState([])
    const [value, setValue] = useState('');
    const [images, setImages] = useState([])
    const [steps, setSteps] = useState([]);
    const [showBookNow, setShowBookNow] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [activeStep, setActiveStep] = React.useState(0);
    const planStatus = true
    const navigate=useNavigate()
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    let { user } = useSelector((state) => {
        return state
    })

    let userId = user.details._id
    const { id } = useParams()
    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/user/plan-view/" + id)
            if (!data.err) {
                setPlans(data.plans)
                let subImages = data.plans.subImages.map(item => {
                    return { label: item.name, imgPath: baseImgUrl + item.filename }
                })
                setImages([{ label: data.plans.name, imgPath: baseImgUrl + data.plans.mainImage[0].filename }, ...subImages])
                const eventDetails = data.plans.ProgrammeDetails;
                const newSteps = eventDetails.map((event, index) => ({
                    label: event.events,
                    description: event.description,
                }));
                setSteps(newSteps);
            }
        })()
    }, [])

   async function handleChat(agentId, userId) {
        console.log(agentId);
        let reciverId = agentId
        let senderId = userId
        let { data } = await axios.post("/chat", { senderId, reciverId })
        if(!data.err){
            navigate('/chat')        }
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
                                    {plans.name}
                                </h4>
                                <div className="d-flex flex-row my-3">

                                    <span className="text-muted">  {plans?.agencyId?.name.toUpperCase()}

                                    </span>

                                </div>

                                <div className="mb-3">
                                    <span className="h5">{plans.cost}₹</span>
                                    <span className="text-muted">/per head</span>
                                </div>

                                <p className='pkg-desc'>{plans.description}</p>

                                <div className="row">
                                    <dt className="col-3 pkg-det">Destination:</dt>
                                    <dd className="col-9 pkg-details">{plans.location}</dd>
                                    <dt className="col-3 pkg-det">Date:</dt>
                                    <dd className="col-9 pkg-details">{new Date(plans.date).toLocaleDateString()}</dd>

                                    <dt className="col-3 pkg-det">Time</dt>
                                    <dd className="col-9 pkg-details">{plans.time}</dd>

                                    <dt className="col-3 pkg-det">Slots Remaining</dt>
                                    <dd className="col-9 pkg-details">{plans.totalSlots}</dd>
                                </div>

                                <hr />

                                <div className="row mb-4">

                                </div>
                                     <div className="book-pkg-and-chat">
                                    <div>
                                        <button className='bookpkgbtn' onClick={() => setShowBookNow(true)} > Book Package </button>
                                    </div>
                                    <div >
                                        <button className='bookpkgbtn' onClick={() => handleChat(plans.agencyId._id, userId)}> Chat for more Enquiries</button>
                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>
            </section>
            {
                showBookNow &&
                <PlanBookNow setShowBookNow={setShowBookNow} refresh={refresh} setRefresh={setRefresh} plans={plans} />
            }

        </>
    )
}

export default PlanView