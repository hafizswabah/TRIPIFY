import React from 'react'
import './Sidebar.css'
import { RiBankLine, RiBarChart2Line, RiBuilding4Line, RiFileWarningLine, RiHome2Line, RiHospitalLine, RiRefundLine, RiUser2Line, RiUserLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

function AdminSidebar({ page, clicked }) {

  return (
    <div className={`admin-sidebar ${clicked && 'open'}`}>
      <ul>
        <Link to="/admin/">
          <li className={`admin-sideitems ${page == "dashboard" && 'active'}`}>
            <div className='side'></div>
            <div className="admin-sideItem">

              <RiHome2Line className='icon' />
              <span>Dashboard</span>
            </div>
          </li>
        </Link>
        <Link to="/admin/users">

          <li className={`admin-sideitems ${page == "user" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiUserLine className='icon' />
              <span>Users</span>
            </div>
          </li>
        </Link>

        <Link to="/admin/agency-requests">

          <li className={`admin-sideitems ${page == "agency-request" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiFileWarningLine className='icon' />
              <span>Agency Requests</span>
            </div>
          </li>
        </Link>
        <Link to="/admin/agency">

          <li className={`admin-sideitems ${page == "agency" && 'active'}`}>
            <div className='side'></div>
            <div className="admin-sideItem">

              <RiBuilding4Line className='icon' />
              <span>Agencies</span>
            </div>
          </li>
        </Link>

        <Link to="/admin/packages">

          <li className={`admin-sideitems ${page == "package" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiRefundLine className='icon' />
              <span>Packages</span>
            </div>
          </li>
        </Link>
        <Link to="/admin/plans">

          <li className={`admin-sideitems ${page == "plans" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiHospitalLine className='icon' />
              <span>Plans</span>
            </div>
          </li>
        </Link>

        <Link to="/admin/trips">

          <li className={`admin-sideitems ${page == "trips" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiFileWarningLine className='icon' />
              <span>Trips</span>
            </div>
          </li>
        </Link>
        <Link to="/admin/bookings">

          <li className={`admin-sideitems ${page == "bookings" && 'active'}`}>

            <div className='side'></div>
            <div className="admin-sideItem">

              <RiBankLine className='icon' />
              <span>Bookings</span>
            </div>
          </li>
        </Link>
        <Link to="/admin/reports">

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

export default AdminSidebar