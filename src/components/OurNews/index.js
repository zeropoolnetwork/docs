import React from 'react'
import logo from '/static/img/ZEROpool_NEW_logo_bl.png'
import cardImg1 from '/static/img/news-oct.png'
import cardImg2 from '/static/img/news-fawkes.png'

const OurNews = () => {
  return (
    <section className="our-news" id="news">
      <div className="container">
        <img className="our-news__img" src={logo} alt="logo"/>
        <h2 className="our-news__title">OUR NEWS</h2>
        <div className="our-news__cards row">
          <div className="our-news__card">
            <a href="https://medium.com/zeropool/zeropool-october-update-cd4390bf126c" className="our-news__card-content">
              <img className="our-news__card-img" src={cardImg1} alt="card-image"/>
              <h3 className="our-news__card-title">October update</h3>
              <p className="our-news__card-text">Here are some news about what we have done and what ze are going to
                do</p>
            </a>
          </div>
          <div className="our-news__card">
            <div className="our-news__card-content">
              <img className="our-news__card-img" src={cardImg2} alt="card-image"/>
              <h3 className="our-news__card-title">Hi! We've just released Fawkes-crypto v3.0.</h3>
              <p className="our-news__card-text">It means now it is not only R1CS but also PLONK constraint system is
                supported too. All who have PLONK prover implemented you are welcome to collaborate with us.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurNews
