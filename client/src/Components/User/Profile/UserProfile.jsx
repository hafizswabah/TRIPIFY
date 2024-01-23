import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import EditProfileModal from '../../../modal/EditProfile';
import NavBar from '../NavBar/NavBar';
import './UserProfile.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
const UserProfile = () => {
const Navigate=useNavigate()
const dispatch=useDispatch()
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [state, setState] = React.useState({

    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
  const [showModal, setShowModal] = useState(false)
  const [reload, setReload] = useState(false)
  const [bookingList, setBookingList] = useState([])
  const [planBookingList, setPlanBookings] = useState([])
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => {
    return state
  })
  function getPackageCount() {
    return bookingList.length
  }
  function getTicketCount() {
    return planBookingList.length
  }
  const PackagesCount = getPackageCount()
  console.log(PackagesCount,"pkgcnt");
  const Tickets = getTicketCount()
  console.log(Tickets,"tktcnt");
  function completedTrips() {
    const currentDate = new Date()
    let completedTrip = bookingList.filter((item) => {
      return item.status === 'upcoming' && new Date(item?.PackageId.endDate) < currentDate
    })
    return completedTrip.length
  }
  function upcomingTrips() {
    const currentDate = new Date()
    let completedTrip = bookingList.filter((item) => {
      return item.status === 'upcoming' && new Date(item?.PackageId.endDate) > currentDate
    })
    return completedTrip.length
  }
  let upcomingTripCount = upcomingTrips()
  function getupcomingTickets() {
    let currentDate = new Date()
    let completedTicket = planBookingList.filter((item) => {
      return item.status === 'upcoming' && new Date(item?.PlanId.date) > currentDate
    })

    return completedTicket.length
  }
  let upcomingevent = getupcomingTickets()
  let completedTripCount = completedTrips()
  function getCompletedTickets() {
    let currentDate = new Date()
    let completedTicket = planBookingList.filter((item) => {
      return item.status === 'upcoming' && new Date(item?.PlanId.date) < currentDate
    })
    return completedTicket.length
  }
  let completedTicketCount = getCompletedTickets()

  let upcomings = upcomingevent + upcomingTripCount


  let completed = completedTicketCount + completedTripCount
  const userId = user.details._id
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
      console.log(result);
      if (result.isConfirmed) {

        await axios.get("/user/auth/logout");
        dispatch({ type: "refresh" });
        Navigate("/login");
      }
    })
  }
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleModel = () => {
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setReload(!reload)
    setOpen(true)
  }
  useEffect(() => {
    (async function () {
      const { data } = await axios.get("/user/booking/" + userId);
      console.log(data);
      if (!data.err) {
        setBookingList(data.bookings)
        setPlanBookings(data.PlanBookings)
      }
    })()
  }, [reload])
  return (
    <div>
      <NavBar />
      <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseSnackBar}  key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Successfully updated
        </Alert>
      </Snackbar>
      <EditProfileModal showModal={showModal} handleCloseModal={handleCloseModal} />
      <section className="section about-section gray-bg" id="about">
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-lg-6">
              <div className="about-text go-to">
                <h3 className="dark-color">{user.details.name}</h3>
                <h6 className="theme-color lead">{user.details.email}</h6>

                <div className="row about-list">
                  <div className="col-md-4">
                    <div className="media">
                      <label>Contact :</label>

                    </div>

                  </div>
                  <div className="col-md-6">
                    <div className="media">
                      <label>{user.details.contact}</label>

                    </div>

                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 col-sm-6 col-xs-6 d-flex align-items-center justify-content-center mt-4 m-1">
                    <button className='log-btn' onClick={logout}>
                      LOG OUT
                    </button>
                  </div>
                  <div className="col-md-5 col-sm-6 col-xs-6 d-flex align-items-center justify-content-center mt-4 m-1">
                    <button className='log-btn' onClick={handleModel}>
                      EDIT PROFILE
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-avatar">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" />
              </div>
            </div>
          </div>
          <div className="counter">
            <div className="row">
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="500" data-speed="500">{PackagesCount}</h6>
                  <p className="m-0px font-w-600">Tour Package</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="150" data-speed="150">{Tickets}</h6>
                  <p className="m-0px font-w-600">Tickets</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="850" data-speed="850">{completed}</h6>
                  <p className="m-0px font-w-600">Completed</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="190" data-speed="190">{upcomings}</h6>
                  <p className="m-0px font-w-600">Upcoming Events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
