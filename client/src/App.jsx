
import './App.css'
import SignPage from './Pages/user/SignupPage'
import LoginPage from './Pages/user/LoginPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import HomePage from './Pages/user/Home/HomePage'
import ForgotPage from './Pages/user/ForgotPage'

function App() {
axios.defaults.withCredentials=true;
axios.defaults.baseURL="http://localhost:7777"

const {user,refresh}=useSelector((state)=>{
  return state
})
console.log(user);
const dispatch=useDispatch()
useEffect(()=>{
  (async function(){
    let {data}=await axios.get("/user/auth/check")
    console.log(data);
    dispatch({type:"user",payload:{login:data.loggedIn,details:data.user}})
  })()

},[refresh])
  return (
    <div className='App'>
      <Routes>
        {user.login && 
        <>
        <Route path='/login' element={<Navigate to={"/"} />}/>
        <Route path='/signup' element={<Navigate to={"/"} />}/> 
        <Route path='/' element={<HomePage/>}/>
        </>
        }
       {
        user.login==false &&
        <>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignPage/>}/>
        <Route path='/' element={<Navigate to="/login" />} />
       <Route path='/forgot' element={<ForgotPage/>}/>
        </>
       }
      </Routes>
    </div>
  )
}

export default App
