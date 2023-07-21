import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import './UserProfile.css'
const UserProfile = () => {
  const { user } = useSelector((state) => {
    return state
  })
  console.log(user);
  const userId = user.details._id

  return (
    <div>
      <NavBar />
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
                  <div className="col-6 d-flex align-items-center justify-content-center">
                    <button>hh</button>
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
                  <h6 className="count h2" data-to="500" data-speed="500">500</h6>
                  <p className="m-0px font-w-600">Tour Package</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="150" data-speed="150">150</h6>
                  <p className="m-0px font-w-600">Tickets</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="850" data-speed="850">850</h6>
                  <p className="m-0px font-w-600">Completed</p>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-data text-center">
                  <h6 className="count h2" data-to="190" data-speed="190">190</h6>
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
