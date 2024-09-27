import { SignIn, SignInButton } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./components/ui/button";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Category from "./components/Category";
import MostSearchCar from "./components/MostSearchCar";
import Info from "./components/Info";
import Footer from "./components/Footer";

function Home() {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Hero */}
      <HeroSection />
      {/* Category */}
      <Category />
      {/* Most search car */}
      <MostSearchCar />
      {/* {Info section} */}
      <Info />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
