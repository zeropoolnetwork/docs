import React from 'react';
import logo from '/static/img/ZEROpool_NEW_logo_wh.png'
import Medium from '/static/img/Medium.svg'
import Telegram from '/static/img/Telegram.svg'
import Twitter from '/static/img/Twitter.svg'

const Footer = () => {
  return (
    <footer className="footer" id="contacts">
      <div className="container footer__container">
        <a className="footer__logo-link" href="/">
          <img className="footer__logo" src={logo} alt="zeropool"/>
        </a>
        <div className="footer__social">
          <a className="footer__social-link" href="https://medium.com/@ZeroPoolNetwork">
            <Medium className="footer__social-img" />
          </a>
          <a className="footer__social-link" href="https://twitter.com/ZeroPoolNetwork">
            <Twitter className="footer__social-img" />
          </a>
          <a className="footer__social-link" href="https://t.me/ZeroPoolCommunity">
            <Telegram className="footer__social-img" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
