import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../NavBar/NavBar'
import './Booking.css'
function Booking() {
    const {user}=useSelector((state)=>{
        return state
    })
    console.log(user);
    return (
        <div>
            <NavBar></NavBar>
            <div className="user-booking-container">

                <div className="profile-comp">
                    <img src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" alt="" />
                    <h6 className="text-center mt-2">{user.details.name.toUpperCase()}</h6>
                    <span className="text-center">{user.details.email}</span>
                </div>
            </div>
        </div>
    )
}

export default Booking