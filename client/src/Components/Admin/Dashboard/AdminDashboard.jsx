import React from 'react'
import { useState } from 'react'
import AdminHeader from '../Header/AdminHeader'
import AdminSidebar from '../SideBar/AdminSideBar'
import './Dashboard.css'

function AdminDashboard() {
  const [clicked, setCLicked] = useState(false)
  const handleClick = () => {
    setCLicked(!clicked)
  }

  return (
    <>
      <div className="adminHeader">
        <AdminHeader handleClick={handleClick} />
        <AdminSidebar page={'dashboard'} clicked={clicked} />

      </div>
    </>

  )
}

export default AdminDashboard