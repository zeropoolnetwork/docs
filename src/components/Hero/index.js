import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__img-block"/>
        <h1 className="hero__title">ZeroPool</h1>
        <div className="hero__subtitle">ZKP SOLUTION FOR BLOCKCHAIN</div>
        <div className="hero__text">New research on decentralized high soundness storage</div>
        <div className="hero__buttons-block">
          <a href="/pdf/WriteupZeroPoolShardedStorage.pdf" target="_blank" className="hero__button">Check out the paper</a>
        </div>
        <div> &nbsp;</div>
        <div className="hero__text">Privacy engine with low transaction fees, atomic swaps and common anonymity set</div>
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
          {/* <a href="https://explorer.gitcoin.co/#/round/424/0xd4cc0dd193c7dc1d665ae244ce12d7fab337a008/0xd4cc0dd193c7dc1d665ae244ce12d7fab337a008-153" className="hero__button hero__button--blue">Support us on Gitcoin!</a> */}
        </div>
      </div>
    </section>
  )
}

export default Hero;
