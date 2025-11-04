import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createContact } from "../services/services";
import toast from "react-hot-toast";

// ✅ Validation Schema
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  subject: Yup.string()
    .min(3, "Subject must be at least 3 characters")
    .required("Subject is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const ContactSection = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log("✅ Form Data:", values);
    const payLoad = {
      ...values,
    };
    createContact(payLoad).then((res) => {
      toast(res?.data?.msg);
      resetForm();
    });
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
            Get in Touch With Tracstars Informatics
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            We’d love to hear from you. Fill out the form and we’ll get back to
            you shortly.
          </p>
        </div>
      </section>
      <section className="py-16 bg-slate-50 font-[Inter]" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Get in Touch
          </h2>
          <p className="mt-2 text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
            We’d love to hear from you. Fill out the form and we’ll get back to
            you shortly.
          </p>
        </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Side: Info */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  📍 Office
                </h3>
                <p className="text-slate-600 text-sm">
                  Tracstars Informatics <br />
                  GA-540, Sailashree Vihar, Chandrasekharpur, Bhubaneswar,
                  India, 751021
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  📧 Email
                </h3>
                <p className="text-slate-600 text-sm">
                  support@tracstarsinformatics.com/info@tracstarsinformatics.com
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  📞 Phone
                </h3>
                <p className="text-slate-600 text-sm">+91 9853759132</p>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <Formik
              initialValues={{
                name: "",
                email: "",
                subject: "",
                message: "",
              }}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Field
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="Your Message"
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "SEND MESSAGE"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
