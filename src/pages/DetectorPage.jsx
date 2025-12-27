import { useState, useEffect } from "react";
import MedicalChatbot from '../Components/MedicalChatbot';

function DetectorPage() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [statusText, setStatusText] = useState("");
  const [resultText, setResultText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [pulseBadge, setPulseBadge] = useState(false);
  const [gradcamImage, setGradcamImage] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(null);
  const [normalProb, setNormalProb] = useState(0);
  const [osteoProb, setOsteoProb] = useState(0);
  const [analysisStage, setAnalysisStage] = useState("");
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStatusText("");
    setResultText("");
    setProgress(0);
    setShowModal(false);
    setPulseBadge(false);
    setGradcamImage(null);
    setShowComparison(false);
    setConfidenceScore(null);
    setNormalProb(0);
    setOsteoProb(0);
    setShowAdvancedMetrics(false);
  };

  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((p) => {
          if (p < 25) {
            setAnalysisStage("preprocessing");
          } else if (p < 55) {
            setAnalysisStage("inference");
          } else if (p < 85) {
            setAnalysisStage("gradcam");
          } else {
            setAnalysisStage("finalizing");
          }
          
          if (p >= 95) return 95;
          return p + 3;
        });
      }, 120);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);
    setStatusText("Initiating AI analysis pipeline...");
    setResultText("");
    setProgress(0);
    setShowModal(false);
    setPulseBadge(false);
    setGradcamImage(null);
    setShowComparison(false);
    setShowAdvancedMetrics(false);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("https://shahriarahmed-osteo-backend.hf.space/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        const cls = data.predicted_class || "";
        const conf = typeof data.confidence === "number" ? data.confidence : 0;
        const pct = (conf * 100).toFixed(2);

        setProgress(100);
        setConfidenceScore(conf);
        setNormalProb(data.normal_probability || 0);
        setOsteoProb(data.osteo_probability || 0);

        // Store Grad-CAM with smooth reveal
        if (data.gradcam) {
          setGradcamImage(`data:image/png;base64,${data.gradcam}`);
          setTimeout(() => setShowComparison(true), 1000);
          setTimeout(() => setShowAdvancedMetrics(true), 1500);
        }

        if (cls === "Normal") {
          const text =
            `😊 Great news! The model predicts NORMAL (${pct}% confidence).\n` +
            "Keep taking care of those joints!";
          setResultText(text);
          setModalTitle("Everything looks Normal");
          setModalBody(
            "😊 The AI model analyzed your X-ray and found no signs of osteoarthritis. Maintain a healthy lifestyle and stay active!"
          );
        } else if (cls === "Osteoarthritis") {
          const text =
            `💪 The model predicts OSTEOARTHRITIS (${pct}% confidence).\n` +
            "This is not the end, it's the starting point for better care and treatment.";
          setResultText(text);
          setModalTitle("Osteoarthritis Detected");
          setModalBody(
            "💪 The AI model detected signs of osteoarthritis. This is your signal to consult a specialist and plan the next step toward better joint health."
          );
        } else {
          const text = `Prediction: ${cls} (${pct}%)`;
          setResultText(text);
          setModalTitle("Analysis Complete");
          setModalBody(text);
        }

        setPulseBadge(true);
        setTimeout(() => setPulseBadge(false), 2000);

        setStatusText("Analysis complete • Grad-CAM visualization generated");
        setShowModal(true);
      } else {
        setStatusText("Analysis failed");
        setResultText(data.error || "Server error");
      }
    } catch (err) {
      console.error(err);
      setStatusText("Network error");
      setResultText("Please check your connection and try again.");
    } finally {
      setLoading(false);
      setAnalysisStage("");
    }
  };

  const currentType = resultText.includes("NORMAL")
    ? "normal"
    : resultText.includes("OSTEOARTHRITIS")
    ? "osteo"
    : null;

  const getStageInfo = () => {
    switch (analysisStage) {
      case "preprocessing":
        return { icon: "🔍", text: "Image Preprocessing", color: "blue" };
      case "inference":
        return { icon: "🧠", text: "Running AI Models", color: "purple" };
      case "gradcam":
        return { icon: "🎨", text: "Generating Grad-CAM", color: "orange" };
      case "finalizing":
        return { icon: "✅", text: "Finalizing Results", color: "green" };
      default:
        return { icon: "⏳", text: "Initializing", color: "gray" };
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50 font-sans relative overflow-hidden">
      {/* Advanced animated background with multiple layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl animate-float-slow-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-300/10 blur-3xl animate-pulse-slow" />
      </div>

      {/* Main professional card */}
      <div
        className="relative w-[95vw] max-w-7xl bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100/50"
        style={{ animation: "fade-in-up 0.6s ease-out" }}
      >
        {/* Premium header with gradient */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 rounded-t-3xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <span className="text-4xl">🔬</span>
                Osteo Insight AI
              </h1>
              <p className="text-emerald-50 text-sm md:text-base font-medium">
                Advanced Deep Learning Diagnostic System
              </p>
            </div>
            <div className="flex gap-3 items-center bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold">2</div>
                <div className="text-[10px] opacity-80">AI Models</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold">97%</div>
                <div className="text-[10px] opacity-80">Accuracy</div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold">XAI</div>
                <div className="text-[10px] opacity-80">Explainable</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 p-6 md:p-8">
          {/* Left Panel: Upload & Visualization */}
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-2xl p-6 border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-xl shadow-md">
                  📤
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Upload X-ray Image</h2>
                  <p className="text-xs text-slate-600">High-resolution DICOM or standard formats accepted</p>
                </div>
              </div>

              <label className="block border-2 border-dashed border-emerald-300 bg-white hover:bg-emerald-50/30 rounded-2xl px-6 py-8 text-center cursor-pointer transition-all duration-300 hover:border-emerald-400 hover:shadow-lg group">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">
                    {preview ? "✅" : "📁"}
                  </div>
                  {preview ? (
                    <>
                      <p className="font-bold text-emerald-900">Image Ready for Analysis</p>
                      <p className="text-xs text-slate-600">Click to upload a different X-ray</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-slate-800">Drag & Drop or Click to Upload</p>
                      <p className="text-xs text-slate-600">
                        Supports: JPG, PNG, DICOM • Max 5MB • Patient data must be anonymized
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>

            {/* Image Viewer with Advanced Controls */}
            {preview && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-700">
                {/* Viewer Controls */}
                {gradcamImage && (
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setShowComparison(false)}
                      className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        !showComparison
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105"
                          : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        Original X-ray
                      </span>
                    </button>
                    <button
                      onClick={() => setShowComparison(true)}
                      className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        showComparison
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105"
                          : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                        Grad-CAM Heatmap
                      </span>
                    </button>
                  </div>
                )}

                {/* Image Display Area */}
                <div className="relative w-full h-96 bg-slate-950 rounded-xl overflow-hidden shadow-inner border-2 border-slate-700">
                  {/* Original Image */}
                  <div
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      showComparison ? "opacity-0 scale-90" : "opacity-100 scale-100"
                    }`}
                  >
                    <img
                      src={preview}
                      alt="X-ray"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      ORIGINAL IMAGE
                    </div>
                  </div>

                  {/* Grad-CAM Overlay */}
                  {gradcamImage && (
                    <div
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        showComparison ? "opacity-100 scale-100" : "opacity-0 scale-90"
                      }`}
                    >
                      <img
                        src={gradcamImage}
                        alt="Grad-CAM"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm flex items-center gap-2 animate-pulse-slow">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                        </span>
                        AI FOCUS AREAS
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl text-white px-4 py-3 rounded-xl text-[11px] border border-white/10 shadow-2xl">
                        <div className="flex items-start gap-2">
                          <div className="text-lg">💡</div>
                          <div>
                            <strong className="text-yellow-300">Grad-CAM Explanation:</strong>
                            <span className="text-slate-200"> Red and yellow regions indicate where the AI model concentrated its attention during prediction. Warmer colors represent higher model confidence in those specific anatomical areas.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Color Scale Legend */}
                {gradcamImage && showComparison && (
                  <div className="mt-4 flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl">
                    <span className="text-xs text-slate-300 font-semibold">Attention Intensity:</span>
                    <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500 shadow-inner" />
                    <div className="flex gap-4 text-[10px] text-slate-400">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Analyze Button */}
            {preview && (
              <button
                onClick={handlePredict}
                disabled={loading}
                className={`w-full px-6 py-4 rounded-2xl text-base font-bold shadow-2xl transition-all duration-300 ${
                  loading
                    ? "bg-gradient-to-r from-slate-400 to-slate-500 text-slate-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white hover:shadow-emerald-500/50 hover:scale-105 active:scale-95"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Running AI Analysis Pipeline...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Start AI-Powered Analysis
                  </span>
                )}
              </button>
            )}

            {/* Advanced Progress Tracker */}
            {loading && (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
                <div className="space-y-4">
                  {/* Stage Indicator */}
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      getStageInfo().color === 'blue' ? 'from-blue-500 to-blue-600' :
                      getStageInfo().color === 'purple' ? 'from-purple-500 to-purple-600' :
                      getStageInfo().color === 'orange' ? 'from-orange-500 to-orange-600' :
                      'from-green-500 to-green-600'
                    } flex items-center justify-center text-2xl shadow-lg animate-pulse`}>
                      {getStageInfo().icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold">{getStageInfo().text}</div>
                      <div className="text-xs text-slate-400">{statusText}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{progress}%</div>
                      <div className="text-[10px] text-slate-400">Complete</div>
                    </div>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden shadow-inner border border-slate-700">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 transition-all duration-300 relative shadow-lg"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-fast" />
                      </div>
                    </div>

                    {/* Stage Pills */}
                    <div className="flex gap-2">
                      {[
                        { name: "Preprocess", threshold: 25 },
                        { name: "AI Inference", threshold: 55 },
                        { name: "Grad-CAM", threshold: 85 },
                        { name: "Finalize", threshold: 100 }
                      ].map((stage, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                            progress >= stage.threshold
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                              : "bg-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel: Results & Analytics */}
          <div className="space-y-6">
            {/* Results Card */}
            <div className={`bg-gradient-to-br ${
              currentType === "normal"
                ? "from-emerald-50 to-teal-50/50"
                : currentType === "osteo"
                ? "from-red-50 to-orange-50/50"
                : "from-slate-50 to-slate-100/50"
            } rounded-2xl border-2 ${
              currentType === "normal"
                ? "border-emerald-200"
                : currentType === "osteo"
                ? "border-red-200"
                : "border-slate-200"
            } p-6 shadow-xl transition-all duration-700 ${
              resultText ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${
                  currentType === "normal" ? "bg-emerald-600" :
                  currentType === "osteo" ? "bg-red-600" : "bg-slate-600"
                } flex items-center justify-center text-white text-2xl shadow-lg`}>
                  📊
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Diagnostic Results</h2>
                  <p className="text-xs text-slate-600">AI Confidence Analysis</p>
                </div>
              </div>

              {currentType && (
                <>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                    <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg ${
                      currentType === "normal"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                        : "bg-gradient-to-r from-red-500 to-orange-600 text-white"
                    } ${pulseBadge ? "animate-bounce" : ""}`}>
                      <span className="text-lg">{currentType === "normal" ? "✅" : "⚠️"}</span>
                      {currentType === "normal" ? "NORMAL" : "OSTEOARTHRITIS"}
                    </span>
                    {confidenceScore && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800">
                          {(confidenceScore * 100).toFixed(1)}%
                        </div>
                        <div className="text-[10px] text-slate-600 font-medium">Confidence</div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {loading && !resultText ? (
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded-full animate-pulse" style={{ width: '75%' }} />
                  <div className="h-4 bg-slate-200 rounded-full animate-pulse" style={{ width: '50%' }} />
                  <div className="h-4 bg-slate-200 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {resultText || "🤖 Upload an X-ray and click 'Start AI-Powered Analysis' to receive detailed diagnostic insights with visual explanations."}
                </p>
              )}
            </div>

            {/* Probability Distribution */}
            {showAdvancedMetrics && (
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-xl"
                style={{ animation: "fade-in-up 0.6s ease-out" }}>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-xl">📈</span>
                  Probability Distribution
                </h3>
                <div className="space-y-4">
                  {/* Normal Probability */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-emerald-800 flex items-center gap-2">
                        <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                        Normal
                      </span>
                      <span className="text-lg font-bold text-emerald-900">
                        {(normalProb * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${normalProb * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                      </div>
                    </div>
                  </div>

                  {/* Osteoarthritis Probability */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-red-800 flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        Osteoarthritis
                      </span>
                      <span className="text-lg font-bold text-red-900">
                        {(osteoProb * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-orange-600 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${osteoProb * 100}%`, transitionDelay: "0.2s" }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Model Info Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-2xl border-2 border-purple-200 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="text-xl">🧠</span>
                AI Model Architecture
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                    R50
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-purple-900 text-sm">ResNet50</div>
                    <div className="text-[10px] text-purple-700">Deep Residual Network • 50 layers</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                    EB7
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-purple-900 text-sm">EfficientNetB7</div>
                    <div className="text-[10px] text-purple-700">Efficient Architecture • Optimized</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Dashboard */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border-2 border-slate-700 p-6 shadow-2xl text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">📊</span>
                Global OA Prevalence
              </h3>
              <div className="space-y-3">
                {[
                  { age: "35-44", percent: 5, color: "from-emerald-500 to-teal-600" },
                  { age: "45-54", percent: 10, color: "from-yellow-500 to-orange-500" },
                  { age: "55-64", percent: 18, color: "from-orange-500 to-red-500" },
                  { age: "65+", percent: 30, color: "from-red-500 to-pink-600" }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-semibold">Age {item.age} years</span>
                      <span className="text-sm font-bold">{item.percent}%</span>
                    </div>
                    <div className="h-3 bg-slate-950 rounded-full overflow-hidden shadow-inner border border-slate-700">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.percent}%`, transitionDelay: `${idx * 0.15}s` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-[10px] text-slate-400 italic">
                  💡 Early AI-assisted detection can significantly improve treatment outcomes and patient quality of life
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 flex gap-3 shadow-md">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-bold text-yellow-900 text-sm mb-1">Medical Disclaimer</h4>
                <p className="text-[11px] text-yellow-800 leading-relaxed">
                  This system is for <strong>research and educational purposes only</strong>. It is not FDA-approved and should never replace professional medical diagnosis. Always consult qualified healthcare providers for clinical decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg p-4">
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border-2 border-emerald-200 overflow-hidden"
            style={{ animation: "modal-appear 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            {/* Modal Header */}
            <div className={`${
              currentType === "normal"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600"
                : "bg-gradient-to-r from-red-500 to-orange-600"
            } p-6 text-white`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl border-2 border-white/30">
                  {currentType === "normal" ? "😊" : "💪"}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{modalTitle}</h3>
                  {confidenceScore && (
                    <p className="text-sm opacity-90 mt-1">
                      AI Confidence: <strong>{(confidenceScore * 100).toFixed(1)}%</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-slate-700 leading-relaxed whitespace-pre-line mb-6">
                {modalBody}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  ✅ Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Button - ALWAYS VISIBLE FROM START */}
      <div className="fixed bottom-6 right-6 z-40 group">
        {/* Tooltip on Hover */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 rounded-xl shadow-2xl border border-slate-700 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <div>
                <p className="font-bold text-sm">ZahangirDaktar</p>
                <p className="text-[10px] text-slate-300">Your AI Medical Assistant</p>
              </div>
            </div>
            {/* Arrow pointing down */}
            <div className="absolute top-full right-6 -mt-1">
              <div className="w-3 h-3 bg-slate-900 transform rotate-45 border-r border-b border-slate-700"></div>
            </div>
          </div>
        </div>

        {/* Chatbot Button */}
        <button
          onClick={() => setChatbotOpen(true)}
          className="relative w-16 h-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center group-hover:scale-110 animate-bounce-gentle"
          style={{ animation: "bounce-gentle 2s ease-in-out infinite, pulse-ring 2s ease-out infinite" }}
        >
          {/* Notification Ping - only show after results */}
          {resultText && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
          )}

          {/* Icon */}
          <div className="relative">
            <span className="text-3xl animate-wave">💬</span>
          </div>

          {/* Ripple effect on hover */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Chatbot Component */}
      <MedicalChatbot
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
        diagnosisResult={currentType === "normal" ? "Normal" : currentType === "osteo" ? "Osteoarthritis" : null}
        confidenceScore={confidenceScore}
        gradcamAvailable={!!gradcamImage}
      />

      {/* Enhanced Custom CSS */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

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

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes shimmer-fast {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Chatbot Button Animations */
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.05);
          }
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 25px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-15deg);
          }
          75% {
            transform: rotate(15deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-shimmer-fast {
          animation: shimmer-fast 2s infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slow-delayed {
          animation: float-slow-delayed 10s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}

export default DetectorPage;
