import React from 'react';
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
