import React from "react";
import Hero from "./home/Hero";
import Application from "./home/Application";
import Recruitment from "./home/Requirement";
import Client from "./home/Client";
import Contact from "./home/Contact";
import Resource from "./ResourcesPage";

const Home = () => {
  return (
    <div>
      <Hero />
      <Application />
      <Recruitment />
      <Resource isHome={true} />
      <Client />
      <Contact />
    </div>
  );
};

export default Home;
