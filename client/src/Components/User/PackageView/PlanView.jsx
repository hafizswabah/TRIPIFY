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
function PlanView() {
    const [plans, setPlans] = useState([])
    const [value, setValue] = useState('');
    const [images, setImages] = useState([])
    const [steps, setSteps] = useState([]);

    const [activeStep, setActiveStep] = React.useState(0);

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
            let { data } = await axios.get("/user/plan-view/" + id)
            if (!data.err) {
                setPlans(data.plans)
                let subImages = data.plans.subImages.map(item => {
                    return { label: item.name, imgPath: baseImgUrl + item.filename }
                })
                setImages([{ label: data.plans.name, imgPath: baseImgUrl + data.plans.mainImage[0].filename }, ...subImages])
                // const dayDetails = data.packages.dayDetails;
                // const newSteps = dayDetails.map((day, index) => ({
                //   label: `Trip Day ${index + 1}`,
                //   description: day.description,
                // }));
                // setSteps(newSteps);
            }
        })()},[])
    // }, [])
    // const formattedStartDate = new Date(packages.startDate).toLocaleDateString();
    // const formattedEndDate = new Date(packages.endDate).toLocaleDateString()






    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className=" rounded-4 mb-3 d-flex justify-content-center">

                                {
                                    images &&
                                    <ImageViewer data={images} />
                                }
                            </div>
                            {/* <div className="stepers m-5">
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
                                                <Typography style={{fontSize:"11px",fontWeight:'400'}}>{step.description}</Typography>
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
                                        <Typography style={{fontSize:"14px",fontWeight:'600'}}>Complted Your Journey OverView</Typography>
                                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                            Reset
                                        </Button>
                                    </Paper>
                                )}
                            </div> */}

                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                    {plans.name}
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
                                    <span className="h5">{plans.cost}₹</span>
                                    <span className="text-muted">/per head</span>
                                </div>

                                <p className='pkg-desc'>{plans.description}</p>

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

                                <div className="row mb-4">
                                    <div className=" mb-3 ">
                                        <p>Tickets</p>
                                        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }} style={{ margin: "0px" }}>
                                            <Input
                                                id="standard-adornment-weight"
                                                endAdornment={<InputAdornment position="end"></InputAdornment>}
                                                aria-describedby="standard-weight-helper-text"
                                                inputProps={{
                                                    'aria-label': 'How many tickets would you like?',
                                                }}
                                                type='number'
                                            />
                                            <FormHelperText id="standard-weight-helper-text">How many tickets would you like to purchase?</FormHelperText>
                                        </FormControl>

                                    </div>
                                </div>
                                <button className='bookpkgbtn'> Book Package </button>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

        </>
    )
}

export default PlanView