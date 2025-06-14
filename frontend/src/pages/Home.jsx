import React, { useEffect, useState } from "react";
import HeroSection from "../homecomponents/HeroSection";
import Testimonials from "../homecomponents/Testimonials";
import HowItWorks from "../homecomponents/HowItWorks";
import CategorySidebar from "../homecomponents/CategorySidebar";
import Layout  from "../components/Layout";
import LatestBuyLeads from "../homecomponents/LatestBuyLeads";

const Home = () => {
  return (<>
    <Layout>
    <HeroSection/>
    <HowItWorks/>
    <CategorySidebar/>
    <LatestBuyLeads/>
    <Testimonials/>
    </Layout>
  </>
  );
};

export default Home;
