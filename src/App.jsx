import "./App.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import AuthCard from "./pages/Authpage";
import ResumeForm from "./pages/ResumeForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import AboutUs from "./pages/AboutUs";
import { sectionsData, teamData } from "./pages/aboutData";
import ContactUs from "./pages/contactUs";
import ProtectedRoute from "./components/ProtectedRoute";
import Paywall from "./pages/PayWall";
import Topbar from "./components/layouts/Topbar";
import ResourcesPage from "./pages/ResourcesPage";
import ResourceDetails from "./pages/ResourceDetails";
import FAQSection from "./pages/FAQ";
import NotFound from "./pages/error";
import ComingSoon from "./pages/ComingSoon";
import CancellationRefundPolicy from "./pages/CancellationRefundPolicy";
import TermsConditions from "./pages/TermsConditions";
import ShippingPolicy from "./pages/ShippingPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ResumeSample from "./pages/ResumeSample";
import GetAllResumes from "./pages/AllResume";
import ResumePage from "./pages/ResumePage";
import JsonToPdf from "./pages/ResumeSample";
import ProfilePage from "./pages/ProfilePage";
import SoftwareDevelopment from "./pages/footer/SoftwareDevlopemnt";
import ITConsulting from "./pages/footer/ItCounsutingPage";
import CloudSolutions from "./pages/footer/CloudSolution";
import DataAnalytics from "./pages/footer/DataAnalytics";
import Automation from "./pages/footer/Automation";
import WhyTracstars from "./pages/footer/WhyTracstars";
import HowWeWork from "./pages/footer/Howwework";
import TechInnovation from "./pages/footer/TechInnovation";
import IndustrySolutions from "./pages/footer/industrySolution";
import ScrollToTop from "./components/ScrolltoTop";
import Services from "./pages/footer/Services";
import OurSolutions from "./pages/footer/OutSolution";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Topbar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/login" element={<AuthCard />} />
          <Route path="/signup" element={<AuthCard />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:id" element={<ResourceDetails />} />
          <Route path="/faq" element={<FAQSection />} />
          <Route path="/my-resume" element={<GetAllResumes />} />
          <Route path="/resume/:id" element={<ResumePage />} />
          <Route path="/ex" element={<JsonToPdf />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/cancellation-refund-policy"
            element={<CancellationRefundPolicy />}
          />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/resume-builder"
            element={
              <ProtectedRoute>
                <ResumeForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={<AboutUs teamMembers={teamData} sections={sectionsData} />}
          />
          <Route path="/contact" element={<ContactUs />} />

          {/* footer pages */}
          <Route
            path="/software-development"
            element={<SoftwareDevelopment />}
          />
          <Route path="/it-consulting" element={<ITConsulting />} />
          <Route path="/cloud-solutions" element={<CloudSolutions />} />
          <Route path="/data-analytics" element={<DataAnalytics />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/why-us" element={<WhyTracstars />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
          <Route path="/industries" element={<IndustrySolutions />} />
          <Route path="/technology" element={<TechInnovation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<OurSolutions />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
