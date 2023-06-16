
import './App.css'
import SignPage from './Pages/user/SignupPage'
import LoginPage from './Pages/user/LoginPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import axios, { Axios } from 'axios'
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

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:8888"

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
            <Route path='/admin/agency-requests' element={<AgencyRequestsPage/>}/>
            <Route path='/admin/agency' element={<AdminAgencyPage/>}/>
            <Route path='/admin/users' element={<AdminUserShowPage/>}/>
          </>
        }
        {
          admin.login == false &&
          <>
            <Route path='/admin/login' element={<AdminLoginPage />} />
            <Route path='/admin' element={<Navigate to={"/admin/login"} />} />
          </>
        }
        {agency.login && agency.details.active === false &&
          <>
            <Route path='/agency' element={<AgencyApprovalPage rejected={false} />} />
            <Route path='/agency/signup' element={<Navigate to={"/agency"}/>}></Route>


          </>
        }
        {
          agency.login==false &&
          <>
        <Route path='/agency/signup' element={<AgencySignupPage />} />
        <Route path='/agency' element={<Navigate to={"/agency/signup"}/>}/>
          </>
        }
      </Routes>
    </div>
  )
}

export default App
