import { useState } from "react";

function AboutPage() {
  const [activeTab, setActiveTab] = useState("project");

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 font-sans relative overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[420px] h-[420px] rounded-full bg-emerald-300/30 blur-3xl animate-pulse-slow" />
      </div>

      <div
        className="relative w-[95vw] max-w-5xl mx-auto bg-white/95 rounded-2xl shadow-2xl p-6 md:p-8 border border-emerald-100"
        style={{ animation: "fade-in-up 0.6s ease-out" }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-3xl md:text-4xl font-bold text-emerald-900 mb-2"
            style={{ animation: "float-slow 4s ease-in-out infinite" }}
          >
            About Osteo Insight
          </h1>
          <p className="text-sm text-emerald-700">
            AI-Powered Osteoarthritis Detection System
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("project")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "project"
                ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg scale-105"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            🔬 About Project
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === "team"
                ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg scale-105"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            👥 Meet the Team
          </button>
        </div>

        {/* Tab Content */}
        <div className="relative">
          {/* Project Tab */}
          <div
            className={`transition-all duration-500 ${
              activeTab === "project"
                ? "opacity-100 translate-x-0"
                : "opacity-0 absolute translate-x-8 pointer-events-none"
            }`}
          >
            <div className="space-y-6">
              {/* Project Overview */}
              <section className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border-2 border-emerald-200 p-6 shadow-lg">
                <h2 className="text-xl font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  🎯 Project Overview
                </h2>
                <p className="text-sm text-emerald-800 mb-3 leading-relaxed">
                  <strong>Osteo Insight</strong> is a cutting-edge AI-powered
                  research prototype developed as a final year thesis project.
                  The system leverages deep learning to support osteoarthritis
                  screening from X-ray images, combining state-of-the-art
                  neural networks with explainable AI techniques.
                </p>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Our ensemble model combines <strong>ResNet50</strong> and{" "}
                  <strong>EfficientNetB7</strong>, trained on carefully
                  annotated medical imaging data, and deployed through a modern
                  Flask API consumed by an intuitive React frontend.
                </p>
              </section>

              {/* About Osteoarthritis */}
              <section className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border-2 border-blue-200 p-6 shadow-lg">
                <h2 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                  🦴 What is Osteoarthritis?
                </h2>
                <p className="text-sm text-blue-800 mb-3 leading-relaxed">
                  Osteoarthritis (OA) is the most common form of arthritis,
                  affecting millions worldwide. It occurs when the protective
                  cartilage that cushions the ends of bones wears down over
                  time, primarily affecting joints in the knees, hips, hands,
                  and spine.
                </p>
                <div className="grid md:grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2 text-sm">
                      📊 Key Statistics
                    </h3>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Affects over 300 million people globally</li>
                      <li>• Most common in adults 55+ years</li>
                      <li>• Leading cause of disability worldwide</li>
                      <li>• Risk increases with age and obesity</li>
                    </ul>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2 text-sm">
                      ⚠️ Common Symptoms
                    </h3>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Joint pain and stiffness</li>
                      <li>• Reduced range of motion</li>
                      <li>• Swelling and tenderness</li>
                      <li>• Bone spurs around affected joint</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Development Journey */}
              <section className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border-2 border-purple-200 p-6 shadow-lg">
                <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                  🚀 Development Journey
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      phase: "Phase 1: Data Collection",
                      date: "January 2025",
                      desc: "Collected raw X-ray images from multiple sources and sorted them by body part (knee, leg, hand, head, chest)",
                      icon: "📁",
                    },
                    {
                      phase: "Phase 2: Data Annotation",
                      date: "February 2025",
                      desc: "Collaborated with medical professionals to annotate and label osteoarthritis cases, creating a high-quality dataset",
                      icon: "🏥",
                    },
                    {
                      phase: "Phase 3: Model Training",
                      date: "March 2025",
                      desc: "Trained ensemble deep learning models using ResNet50 and EfficientNetB7 on annotated knee X-ray data",
                      icon: "🧠",
                    },
                    {
                      phase: "Phase 4: Deployment",
                      date: "December 2025",
                      desc: "Deployed the model via Flask API and built an interactive React frontend with Grad-CAM visualization",
                      icon: "🌐",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 bg-white/80 rounded-lg p-4 border border-purple-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                      style={{
                        animation: `fade-in-up 0.4s ease-out ${
                          idx * 0.1
                        }s both`,
                      }}
                    >
                      <div className="text-3xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-purple-900 text-sm">
                            {item.phase}
                          </h3>
                          <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-medium">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-xs text-purple-800 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Technology Stack */}
              <section className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border-2 border-gray-200 p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  ⚙️ Technology Stack
                </h2>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                      🤖 Machine Learning
                    </h3>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• TensorFlow / Keras</li>
                      <li>• ResNet50</li>
                      <li>• EfficientNetB7</li>
                      <li>• Grad-CAM (XAI)</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                      🔧 Backend
                    </h3>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Flask API</li>
                      <li>• Python 3.9</li>
                      <li>• OpenCV</li>
                      <li>• tf-keras-vis</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                      💻 Frontend
                    </h3>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• React.js</li>
                      <li>• Tailwind CSS</li>
                      <li>• React Router</li>
                      <li>• Responsive Design</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Disclaimer */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 flex gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-bold text-yellow-900 text-sm mb-1">
                    Important Disclaimer
                  </h3>
                  <p className="text-xs text-yellow-800 leading-relaxed">
                    This application is for <strong>research and educational purposes only</strong> and is not a medical device. Predictions should never replace professional medical diagnosis or treatment. Always consult qualified healthcare providers for clinical decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Tab */}
          <div
            className={`transition-all duration-500 ${
              activeTab === "team"
                ? "opacity-100 translate-x-0"
                : "opacity-0 absolute translate-x-8 pointer-events-none"
            }`}
          >
            <div className="space-y-6">
              {/* Team Introduction */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-emerald-900 mb-2">
                  Meet the Developers
                </h2>
                <p className="text-sm text-emerald-700">
                  B.Sc in Computer Science & Engineering (CSE) <br />
                  Daffodil International University • Final Year Thesis Project 2025
                </p>
              </div>

              {/* Team Members */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Syed Shahriar Ahmed */}
                <div
                  className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border-2 border-emerald-200 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  style={{ animation: "fade-in-up 0.5s ease-out" }}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Image - Replace with your actual image */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl mb-4 border-4 border-white">
                      {/* Add your image here */}
                       <img src="/cv image.jpeg" alt="Syed Shahriar Ahmed" className="w-full h-full rounded-full object-cover" /> 
                    
                    </div>

                    <h3 className="text-xl font-bold text-emerald-900 mb-1">
                      Syed Shahriar Ahmed
                    </h3>
                    <p className="text-xs bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full font-semibold mb-3">
                    Model Developer • Web Engineer
                    </p>

                    <div className="w-full bg-white/80 rounded-lg p-4 border border-emerald-200 mb-4">
                      <h4 className="font-semibold text-emerald-900 mb-2 text-sm">
                        🎯 Responsibilities
                      </h4>
                      <ul className="text-xs text-emerald-800 space-y-1 text-left">
                        <li>• Deep Learning Model Development</li>
                        <li>• Ensemble Architecture Design</li>
                        <li>• Data Collection & Preprocessing</li>
                        <li>• Model Training & Optimization</li>
                        <li>• Full-Stack Web Development</li>
                      </ul>
                    </div>

                    <div className="w-full bg-white/80 rounded-lg p-4 border border-emerald-200">
                      <h4 className="font-semibold text-emerald-900 mb-2 text-sm">
                        💻 Technical Skills
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          "Python",
                          "TensorFlow",
                          "Keras",
                          "React.js",
                          "Flask",
                          "Deep Learning",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md text-[10px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social Links - Optional */}
                    <div className="flex gap-3 mt-4">
                      {/* Uncomment and add your links */}
                      {/* <a href="#" className="text-emerald-600 hover:text-emerald-700 transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a> */}
                    </div>
                  </div>
                </div>

                {/* Md Safaet Zahangir */}
                <div
                  className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border-2 border-blue-200 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  style={{ animation: "fade-in-up 0.5s ease-out 0.1s both" }}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Image - Replace with actual image */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl mb-4 border-4 border-white">
                      {/* Add Safaet's image here */}
                      <img src="/471161537_122130637808381403_5757707274419888202_n.jpg" alt="Md Safaet Zahangir" className="w-full h-full rounded-full object-cover" /> 
                      
                    </div>

                    <h3 className="text-xl font-bold text-blue-900 mb-1">
                      Md Safaet Zahangir
                    </h3>
                    <p className="text-xs bg-blue-200 text-blue-800 px-3 py-1 rounded-full font-semibold mb-3">
                    Team Lead • AI/ML Developer
                    </p>

                    <div className="w-full bg-white/80 rounded-lg p-4 border border-blue-200 mb-4">
                      <h4 className="font-semibold text-blue-900 mb-2 text-sm">
                        🎯 Responsibilities
                      </h4>
                      <ul className="text-xs text-blue-800 space-y-1 text-left">
                        <li>• Model Architecture Development</li>
                        <li>• Transfer Learning Implementation</li>
                        <li>• Frontend Development</li>
                        <li>• API Integration</li>
                        <li>• UI/UX Design</li>
                      </ul>
                    </div>

                    <div className="w-full bg-white/80 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2 text-sm">
                        💻 Technical Skills
                      </h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          "Python",
                          "Machine Learning",
                          "React.js",
                          "JavaScript",
                          "Tailwind CSS",
                          "APIs",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-[10px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social Links - Optional */}
                    <div className="flex gap-3 mt-4">
                      {/* Uncomment and add links */}
                      {/* <a href="#" className="text-blue-600 hover:text-blue-700 transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border-2 border-purple-200 p-6 shadow-lg mt-8">
                <h3 className="text-lg font-bold text-purple-900 mb-4 text-center">
                  📊 Project Highlights
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "X-ray Images Processed", value: "1000+", icon: "📸" },
                    { label: "Model Accuracy", value: "97%+", icon: "🎯" },
                    { label: "Development Time", value: "12 Months", icon: "⏱️" },
                    { label: "Technologies Used", value: "10+", icon: "⚙️" },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg p-4 border border-purple-200 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                      style={{
                        animation: `fade-in-up 0.4s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      <div className="text-3xl mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-purple-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-purple-700">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* University Info */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white text-center shadow-xl">
                <h3 className="text-xl font-bold mb-2">🎓 Daffodil International University</h3>
                <p className="text-sm opacity-90">
                  Department of Computer Science & Engineering
                </p>
                <p className="text-xs opacity-80 mt-2">
                  Final Year Thesis Project • 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default AboutPage;
