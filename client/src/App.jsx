
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

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:8888"

  const { user, admin, refresh } = useSelector((state) => {
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
            <Route path='/admin' element={<DashboardPage/>}/>
          </>
        }
      {
        admin.login==false &&
         <>
         <Route path='/admin/login' element={<AdminLoginPage/>}/>
         <Route path='/admin' element={<Navigate to={"/admin/login"}/>}/>
        </>
      }
      <Route path='/agency/signup' element={<AgencySignupPage/>}/>
      </Routes>
    </div>
  )
}

export default App
