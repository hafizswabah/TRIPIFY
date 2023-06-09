
import './App.css'
import SignPage from './Pages/user/SignupPage'
import LoginPage from './Pages/user/LoginPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import HomePage from './Pages/user/Home/HomePage'
import ForgotPage from './Pages/user/ForgotPage'
import AdminLoginPage from './Pages/admin/Login/AdminLoginPage'
import DashboardPage from './Pages/admin/Dashboard/DashboardPage'
import AgencySignupPage from './Pages/Agency/AgencySignupPage'
import AgencyApprovalPage from './Pages/Agency/AgencyApprovalPage'
import AgencyRequestsPage from './Pages/admin/AgencyRequests.jsx/AgencyRequestsPage'
import AdminAgencyPage from './Pages/admin/AgencyList/AdminAgencyPage'
import AdminUserShowPage from './Pages/admin/AdminUserPage/AdminUserShowPage'
import AgencyLoginPage from './Pages/Agency/AgencyLoginPage.jsx'
import AgencyHomePage from './Pages/Agency/AgencyHomePage'
import AgencyPackagePage from './Pages/Agency/AgencyPackagePage'
import AgencyPlansPage from './Pages/Agency/AgencyPlansPage'
import SerachPackagePage from './Pages/user/SerachPackagePage'
import AdminPackagePage from './Pages/admin/AdminPackagesPage/AdminPackagePage'
import PackageViewPage from './Pages/user/PackageViewPage'
import PlanViewPage from './Pages/user/PlanViewPage'
import BookingsPage from './Pages/user/BookingsPage'
import AgnecyUsers from './Components/Agency/AgencyUsers/AgnecyUsers'
import AgencyTrip from './Components/Agency/AgencyTrip/AgencyTrip'
import AgencyBookings from './Components/Agency/AgencyBookings/AgencyBookings'



function App() {

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL =import.meta.env.VITE_SERVER_URL;


  const { user, admin, agency, refresh } = useSelector((state) => {
    return state
  })

  const dispatch = useDispatch()
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/user/auth/check")
      console.log('user:', data);
      dispatch({ type: "user", payload: { login: data.loggedIn, details: data.user } })
      let { data: adminData } = await axios.get("/admin/auth/check")
      console.log('admin :', adminData);
      dispatch({ type: "admin", payload: { login: adminData.loggedIn, details: adminData.admin } })
      let { data: AgencyData } = await axios.get("/agency/auth/check");
      console.log('agency:', AgencyData);
      dispatch({ type: "agency", payload: { login: AgencyData.loggedIn, details: AgencyData.agency } })
    })()

  }, [refresh])
  return (
    <div className='App'>
      <Routes>
        {user.login &&
          <>
            <Route path='/login' element={<Navigate to={"/"} />} />
            <Route path='/signup' element={<Navigate to={"/"} />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/search-package' element={<SerachPackagePage />} />
            <Route path='/package-details/:id' element={<PackageViewPage/>}/> 
            <Route path='/plan-details/:id' element={<PlanViewPage/>}/> 
            <Route path='/Bookings' element={<BookingsPage/>}/> 


          </>
        }
        {
          user.login == false &&
          <>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignPage />} />
            <Route path='/' element={<Navigate to="/login" />} />
            <Route path='/forgot' element={<ForgotPage />} />
          </>
        }
        {
          admin.login &&
          <>
            <Route path='/admin/login' element={<Navigate to={"/admin"} />} />
            <Route path='/admin' element={<DashboardPage />} />
            <Route path='/admin/agency-requests' element={<AgencyRequestsPage />} />
            <Route path='/admin/agency' element={<AdminAgencyPage />} />
            <Route path='/admin/users' element={<AdminUserShowPage />} />
            <Route path='/admin/packages' element={<AdminPackagePage />} />
          </>
        }
        {
          admin.login == false &&
          <>
            <Route path='/admin/login' element={<AdminLoginPage />} />
            <Route path='/admin' element={<Navigate to={"/admin/login"} />} />
            <Route path='/admin/agency' element={<Navigate to={"/admin/login"} />} />
            <Route path='/admin/users' element={<Navigate to={"/admin/login"} />} />
            <Route path='/admin/agency-requests' element={<Navigate to={"/admin/login"} />} />
          </>
        }
        {agency.login && agency.details.active === false && agency.details.rejected === false &&
          <>
            <Route path='/agency' element={<AgencyApprovalPage rejected={false} />} />
            <Route path='/agency/signup' element={<Navigate to={"/agency"} />}></Route>

          </>
        }
        {
          agency.login && agency.details.rejected &&
          <>
            <Route path='/agency' element={<AgencyApprovalPage rejected={true} agency={agency.details} rejectedMessage={agency.details.rejectedMessage} />} />

          </>
        }
        {
          agency.login == false &&
          <>
            <Route path='/agency/signup' element={<AgencySignupPage />} />
            <Route path='/agency' element={<Navigate to={"/agency/login"} />} />
            <Route path='/agency/login' element={<AgencyLoginPage />} />
          </>
        }
        {
          agency.login &&
          <>
            <Route path='/agency' element={<AgencyHomePage></AgencyHomePage>}></Route>
            <Route path='/agency/signup' element={<Navigate to={"/agency"} />}></Route>
            <Route path='/agency/login' element={<Navigate to={"/agency"} />}></Route>
            <Route path='/agency/package' element={<AgencyPackagePage />} />
            <Route path='/agency/plans' element={<AgencyPlansPage />} />
            <Route path='/agency/users' element={<AgnecyUsers />} />
            <Route path='/agency/trips' element={<AgencyTrip />} />
            <Route path='/agency/bookings' element={<AgencyBookings />} />
          </>
        }
      </Routes>
    </div>
  )
}

export default App
