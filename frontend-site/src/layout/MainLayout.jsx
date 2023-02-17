import React from 'react'
import Navbar from '../components/Navbar'

function MainLayout({children}) {
  return (
    <div className="bg-paleYellow w-full h-screen overflow-hidden">
        <Navbar/>
        <div>{children}</div>
    </div>
  )
}

export default MainLayout