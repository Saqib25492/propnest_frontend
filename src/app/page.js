'use client';

import Hero from "./components/Hero"
import FeatureCards from "./components/FeatureCards"
import PropertyGrid from "./components/PropertyGrid"
import Testimonials from "./components/Testimonials"
import Footer from "./components/Footer";


export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <PropertyGrid />
      <Testimonials />
      <Footer />
    </>
  )
}

