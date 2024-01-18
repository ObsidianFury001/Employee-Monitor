import Header from './components/header/Header'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Cookies from 'universal-cookie'
import useCookie from "./hooks/UseCookie"

function App() {
  const [cookie, setCookie, removeCookie] = useCookie('user', '{}')

	const Logout = () => {
		removeCookie()
	}

  return (
    <>
      <div className='w-full h-screen'>
        <Header user={cookie} updateState={setCookie} />
        <Routes>
          <Route path='/' element={<Login user={cookie} updateState={setCookie} />} />
          <Route path='/home' element={<Dashboard user={cookie} updateState={setCookie}/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
