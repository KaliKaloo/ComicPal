import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='navbar-logo'>
            ComicAI
        </div>
        <ul className='navbar-menu'>
            <li><Link to="/">Overview</Link></li>
            <li><Link to="/Playground">Playground</Link></li>
            <li><Link to="/About">About</Link></li>

        </ul>
    </div>
  )
}

export default Navbar