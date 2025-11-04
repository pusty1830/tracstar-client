import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ai, createResume, updatePayment } from "../services/services";
import { toast, Toaster } from "react-hot-toast";
import { getUserId } from "../services/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResumeForm() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedContent, setAiGeneratedContent] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const location = useLocation();

  // ✅ Create a URLSearchParams object
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("paymentId");

  // Validation schemas for each step
  const validationSchemas = [
    Yup.object({
      personal: Yup.object({
        name: Yup.string().required("Full name is required"),
        title: Yup.string().required("Professional title is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        phone: Yup.string().matches(
          /^[+]?[\d\s-()]{10,}$/,
          "Invalid phone number"
        ),
        location: Yup.string(),
        website: Yup.string().url("Must be a valid URL"),
        linkedin: Yup.string().url("Must be a valid URL"),
        github: Yup.string().url("Must be a valid URL"),
        summary: Yup.string().max(
          500,
          "Summary should be less than 500 characters"
        ),
      }),
    }),
    Yup.object({
      experience: Yup.array().of(
        Yup.object({
          company: Yup.string().required("Company is required"),
          role: Yup.string().required("Role is required"),
          period: Yup.string().required("Period is required"),
          bullets: Yup.array().of(
            Yup.string().max(200, "Bullet point too long")
          ),
        })
      ),
    }),
    Yup.object({
      education: Yup.array().of(
        Yup.object({
          degree: Yup.string().required("Degree is required"),
          school: Yup.string().required("School is required"),
          period: Yup.string().required("Period is required"),
          extra: Yup.string(),
        })
      ),
    }),
    Yup.object({
      projects: Yup.array().of(
        Yup.object({
          name: Yup.string().required("Project name is required"),
          url: Yup.string().url("Must be a valid URL"),
          desc: Yup.string().max(400, "Description too long"),
        })
      ),
    }),
    Yup.object({
      skills: Yup.array().of(
        Yup.string().min(2, "Skill should be at least 2 characters")
      ),
    }),
    Yup.object({}), // No validation for review step
  ];
  const navigate = useNavigate();

  const handleSubmitAndDownload = async () => {
    const payload = {
      userId: getUserId(),
      personal: {
        name: formik.values.personal.name,
        title: formik.values.personal.title,
        email: formik.values.personal.email,
        phone: formik.values.personal.phone,
        location: formik.values.personal.location,
        website: formik.values.personal.website,
        linkedin: formik.values.personal.linkedin,
        github: formik.values.personal.github,
        summary: formik.values.personal.summary,
      },
      experience: formik.values.experience,
      education: formik.values.education,
      projects: formik.values.projects,
      skills: formik.values.skills,
      links: [
        formik.values.personal.website,
        formik.values.personal.github,
        formik.values.personal.linkedin,
      ].filter(Boolean),
    };

    console.log("Payload to submit and download:", payload);

    try {
      // Example: you could send it to backend
      createResume(payload).then((res) => {
        updatePayment(paymentId, { isComplete: true }).then((res) => {
          toast.success(res?.data?.msg);
          navigate("/my-resume");
        });
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while submitting!");
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      personal: {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        summary: "",
      },
      experience: [{ company: "", role: "", period: "", bullets: [""] }],
      education: [{ degree: "", school: "", period: "", extra: "" }],
      projects: [{ name: "", url: "", desc: "" }],
      skills: [""],
    },
    validationSchema: validationSchemas[step - 1],
    onSubmit: async (values) => {
      setIsGenerating(true);
      try {
        const result = await Ai(values);
        console.log("AI Response:", result);

        // Handle different response structures
        const aiData = result?.data?.data || result?.data || result;
        setAiGeneratedContent(aiData);
        setIsGenerating(false);
        toast.success("AI content generated successfully!");
        setShowAiSuggestions(true);
        setStep(6);
      } catch (error) {
        setIsGenerating(false);
        toast.error("Failed to generate AI content. Please try again.");
        console.error("AI Generation Error:", error);
      }
    },
  });

  // Handle changes for dynamic sections
  const handleChange = (section, index, field, value) => {
    const updatedSection = [...formik.values[section]];
    updatedSection[index][field] = value;
    formik.setFieldValue(section, updatedSection);
  };

  // Handle bullet points changes
  const handleBulletChange = (section, index, bulletIndex, value) => {
    const updatedSection = [...formik.values[section]];
    updatedSection[index].bullets[bulletIndex] = value;
    formik.setFieldValue(section, updatedSection);
  };

  // Add bullet point
  const addBullet = (section, index) => {
    const updatedSection = [...formik.values[section]];
    updatedSection[index].bullets.push("");
    formik.setFieldValue(section, updatedSection);
  };

  // Remove bullet point
  const removeBullet = (section, index, bulletIndex) => {
    const updatedSection = [...formik.values[section]];
    if (updatedSection[index].bullets.length > 1) {
      updatedSection[index].bullets.splice(bulletIndex, 1);
      formik.setFieldValue(section, updatedSection);
    }
  };

  // Handle personal section changes
  const handlePersonalChange = (field, value) => {
    formik.setFieldValue(`personal.${field}`, value);
  };

  // Add new entry
  const addEntry = (section, template) => {
    const currentValues = [...formik.values[section]];
    formik.setFieldValue(section, [...currentValues, template]);
  };

  // Remove entry
  const removeEntry = (section, index) => {
    const updatedSection = [...formik.values[section]];
    updatedSection.splice(index, 1);
    formik.setFieldValue(section, updatedSection);
  };

  const nextStep = async () => {
    if (step === 6 && !isEditing) {
      // Final submission to generate resume
      setShowTemplates(true);
      return;
    }

    if (step === 6 && isEditing) {
      // After editing, go to template selection
      setIsEditing(false);
      setShowTemplates(true);
      return;
    }

    try {
      await validationSchemas[step - 1].validate(formik.values, {
        abortEarly: false,
      });
      setStep((prev) => prev + 1);
    } catch (validationErrors) {
      toast.error("Please fix the validation errors before proceeding.");
    }
  };

  const prevStep = () => {
    if (step === 6 && showTemplates) {
      setShowTemplates(false);
      setStep(5);
    } else if (step === 6 && isEditing) {
      setIsEditing(false);
      setStep(5);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  // Apply AI suggestions for a specific section
  const applyAiSuggestions = (section) => {
    if (aiGeneratedContent && aiGeneratedContent[section]) {
      formik.setFieldValue(section, aiGeneratedContent[section]);
      toast.success(`AI suggestions applied for ${section}!`);
    }
  };

  // Apply all AI suggestions
  const applyAllAiSuggestions = () => {
    if (aiGeneratedContent) {
      Object.keys(aiGeneratedContent).forEach((section) => {
        if (formik.values[section] !== undefined) {
          formik.setFieldValue(section, aiGeneratedContent[section]);
        }
      });
      toast.success("All AI suggestions applied successfully!");
      setShowAiSuggestions(false);
    }
  };

  // Enable editing mode
  const enableEditing = () => {
    setIsEditing(true);
    setStep(1); // Go back to first step for editing
  };

  // Final resume generation
  const generateResume = () => {
    toast.success(`Resume generated with ${selectedTemplate?.name} template!`);
    // Here you would typically redirect to resume preview or download
    console.log("Final Resume Data:", formik.values);
    console.log("Selected Template:", selectedTemplate);
    console.log("AI Generated Content:", aiGeneratedContent);
  };

  // Progress percentage for progress bar
  const progress = (step / 6) * 100;

  // Template options
  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and contemporary design",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "Creative",
      description: "Ideal for designers and creatives",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 3,
      name: "Executive",
      description: "Formal and traditional layout",
      color: "from-gray-500 to-gray-600",
    },
    {
      id: 4,
      name: "Minimalist",
      description: "Simple and focused on content",
      color: "from-green-500 to-green-600",
    },
  ];

  // Check if section has data
  const hasData = (section) => {
    if (Array.isArray(formik.values[section])) {
      return formik.values[section].some((item) =>
        Object.values(item).some(
          (value) => value && value.toString().trim() !== ""
        )
      );
    }
    return false;
  };

  // Check if AI section has data
  const hasAiData = (section) => {
    if (aiGeneratedContent && Array.isArray(aiGeneratedContent[section])) {
      return aiGeneratedContent[section].some((item) =>
        Object.values(item).some(
          (value) => value && value.toString().trim() !== ""
        )
      );
    }
    return false;
  };

  // Render comparison section
  const renderComparisonSection = (section, title, fields) => {
    const originalData = formik.values[section];
    const aiData = aiGeneratedContent?.[section];

    if (!hasData(section) && !hasAiData(section)) return null;

    return (
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {hasAiData(section) && (
            <button
              type="button"
              onClick={() => applyAiSuggestions(section)}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            >
              Apply AI Version
            </button>
          )}
        </div>

        {/* Original Data */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Your Version:</h4>
          {hasData(section) ? (
            Array.isArray(originalData) ? (
              originalData.map(
                (item, index) =>
                  item &&
                  Object.values(item).some(
                    (val) => val && val.toString().trim() !== ""
                  ) && (
                    <div
                      key={index}
                      className={
                        index > 0 ? "mt-3 pt-3 border-t border-gray-200" : ""
                      }
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {fields.map(
                          (field) =>
                            item[field.key] && (
                              <div key={field.key}>
                                <span className="font-medium">
                                  {field.label}:
                                </span>{" "}
                                {item[field.key]}
                              </div>
                            )
                        )}
                      </div>
                      {item.bullets &&
                        item.bullets.some(
                          (bullet) => bullet && bullet.trim() !== ""
                        ) && (
                          <div className="mt-2">
                            <span className="font-medium">Bullet Points:</span>
                            <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                              {item.bullets.map(
                                (bullet, bulletIndex) =>
                                  bullet &&
                                  bullet.trim() !== "" && (
                                    <li key={bulletIndex}>{bullet}</li>
                                  )
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  )
              )
            ) : (
              <div className="text-gray-600">No data provided</div>
            )
          ) : (
            <div className="text-gray-600">No data provided</div>
          )}
        </div>

        {/* AI Generated Data */}
        {hasAiData(section) && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">
              AI Enhanced Version:
            </h4>
            {Array.isArray(aiData) ? (
              aiData.map(
                (item, index) =>
                  item &&
                  Object.values(item).some(
                    (val) => val && val.toString().trim() !== ""
                  ) && (
                    <div
                      key={index}
                      className={
                        index > 0 ? "mt-3 pt-3 border-t border-blue-200" : ""
                      }
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {fields.map(
                          (field) =>
                            item[field.key] && (
                              <div key={field.key}>
                                <span className="font-medium">
                                  {field.label}:
                                </span>
                                <span className="text-blue-700">
                                  {" "}
                                  {item[field.key]}
                                </span>
                              </div>
                            )
                        )}
                      </div>
                      {item.bullets &&
                        item.bullets.some(
                          (bullet) => bullet && bullet.trim() !== ""
                        ) && (
                          <div className="mt-2">
                            <span className="font-medium">Bullet Points:</span>
                            <ul className="list-disc list-inside text-blue-700 text-sm mt-1">
                              {item.bullets.map(
                                (bullet, bulletIndex) =>
                                  bullet &&
                                  bullet.trim() !== "" && (
                                    <li key={bulletIndex}>{bullet}</li>
                                  )
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  )
              )
            ) : (
              <div className="text-blue-600">
                AI couldn't generate enhanced content
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <Toaster position="top-right" />

      <div className="max-w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 text-center">
          <h1 className="text-3xl font-bold mb-2">AI Resume Builder</h1>
          <p className="opacity-90">
            Create a professional resume in minutes with AI assistance
          </p>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="p-6 md:p-8">
          {/* Step Indicator */}
          {!showTemplates && (
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200 -z-10 mx-10"></div>
              {[
                "Personal",
                "Experience",
                "Education",
                "Projects",
                "Skills",
                "Review",
              ].map((label, i) => (
                <div key={i} className="flex flex-col items-center z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      step >= i + 1 ? "bg-indigo-600 shadow-md" : "bg-gray-300"
                    }`}
                  >
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      step === i + 1
                        ? "text-indigo-600 font-bold"
                        : "text-gray-500"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* AI Generation Loader */}
          {isGenerating && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-md mx-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">
                  AI is generating your resume
                </h3>
                <p className="text-gray-600 text-center">
                  This may take a few moments...
                </p>
              </div>
            </div>
          )}

          {/* Template Selection */}
          {showTemplates && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                Choose a Template
              </h2>
              <p className="text-gray-600">Select a template for your resume</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${template.color} mb-4`}
                    ></div>
                    <h3 className="font-semibold text-lg mb-2">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {template.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowTemplates(false);
                    setStep(6);
                  }}
                  className="px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium flex items-center transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back to Review
                </button>

                <button
                  type="button"
                  onClick={generateResume}
                  disabled={!selectedTemplate}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 font-medium flex items-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Generate Resume
                </button>
              </div>
            </div>
          )}

          {/* Form Content */}
          {!showTemplates && (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formik.values.personal.name}
                        onChange={(e) =>
                          handlePersonalChange("name", e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                          formik.touched.personal?.name &&
                          formik.errors.personal?.name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formik.touched.personal?.name &&
                        formik.errors.personal?.name && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.personal.name}
                          </div>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Professional Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full-stack Developer"
                        value={formik.values.personal.title}
                        onChange={(e) =>
                          handlePersonalChange("title", e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                          formik.touched.personal?.title &&
                          formik.errors.personal?.title
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formik.touched.personal?.title &&
                        formik.errors.personal?.title && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.personal.title}
                          </div>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formik.values.personal.email}
                        onChange={(e) =>
                          handlePersonalChange("email", e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                          formik.touched.personal?.email &&
                          formik.errors.personal?.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formik.touched.personal?.email &&
                        formik.errors.personal?.email && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.personal.email}
                          </div>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        placeholder="+1 (555) 123-4567"
                        value={formik.values.personal.phone}
                        onChange={(e) =>
                          handlePersonalChange("phone", e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                          formik.touched.personal?.phone &&
                          formik.errors.personal?.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formik.touched.personal?.phone &&
                        formik.errors.personal?.phone && (
                          <div className="text-red-500 text-sm mt-1">
                            {formik.errors.personal.phone}
                          </div>
                        )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="New York, NY"
                        value={formik.values.personal.location}
                        onChange={(e) =>
                          handlePersonalChange("location", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        placeholder="https://yourwebsite.com"
                        value={formik.values.personal.website}
                        onChange={(e) =>
                          handlePersonalChange("website", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={formik.values.personal.linkedin}
                        onChange={(e) =>
                          handlePersonalChange("linkedin", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GitHub
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/yourusername"
                        value={formik.values.personal.github}
                        onChange={(e) =>
                          handlePersonalChange("github", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Summary
                    </label>
                    <textarea
                      placeholder="Full-stack developer with 1+ years of experience delivering scalable web applications and cloud deployments using React.js, Node.js, and AWS..."
                      rows={3}
                      value={formik.values.personal.summary}
                      onChange={(e) =>
                        handlePersonalChange("summary", e.target.value)
                      }
                      onBlur={formik.handleBlur}
                      className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                        formik.touched.personal?.summary &&
                        formik.errors.personal?.summary
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formik.touched.personal?.summary &&
                      formik.errors.personal?.summary && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.personal.summary}
                        </div>
                      )}
                    <div className="text-sm text-gray-500 mt-1">
                      {formik.values.personal.summary.length}/500 characters
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Experience */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    Work Experience
                  </h2>

                  {formik.values.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 hover:bg-gray-50 transition"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-700">
                          Experience #{index + 1}
                        </h3>
                        {formik.values.experience.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEntry("experience", index)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Google Inc."
                            value={exp.company}
                            onChange={(e) =>
                              handleChange(
                                "experience",
                                index,
                                "company",
                                e.target.value
                              )
                            }
                            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                              formik.errors.experience?.[index]?.company
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formik.errors.experience?.[index]?.company && (
                            <div className="text-red-500 text-sm mt-1">
                              {formik.errors.experience[index].company}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Senior Developer"
                            value={exp.role}
                            onChange={(e) =>
                              handleChange(
                                "experience",
                                index,
                                "role",
                                e.target.value
                              )
                            }
                            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                              formik.errors.experience?.[index]?.role
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formik.errors.experience?.[index]?.role && (
                            <div className="text-red-500 text-sm mt-1">
                              {formik.errors.experience[index].role}
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Period *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Apr 2025 – Aug 2025"
                            value={exp.period}
                            onChange={(e) =>
                              handleChange(
                                "experience",
                                index,
                                "period",
                                e.target.value
                              )
                            }
                            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                              formik.errors.experience?.[index]?.period
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formik.errors.experience?.[index]?.period && (
                            <div className="text-red-500 text-sm mt-1">
                              {formik.errors.experience[index].period}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bullet Points
                        </label>
                        {exp.bullets.map((bullet, bulletIndex) => (
                          <div
                            key={bulletIndex}
                            className="flex items-center mb-2"
                          >
                            <input
                              type="text"
                              placeholder="Describe your responsibilities and achievements..."
                              value={bullet}
                              onChange={(e) =>
                                handleBulletChange(
                                  "experience",
                                  index,
                                  bulletIndex,
                                  e.target.value
                                )
                              }
                              className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                            />
                            {exp.bullets.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeBullet("experience", index, bulletIndex)
                                }
                                className="ml-2 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addBullet("experience", index)}
                          className="flex items-center text-sm text-indigo-600 hover:text-indigo-700 mt-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Add Bullet Point
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      addEntry("experience", {
                        company: "",
                        role: "",
                        period: "",
                        bullets: [""],
                      })
                    }
                    className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-indigo-600 hover:border-indigo-400 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Another Experience
                  </button>
                </div>
              )}

              {/* Step 3: Education */}
              {step === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    Education
                  </h2>

                  {formik.values.education.map((edu, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 hover:bg-gray-50 transition"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-700">
                          Education #{index + 1}
                        </h3>
                        {formik.values.education.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEntry("education", index)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Degree *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Bachelor of Science in Computer Science"
                            value={edu.degree}
                            onChange={(e) =>
                              handleChange(
                                "education",
                                index,
                                "degree",
                                e.target.value
                              )
                            }
                            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                              formik.errors.education?.[index]?.degree
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formik.errors.education?.[index]?.degree && (
                            <div className="text-red-500 text-sm mt-1">
                              {formik.errors.education[index].degree}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            School *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Stanford University"
                            value={edu.school}
                            onChange={(e) =>
                              handleChange(
                                "education",
                                index,
                                "school",
                                e.target.value
                              )
                            }
                            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                              formik.errors.education?.[index]?.school
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formik.errors.education?.[index]?.school && (
                            <div className="text-red-500 text-sm mt-1">
                              {formik.errors.education[index].school}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Period *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Sept 2022 – Apr 2026"
                            value={edu.period}
                            onChange={(e) =>
                              handleChange(
                                "education",
                                index,
                                "period",
                                e.target.value
                              )
                            }
                            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                              formik.errors.education?.[index]?.period
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formik.errors.education?.[index]?.period && (
                            <div className="text-red-500 text-sm mt-1">
                              {formik.errors.education[index].period}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Info
                          </label>
                          <input
                            type="text"
                            placeholder="CGPA: 9.11/10"
                            value={edu.extra}
                            onChange={(e) =>
                              handleChange(
                                "education",
                                index,
                                "extra",
                                e.target.value
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      addEntry("education", {
                        degree: "",
                        school: "",
                        period: "",
                        extra: "",
                      })
                    }
                    className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-indigo-600 hover:border-indigo-400 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Another Education
                  </button>
                </div>
              )}

              {/* Step 4: Projects */}
              {step === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    Projects
                  </h2>

                  {formik.values.projects.map((project, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 hover:bg-gray-50 transition"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-700">
                          Project #{index + 1}
                        </h3>
                        {formik.values.projects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEntry("projects", index)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Project Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="E-commerce Website"
                            value={project.name}
                            onChange={(e) =>
                              handleChange(
                                "projects",
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                              formik.errors.projects?.[index]?.name
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formik.errors.projects?.[index]?.name && (
                            <div className="text-red-500 text-sm mt-1">
                              {formik.errors.projects[index].name}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Project URL
                          </label>
                          <input
                            type="url"
                            placeholder="https://github.com/username/project"
                            value={project.url}
                            onChange={(e) =>
                              handleChange(
                                "projects",
                                index,
                                "url",
                                e.target.value
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            placeholder="Describe the project, technologies used, and your role..."
                            rows={3}
                            value={project.desc}
                            onChange={(e) =>
                              handleChange(
                                "projects",
                                index,
                                "desc",
                                e.target.value
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                          />
                          <div className="text-sm text-gray-500 mt-1">
                            {project.desc?.length || 0}/400 characters
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      addEntry("projects", {
                        name: "",
                        url: "",
                        desc: "",
                      })
                    }
                    className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-indigo-600 hover:border-indigo-400 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Another Project
                  </button>
                </div>
              )}

              {/* Step 5: Skills */}
              {step === 5 && (
                <div className="space-y-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
                    Skills
                  </h2>
                  <p className="text-gray-600">
                    Add your key skills and areas of expertise
                  </p>

                  <div className="space-y-4">
                    {formik.values.skills.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          placeholder={`Skill ${
                            index + 1
                          } (e.g., JavaScript, Project Management)`}
                          value={skill}
                          onChange={(e) => {
                            const updated = [...formik.values.skills];
                            updated[index] = e.target.value;
                            formik.setFieldValue("skills", updated);
                          }}
                          onBlur={formik.handleBlur}
                          className={`flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition ${
                            formik.errors.skills?.[index]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {formik.values.skills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEntry("skills", index)}
                            className="ml-3 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => addEntry("skills", "")}
                    className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-indigo-600 hover:border-indigo-400 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Another Skill
                  </button>

                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <h4 className="font-medium text-indigo-800 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      AI Tip
                    </h4>
                    <p className="text-indigo-700 text-sm mt-1">
                      Include both technical and soft skills. Group related
                      skills together and consider adding proficiency levels.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 6: Review & AI Generation */}
              {step === 6 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Review Your Resume
                    </h2>
                    <div className="flex gap-2">
                      {aiGeneratedContent && !isEditing && (
                        <button
                          type="button"
                          onClick={enableEditing}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                          Edit Resume
                        </button>
                      )}
                      {showAiSuggestions && (
                        <button
                          type="button"
                          onClick={applyAllAiSuggestions}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          Apply All AI Suggestions
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600">
                    Check all information before generating your resume
                    {aiGeneratedContent && " - AI suggestions available below"}
                  </p>

                  {aiGeneratedContent && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-medium text-blue-800 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        AI Analysis Complete
                      </h4>
                      <p className="text-blue-700 text-sm mt-1">
                        Our AI has analyzed your resume and suggests optimized
                        content for better ATS compatibility. Compare your
                        original content with AI-enhanced versions below.
                      </p>
                    </div>
                  )}

                  {/* Comparison Sections */}
                  <div className="space-y-6">
                    {/* Personal Information Comparison */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Personal Information
                        </h3>
                        {aiGeneratedContent?.personal && (
                          <button
                            type="button"
                            onClick={() => applyAiSuggestions("personal")}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                          >
                            Apply AI Version
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Original Personal Info */}
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Your Version:
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Name:</span>{" "}
                              {formik.values.personal.name}
                            </div>
                            <div>
                              <span className="font-medium">Title:</span>{" "}
                              {formik.values.personal.title}
                            </div>
                            <div>
                              <span className="font-medium">Email:</span>{" "}
                              {formik.values.personal.email}
                            </div>
                            <div>
                              <span className="font-medium">Phone:</span>{" "}
                              {formik.values.personal.phone}
                            </div>
                            <div>
                              <span className="font-medium">Location:</span>{" "}
                              {formik.values.personal.location}
                            </div>
                            {formik.values.personal.website && (
                              <div>
                                <span className="font-medium">Website:</span>{" "}
                                {formik.values.personal.website}
                              </div>
                            )}
                            {formik.values.personal.linkedin && (
                              <div>
                                <span className="font-medium">LinkedIn:</span>{" "}
                                {formik.values.personal.linkedin}
                              </div>
                            )}
                            {formik.values.personal.github && (
                              <div>
                                <span className="font-medium">GitHub:</span>{" "}
                                {formik.values.personal.github}
                              </div>
                            )}
                            {formik.values.personal.summary && (
                              <div>
                                <span className="font-medium">Summary:</span>
                                <p className="text-gray-700 mt-1">
                                  {formik.values.personal.summary}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* AI Enhanced Personal Info */}
                        {aiGeneratedContent?.personal && (
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-800 mb-2">
                              AI Enhanced Version:
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium">Name:</span>{" "}
                                <span className="text-blue-700">
                                  {aiGeneratedContent.personal.name}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium">Title:</span>{" "}
                                <span className="text-blue-700">
                                  {aiGeneratedContent.personal.title}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium">Email:</span>{" "}
                                <span className="text-blue-700">
                                  {aiGeneratedContent.personal.email}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium">Phone:</span>{" "}
                                <span className="text-blue-700">
                                  {aiGeneratedContent.personal.phone}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium">Location:</span>{" "}
                                <span className="text-blue-700">
                                  {aiGeneratedContent.personal.location}
                                </span>
                              </div>
                              {aiGeneratedContent.personal.website && (
                                <div>
                                  <span className="font-medium">Website:</span>{" "}
                                  <span className="text-blue-700">
                                    {aiGeneratedContent.personal.website}
                                  </span>
                                </div>
                              )}
                              {aiGeneratedContent.personal.linkedin && (
                                <div>
                                  <span className="font-medium">LinkedIn:</span>{" "}
                                  <span className="text-blue-700">
                                    {aiGeneratedContent.personal.linkedin}
                                  </span>
                                </div>
                              )}
                              {aiGeneratedContent.personal.github && (
                                <div>
                                  <span className="font-medium">GitHub:</span>{" "}
                                  <span className="text-blue-700">
                                    {aiGeneratedContent.personal.github}
                                  </span>
                                </div>
                              )}
                              {aiGeneratedContent.personal.summary && (
                                <div>
                                  <span className="font-medium">Summary:</span>
                                  <p className="text-blue-700 mt-1">
                                    {aiGeneratedContent.personal.summary}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Experience Comparison */}
                    {renderComparisonSection("experience", "Work Experience", [
                      { key: "company", label: "Company" },
                      { key: "role", label: "Role" },
                      { key: "period", label: "Period" },
                    ])}

                    {/* Education Comparison */}
                    {renderComparisonSection("education", "Education", [
                      { key: "degree", label: "Degree" },
                      { key: "school", label: "School" },
                      { key: "period", label: "Period" },
                      { key: "extra", label: "Additional Info" },
                    ])}

                    {/* Projects Comparison */}
                    {renderComparisonSection("projects", "Projects", [
                      { key: "name", label: "Project Name" },
                      { key: "url", label: "URL" },
                    ])}

                    {/* Skills Comparison */}
                    {(formik.values.skills[0] ||
                      aiGeneratedContent?.skills) && (
                      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            Skills
                          </h3>
                          {aiGeneratedContent?.skills && (
                            <button
                              type="button"
                              onClick={() => applyAiSuggestions("skills")}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                            >
                              Apply AI Version
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Original Skills */}
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">
                              Your Skills:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {formik.values.skills.map(
                                (skill, index) =>
                                  skill && (
                                    <span
                                      key={index}
                                      className="bg-white px-3 py-1 rounded-full text-sm border border-gray-300"
                                    >
                                      {skill}
                                    </span>
                                  )
                              )}
                              {!formik.values.skills[0] && (
                                <span className="text-gray-500">
                                  No skills provided
                                </span>
                              )}
                            </div>
                          </div>

                          {/* AI Enhanced Skills */}
                          {aiGeneratedContent?.skills && (
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <h4 className="font-medium text-blue-800 mb-2">
                                AI Enhanced Skills:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {aiGeneratedContent.skills.map(
                                  (skill, index) =>
                                    skill && (
                                      <span
                                        key={index}
                                        className="bg-white px-3 py-1 rounded-full text-sm border border-blue-300 text-blue-700"
                                      >
                                        {skill}
                                      </span>
                                    )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {!isEditing && (
                <div className="flex justify-between pt-6 border-t border-gray-200">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium flex items-center transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < 6 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium flex items-center transition"
                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (aiGeneratedContent) {
                          handleSubmitAndDownload(); // ✅ Submit & Download after AI content exists
                        } else {
                          formik.handleSubmit(); // ✅ Trigger Formik's onSubmit (AI generation)
                        }
                      }}
                      className="bg-[#041d29] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#062c3e] transition"
                    >
                      {aiGeneratedContent
                        ? "Submit and Download"
                        : "Generate with AI"}
                    </button>
                  )}
                </div>
              )}

              {/* Editing Mode Navigation */}
              {isEditing && (
                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      if (step > 1) {
                        setStep(step - 1);
                      } else {
                        setIsEditing(false);
                        setStep(6);
                      }
                    }}
                    className="px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium flex items-center transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium flex items-center transition"
                  >
                    {step < 6 ? "Next" : "Save Changes"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
