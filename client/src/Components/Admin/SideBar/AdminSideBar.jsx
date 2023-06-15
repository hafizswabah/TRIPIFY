import React from 'react'
import './Sidebar.css'
import { RiBankLine, RiBarChart2Line, RiBuilding4Line, RiFileWarningLine, RiHome2Line, RiHospitalLine, RiRefundLine, RiUser2Line, RiUserLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

function AdminSidebar({page, clicked}) {

  return (
    <div className={`admin-sidebar ${clicked && 'open'}`}>
          <ul>
              <Link to="/account/admin/">
            <li className={`admin-sideitems ${page=="dashboard" && 'active'}`}>
              <div className='side'></div>
              <div className="admin-sideItem">

                <RiHome2Line className='icon' />
                <span>Dashboard</span>
              </div>
            </li>
              </Link>
              <Link to="/account/admin/doctors">

            <li className={`admin-sideitems ${page=="doctor" && 'active'}`}>
              <div className='side'></div>
              <div className="admin-sideItem">

                <RiUser2Line className='icon' />
                <span>Agencies</span>
              </div>
            </li>
            </Link>
            
            <Link to="/account/admin/hospitals">

            <li className={`admin-sideitems ${page=="hospital" && 'active'}`}>

              <div className='side'></div>
              <div className="admin-sideItem">

                <RiBuilding4Line className='icon' />
                <span>Packages</span>
              </div>
            </li>
            </Link>
            <Link to="/account/admin/refunds">

            <li className={`admin-sideitems ${page=="refund" && 'active'}`}>

              <div className='side'></div>
              <div className="admin-sideItem">

                <RiRefundLine className='icon' />
                <span>Plans</span>
              </div>
            </li>
            </Link>
            <Link to="/account/admin/hospitals/requests">

            <li className={`admin-sideitems ${page=="hospital request" && 'active'}`}>

              <div className='side'></div>
              <div className="admin-sideItem">

                <RiHospitalLine className='icon' />
                <span>Agency Requestes</span>
              </div>
            </li>
            </Link>
            <Link to="/account/admin/users">

            <li className={`admin-sideitems ${page=="user" && 'active'}`}>

              <div className='side'></div>
              <div className="admin-sideItem">

                <RiUserLine className='icon' />
                <span>Users</span>
              </div>
            </li>
            </Link>
            <Link to="/account/admin/complaints">

            <li className={`admin-sideitems ${page=="complaints" && 'active'}`}>

              <div className='side'></div>
              <div className="admin-sideItem">

                <RiFileWarningLine className='icon' />
                <span>Trips</span>
              </div>
            </li>
            </Link>
            <Link to="/account/admin/withdrawals">

            <li className={`admin-sideitems ${page=="withdrawals" && 'active'}`}>

              <div className='side'></div>
              <div className="admin-sideItem">

                <RiBankLine className='icon' />
                <span>Bookings</span>
              </div>
            </li>
            </Link>
            <Link to="/account/admin/reports">

            <li className={`admin-sideitems ${page=="report" && 'active'}`}>

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