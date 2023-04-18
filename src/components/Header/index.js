import React, { useState } from 'react'

const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false)

  return (
    <>
      <header className={`header ${showMobileNav ? 'header--static' : ''}`}>
        <nav>
          <ul className={`header__links ${showMobileNav ? 'header__links--mobile-open' : ''}`}>
            <li className="header__links__li">
              <a href="#what-is">What is ZeroPool</a>
            </li>
            <li className="header__links__li">
              <a href="#technologies">Key technologies</a>
            </li>
            <li className="header__links__li">
              <a href="#news">Our news</a>
            </li>
            <li className="header__links__li">
              <a href="#partners">Our partners</a>
            </li>
            <li className="header__links__li">
              <a href="#contacts">Contact us</a>
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
