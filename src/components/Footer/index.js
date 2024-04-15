import React from 'react';


const Footer = () => {
  return (
    <footer className="main-footer" id="contacts">
      <div className="main-container main-footer__container">
        <a className="main-footer__logo-link" href="/">
          <img className="main-footer__logo" src='/img/ZEROpool_NEW_logo_wh.png' alt="zeropool"/>
        </a>
        <div className="main-footer__social">
          <a className="main-footer__social-link" href="https://github.com/zeropoolnetwork">
            <img className="main-footer__social-img" src='/img/Github-icon.svg' alt="zeropool"/>
          </a>
          <a className="main-footer__social-link" href="https://medium.com/zeropool">
          <img className="main-footer__social-img" src='/img/Medium.svg' alt="zeropool"/>
          </a>
          <a className="main-footer__social-link" href="https://twitter.com/ZeroPoolNetwork">
          <img className="main-footer__social-img" src='/img/Twitter.svg' alt="zeropool"/>
          </a>
          <a className="main-footer__social-link" href="https://t.me/ZeroPoolCommunity">
            <img className="main-footer__social-img" src='/img/Telegram.svg' alt="zeropool"/>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
