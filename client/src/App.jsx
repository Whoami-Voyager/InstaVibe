import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Redirect from './Components/Redirect'
import Login from './Components/Login'
import User from './Components/User'
import Singup from './Components/Singup'
import Error from './Components/Error'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(0)

  console.log(isLoggedIn)

  useEffect(() => {
    fetch('/api/session')
      .then(r => r.json())
      .then(data => {
        setUserId(data['id'])
        setIsLoggedIn(!isLoggedIn)
      })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Redirect isLoggedIn={isLoggedIn} userId={userId} />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />} />
        <Route path='/signup' element={<Singup setIsLoggedIn={setIsLoggedIn} setUserId={setUserId} />} />
        <Route path='/user/:id' element={<User setIsLoggedIn={setIsLoggedIn} userId={userId} />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
