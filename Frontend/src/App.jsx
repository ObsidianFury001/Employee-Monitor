import Header from './components/header/Header'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  const [user, setUser] = useState({
    "id": null,
    "name": "",
    "username": "",
    "email": ""
  })

  const updateUser = (newState) => {
    setUser(newState);
  };

  return (
    <>
      <Header user={user} updateState={setUser} />
      <Routes>
        <Route path='/' element={<Login user={user} updateState={updateUser} />} />
        <Route path='/home' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
