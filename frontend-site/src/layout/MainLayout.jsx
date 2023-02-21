import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from '../assets/style'

function MainLayout({children}) {
  return (
    <div className="bg-primaryGreen w-full overflow-hidden">
        <Navbar/>
        <div>{children}</div>
        <Footer/>
    </div>
  )
}

export default MainLayout