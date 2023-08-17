import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__img-block"/>
        <h1 className="hero__title">ZeroPool</h1>
        <div className="hero__subtitle">PRIVACY SOLUTION FOR BLOCKCHAIN</div>
        <div className="hero__text">Low transaction fees, atomic swaps and common anonymity set</div>
        <div className="hero__buttons-block">
          <a href="https://testnet.app.zeropool.network/" className="hero__button">Sepolia Ethereum Testnet</a>
          <a href="https://near.testnet.frontend.v2.zeropool.network/" className="hero__button">NEAR Testnet</a>
          <div>
            <a href="https://substrate.testnet.console.v2.zeropool.network/" className="hero__button hero__button--half">
              Substrate Testnet
            </a>
            <a href="https://waves.testnet.console.v2.zeropool.network/" className="hero__button hero__button--half">
              WAVES Testnet
            </a>
          </div>
          <a href="https://explorer.gitcoin.co/#/round/10/0x8de918f0163b2021839a8d84954dd7e8e151326d/0x8de918f0163b2021839a8d84954dd7e8e151326d-111" className="hero__button hero__button--blue">Support us on Gitcoin!</a>
        </div>
      </div>
    </section>
  )
}

export default Hero;
