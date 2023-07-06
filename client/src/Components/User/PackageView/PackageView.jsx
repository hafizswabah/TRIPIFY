import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { baseImgUrl } from '../../../urls'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './packageView.css'
import Rating from '@mui/material/Rating';
function PackageView() {
    const [packages, setPackages] = useState([])
    const [value, setValue] = useState('');
    console.log(packages);
    const { id } = useParams()
    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/user/package-view/" + id)
            if (!data.err) {
                setPackages(data.packages)
            }
        })()
    }, [])
    const formattedStartDate = new Date(packages.startDate).toLocaleDateString();
    const formattedEndDate = new Date(packages.endDate).toLocaleDateString()

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                <Link
                                    to="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp"
                                    data-fslightbox="mygalley"
                                    className="rounded-4"
                                    target="_blank"
                                    data-type="image"
                                >
                                    {packages.mainImage &&
                                        <img
                                            style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }}
                                            className="rounded-4 fit"
                                            src={baseImgUrl + packages.mainImage[0].filename}
                                            alt="Product Image"
                                        />

                                    }

                                </Link>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                {packages?.subImages?.map((subImage) => (
                                    <img
                                        width="60"
                                        height="60"
                                        className="rounded-2"
                                        src={baseImgUrl + subImage.filename}
                                        alt="Thumbnail 1"
                                    />

                                ))

                                }

                            </div>
                        </aside>
                        <main className="col-lg-6">
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
                                    <span className="text-muted">
                                        <i className="fas fa-shopping-basket fa-sm mx-1"></i>154 orders
                                    </span>
                                    <span className="text-success ms-2">In stock</span>
                                </div>

                                <div className="mb-3">
                                    <span className="h5">{packages.cost}₹</span>
                                    <span className="text-muted">/per head</span>
                                </div>

                                <p>{packages.description}</p>

                                <div className="row">
                                    <dt className="col-3">Destination:</dt>
                                    <dd className="col-9">{packages.destination}</dd>
                                    <dt className="col-3">Date:</dt>
                                    <dd className="col-9">{formattedStartDate} to {formattedEndDate}</dd>

                                    <dt className="col-3">Duration</dt>
                                    <dd className="col-9">{packages.duration}</dd>

                                    <dt className="col-3">Visit Places</dt>
                                    <dd className="col-9">{packages.visitPlaces}</dd>

                                    <dt className="col-3">Flight Bookings</dt>
                                    <dd className="col-9">{packages.flightbooking ? 'Inluded Flight Tickets' : 'No Flight Tickets'}</dd>
                                    <dt className="col-3">Stay Bookings</dt>
                                    <dd className="col-9">{packages.staybooking ? 'Inluded Stay Tickets' : 'No Stay Booking Included'}</dd>
                                </div>

                                <hr />

                                <div className="row mb-4">
                                    <label className="mb-2 d-block">Tickets</label>
                                    <div className="col-md-4 col-2 mb-3 d-flex align-item-center justify-content-center">

                                        <button class="Btn">

                                            <div class="sign">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="90" height="90" viewBox="0 0 30 30">
                                                    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path>
                                                </svg>
                                            </div>

                                            <div class="text">Add</div>
                                        </button>

                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className='mt-2' />
                                    </div>
                                    <div className="col-md-2 col-2 mb-3">

                                        <button class="Btn">

                                            <div class="sign">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="90" height="90" viewBox="0 0 30 30">
                                                    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path>
                                                </svg>
                                            </div>

                                            <div class="text">minus</div>
                                        </button>

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

export default PackageView