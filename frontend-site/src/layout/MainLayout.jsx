import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MainLayout({children}) {
  return (
    <div className="bg-paleYellow w-full h-screen overflow-hidden">
        <Navbar/>
        <div>{children}</div>
        <Footer/>
    </div>
  )
}

export default MainLayout