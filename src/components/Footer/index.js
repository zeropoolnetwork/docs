import React from 'react';
import logo from '/static/img/ZEROpool_NEW_logo_wh.png'
import Medium from '/static/img/Medium.svg'
import Telegram from '/static/img/Telegram.svg'
import Twitter from '/static/img/Twitter.svg'

const Footer = () => {
  return (
    <footer className="main-footer" id="contacts">
      <div className="container main-footer__container">
        <a className="main-footer__logo-link" href="/">
          <img className="main-footer__logo" src={logo} alt="zeropool"/>
        </a>
        <div className="main-footer__social">
          <a className="main-footer__social-link" href="https://medium.com/@ZeroPoolNetwork">
            <Medium className="main-footer__social-img" />
          </a>
          <a className="main-footer__social-link" href="https://twitter.com/ZeroPoolNetwork">
            <Twitter className="main-footer__social-img" />
          </a>
          <a className="main-footer__social-link" href="https://t.me/ZeroPoolCommunity">
            <Telegram className="main-footer__social-img" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
