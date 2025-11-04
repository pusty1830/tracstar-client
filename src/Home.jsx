import Hero from "./components/layouts/Hero";
import TrustSection from "./components/layouts/TrustSection";
import FeaturesSection from "./components/layouts/FeaturesSection";
import ResumeTemplates from "./components/layouts/ResumeTemplates";
import ResumeSteps from "./components/layouts/ResumeSteps";

const Home = () => {
  return (
    <div>
      <Hero />
      <TrustSection />
      <FeaturesSection />
      <ResumeTemplates />
      <ResumeSteps />
    </div>
  );
};

export default Home;
