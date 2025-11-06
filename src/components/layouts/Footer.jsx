// Footer.jsx
import React from "react";
import logo from "../../assets/tracstar.png";
import { Link } from "react-router-dom";

/* ------------------------
   ✅ Navigation Data
------------------------- */
const footerMenu = {
  solutions: {
    title: "Our Solutions",
    buttonText: "OUR SOLUTIONS",
    buttonLink: "/solutions",
    desc: "Discover how Tracstar Informatics can help your business grow with innovative technology and strategic solutions.",
  },

  industries: {
    title: "Industries We Serve",
    buttonText: "OUR INDUSTRIES",
    buttonLink: "/industries",
    desc: "We work with multiple industries to deliver powerful and scalable digital solutions.",
  },

  servicesList: [
    { label: "SOFTWARE DEVELOPMENT", link: "/software-development" },
    { label: "IT CONSULTING", link: "/it-consulting" },
    { label: "CLOUD SOLUTIONS", link: "/cloud-solutions" },
    { label: "DATA ANALYTICS", link: "/data-analytics" },
    { label: "AUTOMATION", link: "/automation" },
  ],

  professionals: [
    { label: "FIND OPPORTUNITIES", link: "/coming-soon" },
    { label: "WORKING WITH TRACSTARS", link: "/coming-soon" },
    { label: "CAREER RESOURCES", link: "/coming-soon" },
  ],

  business: [
    { label: "WHY TRACSTARS", link: "/why-us" },
    { label: "HOW WE WORK", link: "/how-we-work" },
    { label: "INDUSTRY SOLUTIONS", link: "/industries" },
    { label: "TECH & INNOVATION", link: "/technology" },
    { label: "CONTACT US", link: "/contact" },
  ],

  about: [
    { label: "WHO WE ARE", link: "/about" },
    { label: "OUR SERVICES", link: "/services" },
    { label: "NEWS & INSIGHTS", link: "/resources" },
    { label: "JOIN OUR TEAM", link: "/coming-soon" },
    { label: "INVESTOR RELATIONS", link: "/coming-soon" },
  ],

  legal: [
    { label: "Terms & Conditions", path: "/terms-and-conditions" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Shipping & Delivery Policy", path: "/shipping-policy" },
    {
      label: "Cancellation & Refund Policy",
      path: "/cancellation-refund-policy",
    },
  ],
};

/* ------------------------
   ✅ Footer Component
------------------------- */
const Footer = () => {
  return (
    <footer className="bg-[#041d29] text-white pt-12 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left mb-8">
          {/* Solutions */}
          {[footerMenu.solutions, footerMenu.industries].map((section, i) => (
            <div key={i}>
              <h5 className="font-bold text-lg">{section.title}</h5>
              <p className="text-sm text-gray-400 mt-2 mb-4">{section.desc}</p>
              <Link
                to={section.buttonLink}
                className="inline-flex items-center border border-white/80 text-white text-sm px-4 py-2 rounded hover:bg-white/10 transition"
              >
                {section.buttonText}
              </Link>
            </div>
          ))}
        </div>

        <hr className="border-gray-700" />

        {/* Middle Nav */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          {/* Logo + services */}
          <div>
            <img
              src={logo}
              alt="Tracstar Informatics Logo"
              className="w-36 mb-4"
            />
            <ul className="mt-4 space-y-2">
              {footerMenu.servicesList.map((item) => (
                <li key={item.label}>
                  <Link
                    className="text-sm text-white hover:underline underline-offset-4"
                    to={item.link}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Professionals */}
          <FooterColumn
            title="For Professionals"
            items={footerMenu.professionals}
          />

          {/* Business */}
          <FooterColumn title="For Businesses" items={footerMenu.business} />

          {/* About */}
          <FooterColumn title="About Tracstar" items={footerMenu.about} />
        </div>

        <hr className="mt-8 border-gray-700" />

        {/* Bottom Links */}
        <div className="text-center text-sm mt-4 text-gray-400">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
            {footerMenu.legal.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="hover:text-gray-300 hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Credits */}
          <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-2 text-xs text-gray-400">
            <p>© Tracstar Informatics 2025</p>
            <span className="hidden md:inline-block mx-2">|</span>
            <p>
              Designed & Developed by{" "}
              <span className="text-white font-medium">
                Tracstars Informatics
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ------------------------
   ✅ Reusable Column Component
------------------------- */
const FooterColumn = ({ title, items }) => (
  <div>
    <h6 className="font-bold">{title}</h6>
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            to={item.link}
            className="text-sm text-white hover:underline underline-offset-4"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
