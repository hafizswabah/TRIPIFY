import React, { useState } from 'react'
import {  useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import './BookNow.css'
import Swal from 'sweetalert2'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
function BookNow({ setShowBookNow, refresh, setRefresh, packages ,planStatus}) {

    const [count, setCount] = useState("");
    const [totalCost, setTotalCost] = useState(0);
    const [errMsg, setErrorMessage] = useState('');
    const [remainingSlots, setRemainingSlots] = useState(packages.balanceSlot);
    const [err, setErr] = useState(false)
   
    const navigate = useNavigate()
    const TripStartDate = new Date(packages.startDate).toLocaleDateString()
    const TripEndDate = new Date(packages.endDate).toLocaleDateString()
   
    const { user} = useSelector((state) => {
        return state
      })
      const userId=user.details._id
 

      let PlanId;
      let PackageId;
      
      if (planStatus) {
        PlanId = packages._id;
      } else {
        PackageId = packages._id;
      }
      const AgencyId=packages.agencyId
    useEffect(() => {

    }, [])
console.log(planStatus);
    const handleBooking = async () => {
        const { data } = await axios.post("/user/payment", { totalCost:totalCost });
        if (!data.err) {
            handleRazorPay(data.order);
        }
    }
    const handleRazorPay = (order) => {
        const options = {
            key: "rzp_test_7TGBri3PsjHg77",
            amount: order.amount,
            currency: order.currency,
            name: "Acme Corp",
            description: "Test Transaction",
            order_id: order.id,
            handler: async (response) => {
                const idToSend = planStatus ? PlanId : PackageId;
                const { data } = await axios.post("/user/payment/verify", { response,userId,idToSend,BookedSlots:count,AgencyId});
                if (data.err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message,
                    })
                } else {
                    Swal.fire(
                        'Success!',
                        'Successfully Booked',
                        'success'
                    )
                    navigate("/Bookings")
                }
                setShowBookNow(false)
                setRefresh(!refresh)
            }
        }
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', (response) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.error.description,
            })
            setRefresh(!refresh)

        })

    }

    const handleCountChange = (e) => {
        const value = e.target.value;
        setCount(value);

        // Calculate total cost based on count and packages.cost
        const parsedCount = parseInt(value, 10); // Convert the value to an integer
        const calculatedCost = parsedCount * packages.cost;
        setTotalCost(calculatedCost);

        // Calculate remaining slots and handle invalid count
        const calculatedRemainingSlots = packages.balanceSlot - parsedCount; // Replace 'packages.totalSlots' with the actual total slots value
        if (calculatedRemainingSlots < 0) {
            setErrorMessage('Sorry we running out of slots')
            setRemainingSlots(0)
            setErr(true)

        } else {
            setRemainingSlots(calculatedRemainingSlots);
            setErrorMessage("")
            setErr(false)

        }
    };
    useEffect(() => {
        (async function () {

        })()
    }, [])

    return (
        <div className="book-now-main">
            <div className="booking-container">
                <div className="booking-row head">
                    <h4>Book Now</h4>

                </div>


                <div className="booking-row">
                    <div className="booking-details">
                        <div className="booking-row-head">
                            Package
                        </div>
                        <div className="booking-row-head" style={{ fontWeight: "500" }}>
                            {packages.name}
                        </div>
                    </div>
                    <div className="booking-details">
                        <div className="booking-row-head">
                            Location
                        </div>
                        <div className="booking-row-head" style={{ fontWeight: "500" }}>
                            {packages.destination}
                        </div>
                    </div>
                    <div className="booking-details">
                        <div className="booking-row-head">
                            Date
                        </div>
                        <div className="booking-row-head" style={{ fontWeight: "500" }}>
                            {TripStartDate} to {TripEndDate}
                        </div>
                    </div>
                    <div className="booking-details">
                        <div className="booking-row-head">
                            Remaining Slots
                        </div>
                        <div className="booking-row-head" style={{ color: "red", fontWeight: "500" }}>
                            {remainingSlots}
                        </div>
                    </div>
                    <div className="booking-details">
                        <div className="booking-row-head">
                            Total Cost
                        </div>
                        <div className="booking-row-head" style={{ color: "red", fontWeight: "600" }}>
                            {totalCost}/-
                        </div>
                    </div>
                </div>


                <div className="booking-row">
                    <TextField
                        id="outlined-basic"
                        value={count}
                        onChange={handleCountChange}
                        label="How many tickets would you like to buy"
                        type="number"
                        variant="outlined"
                        fullWidth
                        className="input"
                    />
                </div>
                <div className="booking-err">

                    <div className="booking-err-msg">
                        {errMsg}
                    </div>
                </div>

                <div className="bttn">
                    <button onClick={() => setShowBookNow(false)}>Cancel</button>
                    <button onClick={handleBooking} disabled={err} >Book Now</button>

                </div>
            </div>
        </div>
    )
}

export default BookNow