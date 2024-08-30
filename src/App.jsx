import React from 'react'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { Routes,Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Bookmarked from './pages/Bookmarked'

function App() {
  return (
    <div>
       <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/bookmarked" element={<MainLayout><Bookmarked /></MainLayout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App