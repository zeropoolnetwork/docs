import React from 'react';
import logo from '/static/img/ZEROpool_NEW_logo_wh.png'
import Icon1 from '/static/img/tech-icon1.svg'
import Icon2 from '/static/img/tech-icon2.svg'
import Icon3 from '/static/img/tech-icon3.svg'

const KeyTechnologies = () => {
  return (
    <section className="key-tech" id="technologies">
      <div className="main-container">
        <img className="key-tech__img" src={logo} alt="logo"/>
        <h2 className="key-tech__title">KEY TECHNOLOGIES</h2>
        <div className="key-tech__list main-row">
          <div className="key-tech__item-container">
            <div className="key-tech__item">
              <Icon1 className="key-tech__item-img"/>
              <div className="key-tech__item-info">
                <h3 className="key-tech__item-title">zkSNARKs</h3>
                <div className="key-tech__item-text">global privacy set</div>
              </div>
            </div>
          </div>
          <div className="key-tech__item-container">
            <div className="key-tech__item">
              <Icon2 className="key-tech__item-img"/>
              <div className="key-tech__item-info">
                <h3 className="key-tech__item-title">Rollups</h3>
                <div className="key-tech__item-text">cheap transaction</div>
              </div>
            </div>
          </div>
          <div className="key-tech__item-container">
            <div className="key-tech__item">
              <Icon3 className="key-tech__item-img"/>
              <div className="key-tech__item-info">
                <h3 className="key-tech__item-title">Tor</h3>
                <div className="key-tech__item-text">for network identity hiding</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KeyTechnologies;
