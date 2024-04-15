import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Docs = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="ZeroPool Documentation" description="Explore the documentation for ZeroPool's Privacy Engine and Sharded Storage">
      <div className="container margin-top--lg margin-bottom--lg">
        <h1 className="text--center">Welcome to the ZeroPool Documentation Site</h1>
        <div className="row">
          <div className="col col--6">
            <Link to="/docs/sharded-storage" className="card card--full-height">
              <div className="card__header">
                <h3>Sharded Storage</h3>
              </div>
              <div className="card__body">
                <p>Learn about our decentralized storage solution, featuring:</p>
                <ul>
                  <li>Zero-Knowledge Proofs</li>
                  <li>RS Codes</li>
                  <li>PoST mining</li>
                  <li>Recursive rollups</li>
                </ul>
                <div className="card__image">
                  <img src="/img/sharded-storage.svg" alt="Sharded Storage" />
                </div>
              </div>
              <div className="card__footer">
                <button className="button button--primary">Explore Docs</button>
              </div>
            </Link>
          </div>
          <div className="col col--6">
            <Link to="/docs/privacy-engine/" className="card card--full-height">
              <div className="card__header">
                <h3>Privacy Engine</h3>
              </div>
              <div className="card__body">
                <p>Explore our privacy-preserving technologies</p>
                <ul>
                  <li>Zero-Knowledge Proofs</li>
                  <li>Fawkes-crypto circuit builder</li>
                </ul>
                <div className="card__image">
                  <img src="/img/privacy-engine.svg" alt="Privacy Engine" />
                </div>
              </div>
              <div className="card__footer">
                <button className="button button--primary">Get Started</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Docs;