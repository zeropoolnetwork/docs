import React from 'react';
import web3img from '/static/img/web3_foundation_gran.jpg'
import wavesImg from '/static/img/waves-koers.jpg'
import nearImg from '/static/img/Near-protocol-main.png'
import consensysImg from '/static/img/consensys.jpg'

const Grants = () => {
  return (
    <section className="grants" id="partners">
      <div className="container">
        <h2 className="grants__title">GRANTS</h2>
        <div className="grants__list row">
          <div className="grants__item">
            <img className="grants__item-img" src={web3img} alt="web3"/>
          </div>
          <div className="grants__item">
            <img className="grants__item-img" src={wavesImg} alt="waves"/>
          </div>
          <div className="grants__item">
            <img className="grants__item-img" src={nearImg} alt="near"/>
          </div>
          <div className="grants__item">
            <img className="grants__item-img" src={consensysImg} alt="consensys"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Grants
