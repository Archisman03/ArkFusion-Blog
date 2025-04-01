import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import { About } from './Pages/About'
import { Signin } from './Pages/Signin'
import { SignUp } from './Pages/SignUp'
import { Dashboard } from './Pages/Dashboard'
import { Projects } from './Pages/Projects'
import { NotFound } from './Pages/NotFound'
import { Header } from './Components/Header'
import { Footer } from './Components/Footer'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/projects' element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
