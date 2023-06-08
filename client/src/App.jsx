
import './App.css'
import SignPage from './Pages/user/SignupPage'
import LoginPage from './Pages/user/LoginPage'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

function App() {
axios.defaults.withCredentials=true;
axios.defaults.baseURL="http://localhost:7000"
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<SignPage />}/>
      </Routes>
    </div>
  )
}

export default App
