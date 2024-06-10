import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../NavBar/NavBar'
import Button from '@mui/material/Button';
import { Select } from 'antd';
import './Booking.css'
import Swal from 'sweetalert2';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { baseImgUrl } from '../../../urls';
import { Link } from 'react-router-dom';
import noDataImg from '../../../../src/assets/NoData.jpg'
function Booking() {
    const [bookingList, setBookingList] = useState([])
    const [planBookingList, setPlanBookings] = useState([])
    const [selectedOption, setSelectedOption] = useState("all");
    const [refresh, setRefresh] = useState(true)
    const { user } = useSelector((state) => {
        return state
    })
    const userId = user.details._id
    function handleSelect(option) {
        setSelectedOption(option)

    }

    function filterBookings(selectedOption, bookingList) {
        const currentDate = new Date();
        switch (selectedOption) {
            case "all":
                return bookingList;
            case "completed":
                return bookingList.filter(
                    (item) =>
                        item.status === "upcoming" &&
                        new Date(item.PackageId.endDate) < currentDate
                );
            case "upcoming":
                return bookingList.filter(
                    (item) =>
                        item.status === "upcoming" &&
                        new Date(item.PackageId.startDate) > currentDate
                );
            case "cancelled":
                return bookingList.filter((item) => item.status === "cancelled");
            default:
                return bookingList;
        }
    }
    function filterPlans(selectedOption, planBookingList) {
        const currentDate = new Date();
        switch (selectedOption) {
            case "all":
                return planBookingList;
            case "completed":
                return planBookingList.filter(
                    (item) =>
                        item.status === "upcoming" &&
                        new Date(item.PlanId.date) < currentDate
                );
            case "upcoming":
                return planBookingList.filter(
                    (item) =>
                        item.status === "upcoming" &&
                        new Date(item.PlanId.date) > currentDate
                );
            case "cancelled":
                return planBookingList.filter((item) => item.status === "cancelled");
            default:
                return planBookingList;
        }
    }
    const filteredBookingList = filterBookings(selectedOption, bookingList)
    const filteredPlanList = filterPlans(selectedOption, planBookingList)
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
                    setPlanBookings(data.PlanBookings)
                }
            }
        )()
    }, [refresh])


    return (
        <div>
            <NavBar></NavBar>
            <Container>
            <div className="user-booking-container">


<Row>
    <div className="sort-area">
        <Select
            defaultValue={"all"}
            style={{ width: 120 }}
            onChange={(selectedOption) => handleSelect(selectedOption)}
            options={[
                { value: "all", label: "All" },
                { value: "completed", label: "Completed" },
                { value: "upcoming", label: "upcomings" },
                { value: "cancelled", label: "cancelled" },
            ]}
        />
    </div>
    <div className="plan-book-head-sec">
        <div className="plan-book-head">
            <h4>Package Tickets</h4>
        </div>
    </div>
    {bookingList.length === 0 ? (
        <Row className='d-flex justify-content-center flex-column align-items-center'>
            <img src={noDataImg}
                style={{ maxHeight: "300px", maxWidth: "90%", width: "300px" }} alt="" />
            <h6 className='text-center'>No Bookings</h6>
        </Row>


    ) : (
        filteredBookingList.map((item) => {
            return (
                <Col md={12} className="p-2">
                    <div className="user-booking-item">
                        <div className="ub-dr-profile">
                            <img src={baseImgUrl + item?.PackageId?.mainImage[0].filename} alt="" />
                        </div>
                        <div className="ub-dr-desc">
                            <div className="ub-dr-desc-item">
                                <b>{item.PackageId?.name}</b>
                                <div className="mt-2">
                                    <p>Destination:</p>
                                    <p>{item?.PackageId?.destination}</p>
                                </div>
                                <div>
                                    <p>Date:</p>
                                    <p>
                                        {new Date(item?.PackageId?.startDate).toLocaleDateString()} to {new Date(item?.PackageId?.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p>Slots Booked:</p>
                                    <p>{item?.BookedSlots}</p>
                                </div>
                            </div>
                        </div>
                        <div className="cancel-bookings">
                            {item?.status === 'upcoming' ? (
                                new Date(item?.PackageId?.startDate) > new Date() ? (
                                    <Button variant="text" onClick={() => handleCancelBooking(item._id)}>
                                        Cancel Booking
                                    </Button>
                                ) : (
                                    <>
                                        <Button variant="text">Completed</Button>

                                    </>

                                )
                            ) : item?.status === 'cancelled' ? (
                                <span style={{ color: "red" }}>Cancelled</span>
                            ) : (
                                <Button variant="text">Refund Processing</Button>
                            )}
                        </div>
                        <div className="view-details w-100 d-flex justify-content-end">
                            <Link to={"/package-details/" + item.PackageId._id} style={{ textDecoration: "none" }}>
                                <div>view Details</div>
                            </Link>
                        </div>
                    </div>
                </Col>
            );
        })
    )}




</Row>
<Row>
    <div className="plan-book-head-sec">
        <div className="plan-book-head">
            <h4>Activity Tickets</h4>
        </div>
    </div>
    {planBookingList.length === 0 ? (
        <Row className='d-flex justify-content-center flex-column align-items-center'>
            <img src={noDataImg}
                style={{ maxHeight: "300px", maxWidth: "90%", width: "300px" }} alt="" />
            <h6 className='text-center'>No Tickets Booked</h6>
        </Row>
    ) : (
        filteredPlanList?.map((item) => {

            return <Col md={12} className='p-2'> <div className="user-booking-item" >
                <div className="ub-dr-profile">
                    <img src={baseImgUrl + item?.PlanId?.mainImage[0].filename} alt="" />
                </div>
                <div className="ub-dr-desc">
                    <div className="ub-dr-desc-item">
                        <b>{item.PackageId?.name}</b>
                        <div className="mt-2">
                            <p>Location: </p>
                            <p> {item?.PlanId?.location}</p>
                        </div>
                        <div>
                            <p>Date : </p>
                            <p>{new Date(item?.PlanId?.date).toDateString()}</p>
                        </div>
                        <div>
                            <p>Slots Booked : </p>
                            <p>{item?.BookedSlots} </p>
                        </div>

                    </div>

                </div>
                <div className="cancle-bookings">
                    {item?.status === 'upcoming' ? (
                        new Date(item?.PlanId?.date) > new Date() ? (
                            <Button variant="text" onClick={() => handleCancelBooking(item._id)}>
                                Cancel Booking
                            </Button>
                        ) : (
                            <Button variant="text">Completed</Button>
                        )
                    ) : item?.status === 'cancelled' ? (
                        <span style={{ color: "red" }}>Cancelled</span>
                    ) : (
                        <Button variant="text">Refund Processing</Button>
                    )}
                </div>
                <div className="view-details w-100 d-flex justify-content-end">
                    <Link to={"/plan-details/" + item?.PlanId?._id} style={{ textDecoration: "none" }}>
                        <div>view Details</div>
                    </Link>
                </div>
            </div>
            </Col>



        }))

    }



</Row>

</div>
            </Container>
          
        </div>
    )
}

export default Booking