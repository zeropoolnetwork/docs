import React from 'react'
import logo from '/static/img/ZEROpool_NEW_logo_bl.png'

const WhatIs = () => {
  return (
    <section className="what-is" id="what-is">
      <img className="what-is__img" src={logo} alt="logo"/>
      <h2 className="what-is__title">WHAT IS ZEROPOOL</h2>
      <div>
        <p className="what-is__text">ZeroPool is fully private multi-blokchain solution. Low transaction fees, atomic swaps and common anonymity
          set. Balances and transaction graph are hidden and compatibility with network identity hiding technologies, like
          Tor. You can deposit, transfer and withdraw tokens in our product.</p>
        <p className="what-is__text">The project was found at ethDenver by a group of reserchers and still developed as product with strong
          scientific base.</p>
      </div>
    </section>
  )
}

export default WhatIs;
