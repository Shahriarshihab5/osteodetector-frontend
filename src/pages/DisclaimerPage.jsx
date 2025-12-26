function DisclaimerPage() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-red-300/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-orange-300/20 blur-3xl animate-float-slow-delayed" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-12">
        {/* Warning Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-full mb-6 shadow-2xl animate-pulse-slow">
            <span className="text-5xl">⚠️</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Important Medical Disclaimer
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Please read this disclaimer carefully before using Osteo Insight AI
          </p>
        </div>

        {/* Main Disclaimer Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-red-200 overflow-hidden mb-8">
          {/* Alert Banner */}
          <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                🏥
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Not a Medical Device</h2>
                <p className="text-red-50 leading-relaxed">
                  Osteo Insight AI is a <strong>research prototype and educational tool</strong> designed for demonstration purposes only. It is <strong>NOT FDA-approved, CE-marked, or certified</strong> as a medical device in any jurisdiction.
                </p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Primary Warning */}
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚫</span>
                Do Not Use for Clinical Decisions
              </h3>
              <p className="text-red-800 leading-relaxed mb-3">
                <strong>The predictions and analyses provided by this system should NEVER be used as:</strong>
              </p>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>A substitute for professional medical diagnosis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>A basis for treatment decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>A replacement for clinical examination by qualified healthcare providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>A definitive diagnostic tool for osteoarthritis or any medical condition</span>
                </li>
              </ul>
            </div>

            {/* What You Should Do */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                What You Should Do
              </h3>
              <ul className="space-y-3 text-emerald-800">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <span><strong>Consult a Healthcare Professional:</strong> Always seek advice from qualified physicians, radiologists, or orthopedic specialists for medical concerns.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <span><strong>Get Professional Imaging:</strong> Clinical-grade X-rays should be obtained and interpreted by licensed medical professionals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <span><strong>Comprehensive Evaluation:</strong> Osteoarthritis diagnosis requires clinical history, physical examination, and multiple diagnostic tests.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <span><strong>Emergency Situations:</strong> For urgent medical concerns, contact emergency services immediately.</span>
                </li>
              </ul>
            </div>

            {/* Limitations */}
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                System Limitations
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-amber-800 text-sm">
                <div className="space-y-2">
                  <p className="font-semibold">Technical Limitations:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• AI models can produce false positives/negatives</li>
                    <li>• Accuracy depends on image quality</li>
                    <li>• Training data may not represent all demographics</li>
                    <li>• Cannot detect all forms of joint disease</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold">Clinical Limitations:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• No access to patient medical history</li>
                    <li>• Cannot perform physical examination</li>
                    <li>• Limited to visual X-ray analysis</li>
                    <li>• No real-time clinical context</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Educational Purpose */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                Educational & Research Purpose
              </h3>
              <p className="text-blue-800 leading-relaxed">
                This system is designed as a <strong>final year thesis project</strong> by computer science students at Daffodil International University. It serves to:
              </p>
              <ul className="mt-3 space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▸</span>
                  <span>Demonstrate deep learning applications in medical imaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▸</span>
                  <span>Showcase explainable AI (Grad-CAM) techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▸</span>
                  <span>Provide educational insights into AI-assisted diagnostics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▸</span>
                  <span>Foster understanding of AI capabilities and limitations</span>
                </li>
              </ul>
            </div>

            {/* Privacy & Data */}
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                Privacy & Data Protection
              </h3>
              <p className="text-purple-800 leading-relaxed mb-3">
                To protect patient privacy:
              </p>
              <ul className="space-y-2 text-purple-800">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">▸</span>
                  <span><strong>Remove all patient identifiable information</strong> before uploading any medical images</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">▸</span>
                  <span>Images are processed in-memory and not permanently stored on our servers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">▸</span>
                  <span>We do not collect, store, or transmit personal health information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">▸</span>
                  <span>Use this system only with properly anonymized images</span>
                </li>
              </ul>
            </div>

            {/* Liability */}
            <div className="bg-slate-50 border-l-4 border-slate-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                Limitation of Liability
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                By using this system, you acknowledge and agree that:
              </p>
              <ul className="mt-3 space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>The developers, Daffodil International University, and associated parties assume <strong>no liability</strong> for any decisions made based on this system's output</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>Use of this system is <strong>entirely at your own risk</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>No warranties, express or implied, are provided regarding accuracy, reliability, or fitness for any purpose</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>We are not liable for any direct, indirect, incidental, or consequential damages arising from system use</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Information */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🚫
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Not FDA Approved</h3>
            <p className="text-xs text-slate-600">
              This system has not been evaluated or approved by the U.S. Food and Drug Administration
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              ❌
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Not CE Marked</h3>
            <p className="text-xs text-slate-600">
              Does not carry CE marking for medical devices in the European Union
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🎓
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Academic Project</h3>
            <p className="text-xs text-slate-600">
              Developed as an educational thesis project for research purposes only
            </p>
          </div>
        </div>

        {/* Acknowledgment Box */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              📋
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">User Acknowledgment</h3>
              <p className="text-slate-300 leading-relaxed">
                By using Osteo Insight AI, you acknowledge that you have read, understood, and agree to this disclaimer. You confirm that you will not use this system for clinical decision-making and will always consult qualified healthcare professionals for medical advice.
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <p className="text-sm text-slate-300 italic">
              <strong>Remember:</strong> This is a demonstration of AI technology, not a medical diagnosis tool. Your health is too important to trust to experimental systems. Always seek professional medical care.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 mb-2">
            Questions about this disclaimer or the system?
          </p>
          <p className="text-sm text-slate-800">
            <strong>Developed by:</strong> Syed Shahriar Ahmed & Md Safaet Zahangir
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Department of Computer Science & Engineering, Daffodil International University
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
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

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slow-delayed {
          animation: float-slow-delayed 10s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default DisclaimerPage;
