import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__img-block"/>
      <h1 className="hero__title">ZeroPool</h1>
      <div className="hero__subtitle">PRIVACY SOLUTION FOR BLOCKCHAIN</div>
      <div className="hero__text">Low transaction fees, atomic swaps and common anonymity set</div>
      <div className="hero__buttons-block">
        <a href="https://kovan.testnet.console.v2.zeropool.network/" className="hero__button">Ethereum testnet v2</a>
        <div>
          <a href="https://app.zeropool.network/" className="hero__button hero__button--half">Ethereum mainnet beta</a>
          <a href="https://testnet.app.zeropool.network/" className="hero__button hero__button--half">Ethereum testnet beta</a>
        </div>
        <a href="https://gitcoin.co/grants/172/zeropool" className="hero__button hero__button--blue">Support us on Gitcoin!</a>
      </div>
    </section>
  )
}

export default Hero;
