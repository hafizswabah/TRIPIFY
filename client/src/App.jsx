
import './App.css'
import SignPage from './Pages/user/SignupPage'
import LoginPage from './Pages/user/LoginPage'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/sign-up' element={<SignPage />}/>
      </Routes>

    </div>
  )
}

export default App
