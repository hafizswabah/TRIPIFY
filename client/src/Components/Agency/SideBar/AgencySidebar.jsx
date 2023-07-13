import React, { useState } from 'react'
import './Sidebar.css'
import { RiBankLine, RiBarChart2Line, RiBuilding4Line,RiPlaneLine, RiBankCard2Line,RiAuctionFill,RiAuctionLine,RiFileWarningLine,RiHome2Line, RiHospitalLine, RiRefundLine, RiUser2Line, RiUserLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

function AgencySidebar({ page, clicked }) {
  
  return (
    <div className={`admin-sidebar ${clicked && 'open'}`}>
      <ul>
        <Link to="/agency/">
          <li className={`admin-sideitems ${page == "dashboard" && 'active'}`}>
            <div className='side'></div>
            <div className="admin-sideItem">

              <RiHome2Line className='icon' />
              <span>Dashboard</span>
            </div>
          </li>
        </Link>




        <Link to="/agency/package">

          <li className={`admin-sideitems ${page == "package" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiBankCard2Line className='icon' />
              <span>Packages</span>
            </div>
          </li>
        </Link>
        <Link to="/agency/plans">

          <li className={`admin-sideitems ${page == "plans" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiAuctionLine className='icon' />
              <span>Plans</span>
            </div>
          </li>
        </Link>
        <Link to="/agency/users">

          <li className={`admin-sideitems ${page == "user" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiUserLine className='icon' />
              <span>Users</span>
            </div>
          </li>
        </Link>

        <Link to="/agency/trips">

          <li className={`admin-sideitems ${page == "trips" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiPlaneLine className='icon' />
              <span>Trips</span>
            </div>
          </li>
        </Link>
        <Link to="/agency/bookings">

          <li className={`admin-sideitems ${page == "bookings" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiBankLine className='icon' />
              <span>Bookings</span>
            </div>
          </li>
        </Link>
        <Link to="/agency/reports">

          <li className={`admin-sideitems ${page == "report" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiBarChart2Line className='icon' />
              <span>Reports</span>
            </div>
          </li>
        </Link>

      </ul>

    </div>
  )
}

export default AgencySidebar