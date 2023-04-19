import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Hero from '../components/Hero'
import WhatIs from '../components/WhatIs'
import KeyTechnologies from '../components/KeyTechnologies'
import OurNews from '../components/OurNews'
import Grants from '../components/Grants'
import Footer from '../components/Footer'

import '/src/css/style.css'
import '/src/css/media.css'

export default function Home() {
  const [imgLoadSuccess, setImgLoadSuccess] = useState(false)

  useEffect(() => {
    const { hash } = window.location;
    if (hash !== '') {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({
          behavior: 'smooth',
        });
      }, 200);
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatIs />
        <KeyTechnologies />
        <OurNews />
        <Grants />
      </main>
      <Footer />
    </>
  );
}
