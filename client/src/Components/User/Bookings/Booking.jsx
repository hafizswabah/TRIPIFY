import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../NavBar/NavBar'
import Button from '@mui/material/Button';

import './Booking.css'
import Swal from 'sweetalert2';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { baseImgUrl } from '../../../urls';
function Booking() {
    const [bookingList, setBookingList] = useState([])
    const [refresh, setRefresh] = useState(true)
    const { user } = useSelector((state) => {
        return state
    })
    const userId = user.details._id

    async function cancelBooking(bookingId) {
        console.log(bookingId);
        const { data } = await axios.patch("/user/booking/cancel", { bookingId });
        if (data.err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message,
            })
        }
        return data
    }
    const handleCancelBooking = async (bookingId) => {
        Swal.fire({
            title: 'Are you sure? Cancel this Booking',
            text: "Cancel Booking",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7e3af2',
            cancelButtonColor: '##a8a8a8',
            confirmButtonText: 'Yes, Cancel',
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = await cancelBooking(bookingId);
                if (!data.err) {
                    Swal.fire(
                        'Success!',
                        'Successfully Cancelled Package',
                        'success'
                    )
                    setRefresh(!refresh);
                }
            }
        })

    }

    async function logout() {
        Swal.fire({
            title: 'Do you want to logout',
            text: "Are you sure ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: '##a8a8a8',
            confirmButtonText: 'Yes,Logout!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                await axios.get("/user/auth/logout");
                dispatch({ type: "refresh" })
            }
        })
    }

    useEffect(() => {
        (
            async function () {
                const { data } = await axios.get("/user/booking/" + userId);
                console.log(data);
                if (!data.err) {
                    setBookingList(data.bookings)
                }
            }
        )()
    }, [])


    return (
        <div>
            <NavBar></NavBar>
            <div className="user-booking-container">

                <div className="profile-comp">
                    <img src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" alt="" />
                    <h6 className="text-center mt-2">{user.details.name.toUpperCase()}</h6>
                    <span className="text-center">{user.details.email}</span>
                    <div className="profile-btn mt-4">
                        <Button variant="text" onClick={logout} >Log Out</Button>
                    </div>
                </div>
                <Row>
                    {

                        bookingList?.map((item) => {

                            return <Col md={12} className='p-2'> <div className="user-booking-item" >
                                <div className="ub-dr-profile">
                                    <img src={baseImgUrl + item?.PackageId?.mainImage[0].filename} alt="" />
                                </div>
                                <div className="ub-dr-desc">
                                    <div className="ub-dr-desc-item">
                                        <b>{item.PackageId?.name}</b>
                                        <div className="mt-2">
                                            <p>Destination: </p>
                                            <p> {item?.PackageId?.destination}</p>
                                        </div>
                                        <div>
                                            <p>Date : </p>
                                            <p>{new Date(item?.PackageId?.startDate).toLocaleDateString()} to {new Date(item?.PackageId?.endDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p>Slots Booked : </p>
                                            <p>{item?.BookedSlots} </p>
                                        </div>

                                    </div>

                                </div>
                                <div className="cancle-bookings">
                                    {item?.status == 'upcoming' ?
                                        <Button variant="text" onClick={() => handleCancelBooking(item._id)}>Cancle Booking</Button>
                                        : <Button variant="text">Refund Processing</Button>
                                    }

                                </div>
                            </div> </Col>



                        })

                    }



                </Row>

            </div>
        </div>
    )
}

export default Booking