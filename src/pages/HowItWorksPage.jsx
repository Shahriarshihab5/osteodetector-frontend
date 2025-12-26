import { useState } from "react";

function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      number: "01",
      title: "Upload X-ray Image",
      description: "Upload an anonymized knee or elbow X-ray image through our secure interface.",
      details: "Our system accepts standard medical imaging formats (JPG, PNG, DICOM) up to 5MB. All patient identifiable information must be removed before upload to ensure privacy compliance.",
      icon: "📤",
      color: "from-blue-500 to-blue-600",
      techStack: ["React.js", "File API", "HIPAA Compliant"]
    },
    {
      number: "02",
      title: "Secure Data Transmission",
      description: "The image is encrypted and sent securely to our Flask backend server.",
      details: "Using HTTPS protocol with TLS 1.3 encryption, your medical data is transmitted with bank-level security. Our infrastructure is hosted on secure cloud servers with SOC 2 compliance.",
      icon: "🔒",
      color: "from-emerald-500 to-emerald-600",
      techStack: ["Flask API", "HTTPS", "End-to-End Encryption"]
    },
    {
      number: "03",
      title: "AI Model Processing",
      description: "The ensemble deep learning model preprocesses and analyzes the X-ray using advanced neural networks.",
      details: "Our system employs ResNet50 and EfficientNetB7 models trained on thousands of annotated medical images. The preprocessing pipeline includes normalization, resizing, and augmentation to ensure optimal analysis.",
      icon: "🧠",
      color: "from-purple-500 to-purple-600",
      techStack: ["TensorFlow", "Keras", "ResNet50", "EfficientNetB7"]
    },
    {
      number: "04",
      title: "Grad-CAM Visualization",
      description: "Explainable AI generates a heatmap showing which areas the model focused on during analysis.",
      details: "Gradient-weighted Class Activation Mapping (Grad-CAM) provides transparency by highlighting regions of interest. Red/yellow areas indicate high model attention, enabling medical professionals to verify AI reasoning.",
      icon: "🎨",
      color: "from-orange-500 to-red-500",
      techStack: ["tf-keras-vis", "Grad-CAM", "OpenCV"]
    },
    {
      number: "05",
      title: "Results Generation",
      description: "The backend returns probability scores for Normal and Osteoarthritis classifications.",
      details: "Results include confidence percentages, class predictions, and probability distribution. The ensemble approach combines predictions from multiple models to improve accuracy and reduce false positives.",
      icon: "📊",
      color: "from-teal-500 to-cyan-600",
      techStack: ["NumPy", "JSON API", "Statistical Analysis"]
    },
    {
      number: "06",
      title: "Interactive Visualization",
      description: "The React frontend displays results with interactive charts, Grad-CAM overlays, and AI assistant.",
      details: "Users can switch between original X-ray and Grad-CAM heatmap, view probability distributions, and chat with ZahangirDaktar AI assistant for detailed explanations and medical information.",
      icon: "📱",
      color: "from-pink-500 to-rose-600",
      techStack: ["React.js", "Tailwind CSS", "Real-time UI"]
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl animate-float-slow-delayed" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <span className="text-xl">⚙️</span>
            System Workflow
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How Osteo Insight AI Works
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Our advanced AI-powered diagnostic system combines state-of-the-art deep learning with explainable AI to provide accurate osteoarthritis detection with full transparency.
          </p>
        </div>

        {/* Interactive Process Flow */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-teal-500 to-purple-500 transform -translate-x-1/2 opacity-20" />

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  activeStep === index ? "scale-105" : ""
                }`}
              >
                {/* Step Card */}
                <div
                  onClick={() => setActiveStep(activeStep === index ? null : index)}
                  className={`bg-white rounded-2xl shadow-xl border-2 ${
                    activeStep === index ? "border-emerald-400" : "border-slate-200"
                  } hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden`}
                >
                  <div className="grid md:grid-cols-[auto_1fr] gap-6 p-6 md:p-8">
                    {/* Step Number & Icon */}
                    <div className="flex md:flex-col items-center gap-4">
                      <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                        <span className="text-4xl">{step.icon}</span>
                      </div>
                      <div className={`text-5xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-700 mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Technology Stack Pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {step.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 bg-gradient-to-r ${step.color} bg-opacity-10 text-xs font-semibold rounded-full border border-slate-200`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Expandable Details */}
                      <div
                        className={`transition-all duration-500 overflow-hidden ${
                          activeStep === index
                            ? "max-h-96 opacity-100 mt-4"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className={`bg-gradient-to-br ${step.color} bg-opacity-5 rounded-xl p-4 border-l-4 border-emerald-500`}>
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {step.details}
                          </p>
                        </div>
                      </div>

                      {/* Expand Button */}
                      <button
                        className={`mt-4 text-sm font-semibold flex items-center gap-2 transition-colors ${
                          activeStep === index ? "text-emerald-600" : "text-slate-600"
                        }`}
                      >
                        {activeStep === index ? (
                          <>
                            <span>Show less</span>
                            <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>Learn more</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step Connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <svg className="w-6 h-6 text-emerald-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L10 5.414l-6.293 6.293a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">🏗️</span>
            System Architecture
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Frontend */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                💻
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Frontend Layer</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▸</span>
                  <span>React.js with Hooks & Context</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▸</span>
                  <span>Tailwind CSS for responsive design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▸</span>
                  <span>Real-time image preview</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▸</span>
                  <span>Interactive data visualization</span>
                </li>
              </ul>
            </div>

            {/* Backend */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                ⚙️
              </div>
              <h3 className="text-xl font-bold text-emerald-900 mb-3">Backend Layer</h3>
              <ul className="text-sm text-emerald-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">▸</span>
                  <span>Flask RESTful API</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">▸</span>
                  <span>CORS enabled for security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">▸</span>
                  <span>Image preprocessing pipeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">▸</span>
                  <span>JSON response formatting</span>
                </li>
              </ul>
            </div>

            {/* AI Models */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                🤖
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">AI/ML Layer</h3>
              <ul className="text-sm text-purple-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">▸</span>
                  <span>TensorFlow 2.10 & Keras 3.10</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">▸</span>
                  <span>ResNet50 + EfficientNetB7 ensemble</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">▸</span>
                  <span>Grad-CAM explainability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">▸</span>
                  <span>Transfer learning optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {/* Security & Privacy */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🔐</span>
              <h3 className="text-2xl font-bold">Security & Privacy</h3>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>End-to-end HTTPS encryption</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>No patient data storage on servers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>HIPAA-compliant data handling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span>Anonymous image processing</span>
              </li>
            </ul>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">⚡</span>
              <h3 className="text-2xl font-bold">Performance</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold">97%</div>
                <div className="text-sm opacity-90">Model Accuracy</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold">&lt;3s</div>
                <div className="text-sm opacity-90">Analysis Time</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold">2</div>
                <div className="text-sm opacity-90">AI Models</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold">XAI</div>
                <div className="text-sm opacity-90">Explainable</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-2xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-3">Ready to Try It?</h3>
          <p className="text-emerald-50 mb-6 max-w-2xl mx-auto">
            Experience the power of AI-assisted osteoarthritis detection with full transparency and explainability.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>Start Analysis Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes float-slow-delayed {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(20px) translateX(-10px);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slow-delayed {
          animation: float-slow-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default HowItWorksPage;
