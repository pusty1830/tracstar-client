import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "How much does it cost to build a resume on Tracstars?",
    answer:
      "Our AI-powered resume builder is available at just ₹51 per resume. You’ll get a professional, ATS-friendly resume that can help you get hired faster.",
  },
  {
    question: "What payment methods are accepted for the resume builder?",
    answer:
      "We accept UPI, debit/credit cards, and other popular payment options in India for a smooth and secure payment experience.",
  },
  {
    question: "Is Tracstars Informatics free for job seekers?",
    answer:
      "Yes, searching and applying for jobs is completely free. The only paid feature is the resume builder (₹51), which is optional but highly recommended.",
  },
  {
    question: "Do I need to buy the resume to apply for jobs?",
    answer:
      "No. Applying for jobs is free. But if you want to stand out, you can purchase our AI-generated professional resume for ₹51.",
  },
  {
    question: "Can I edit my resume after purchasing?",
    answer:
      "Yes! You can edit and download your resume multiple times after purchase — no extra cost for edits.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section
        className="relative bg-cover bg-center bg-no-repeat py-24 text-white"
        style={{
          backgroundColor: "#041d29",
        }}
      >
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Common questions about Tracstars Informatics and our AI Resume
            Builder.
          </p>
        </div>
      </section>
      <section className="py-16 bg-white font-[Inter]" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none"
                >
                  <span className="font-semibold text-slate-900 text-base md:text-lg">
                    {faq.question}
                  </span>
                  <FiChevronDown
                    className={`text-xl text-slate-500 transform transition-transform duration-200 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeIndex === index && (
                  <div className="px-5 pb-4 text-slate-600 text-sm md:text-base border-t border-slate-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
