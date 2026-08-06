import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__img-block"/>
        <h1 className="hero__title">ZeroPool</h1>
        <div className="hero__subtitle">ZKP SOLUTION FOR BLOCKCHAIN</div>
        <div className="hero__text">ZK-driven data availability and storage</div>
        <div className="hero__buttons-block">
          <a href="https://github.com/zeropoolnetwork/sharded-storage-toy-model" target="_blank" className="hero__button hero__button--half">Toy Model</a>
          <a href="/pdf/WriteupZeroPoolShardedStorage.pdf" target="_blank" className="hero__button hero__button--half">Paper</a>
        </div>
        <div> &nbsp;</div>
        <div className="hero__text">Privacy engine with low transaction fees, atomic swaps and common anonymity set</div>
        <div className="hero__buttons-block">
          <div>
            <a href="https://github.com/zeropoolnetwork/zeropool-core" target="_blank" className="hero__button hero__button--half">
              Ethereum
            </a>
            <a href="https://github.com/zeropoolnetwork/zeropool-near" target="_blank" className="hero__button hero__button--half">
              NEAR
            </a>
          </div>
          <div>
            <a href="https://github.com/zeropoolnetwork/zeropool-substrate" target="_blank" className="hero__button hero__button--half">
              Substrate
            </a>
            <a href="https://github.com/zeropoolnetwork/zeropool-waves" target="_blank" className="hero__button hero__button--half">
              WAVES
            </a>
          </div>
          {/* <a href="https://explorer.gitcoin.co/#/round/424/0xd4cc0dd193c7dc1d665ae244ce12d7fab337a008/0xd4cc0dd193c7dc1d665ae244ce12d7fab337a008-153" className="hero__button hero__button--blue">Support us on Gitcoin!</a> */}
        </div>
      </div>
    </section>
  )
}

export default Hero;
