import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false)

  return (
    <>
      <header className={`header ${showMobileNav ? 'header--static' : ''}`}>
        <nav>
          <ul className={`header__links ${showMobileNav ? 'header__links--mobile-open' : ''}`}>
            <li className="header__links__li">
              <a href="#">ZeroPool</a>
            </li>
            <li className="header__links__li">
              <a href="#partners">Our partners</a>
            </li>
            <li className="header__links__li">
              <a href="#contacts">Contact us</a>
            </li>
            <li className="header__links__li">
              <Link className="header__links__li" to="/research" >Research</Link>
            </li>
            <li className="header__links__li">
              <Link className="header__links__li" to="/docs" >Docs</Link>
            </li>
          </ul>
        </nav>
        <button
          className="header__menu-button menu-button"
          onClick={() => setShowMobileNav(!showMobileNav)}
        >
          <div className={`menu-button__line ${showMobileNav && 'menu-button__line--open'}`}/>
          <div className={`menu-button__line ${showMobileNav && 'menu-button__line--open'}`}/>
          <div className={`menu-button__line ${showMobileNav && 'menu-button__line--open'}`}/>
        </button>
      </header>
    </>
  )
}

export default Header
