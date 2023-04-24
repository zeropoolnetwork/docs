import React from 'react';
import web3img from '/static/img/web3_foundation_gran.jpg'
import wavesImg from '/static/img/waves-koers.jpg'
import nearImg from '/static/img/Near-protocol-main.png'
import consensysImg from '/static/img/consensys.jpg'
import zkbobImg from '/static/img/zkbob.png'

const Partners = () => {
  return (
    <section className="grants" id="partners">
      <div className="main-container">
        <h2 className="grants__title">PARTNERS</h2>
        <div className="grants__list main-row">
          <div className="grants__item">
            <img className="grants__item-img" src={web3img} alt="web3" title="web3"/>
          </div>
          <div className="grants__item">
            <img className="grants__item-img" src={wavesImg} alt="waves" title="waves"/>
          </div>
          <div className="grants__item">
            <img className="grants__item-img" src={nearImg} alt="near" title="near"/>
          </div>
          <div className="grants__item">
            <img className="grants__item-img" src={consensysImg} alt="consensys" title="consensys"/>
          </div>
          <div className="grants__item">
            <img className="grants__item-img" src={zkbobImg} alt="zkbob" title="zkbob"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partners
