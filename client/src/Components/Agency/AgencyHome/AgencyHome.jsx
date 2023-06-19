import React, { useState } from 'react'
import AgencyHeader from '../Header/AgencyHeader'
import AgencySidebar from '../SideBar/AdminSideBar'

function AgencyHome() {
    const [clicked, setCLicked] = useState(false)
    const handleClick = () => {
      setCLicked(!clicked)
    }
  return (
    <div>
        <AgencyHeader handleClick={handleClick}/>
        <AgencySidebar page={'dashboard'} clicked={clicked}/>
    </div>
  )
}

export default AgencyHome