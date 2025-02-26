import React from "react";
import Category from "../components/category";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Header from "../components/header";
import MedicinesSlider from "../components/slider";
import EquipmentSlider from "../components/EquipmentSlider";
import BlogSection from "../components/blog";
import CustomerReviews from "../components/CustomerReviews";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Category />
      <MedicinesSlider/>
      <EquipmentSlider/>
      <BlogSection/>
      <CustomerReviews/>
    </div>
  );
};

export default HomePage;
