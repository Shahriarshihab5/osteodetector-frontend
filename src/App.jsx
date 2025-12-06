import { useState, useEffect } from "react";

function App() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [statusText, setStatusText] = useState("");
  const [resultText, setResultText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStatusText("");
    setResultText("");
    setProgress(0);
  };

  // fake progress bar while waiting for API
  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 95) return 95; // stop before 100 until response
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
    setStatusText("Your results are on the way, brother...");
    setResultText("");
    setProgress(0);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        const cls = data.predicted_class || "";
        const conf =
          typeof data.confidence === "number" ? data.confidence : 0;
        const pct = (conf * 100).toFixed(2);

        setProgress(100);

        if (cls === "Normal") {
          setResultText(
            `😊 Great news! The model predicts NORMAL (${pct}% confidence). Keep taking care of those joints!`
          );
        } else if (cls === "Osteoarthritis") {
          setResultText(
            `💪 The model predicts OSTEOARTHRITIS (${pct}% confidence). This is not the end, it’s the starting point for better care and treatment.`
          );
        } else {
          setResultText(`Prediction: ${cls} (${pct}%)`);
        }

        setStatusText("Analysis complete.");
      } else {
        setStatusText("Something went wrong.");
        setResultText(data.error || "Server error");
      }
    } catch (err) {
      console.error(err);
      setStatusText("Network error.");
      setResultText("Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentType =
    resultText.includes("NORMAL")
      ? "normal"
      : resultText.includes("OSTEOARTHRITIS")
      ? "osteo"
      : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 font-sans">
      <div className="w-[95vw] max-w-5xl bg-white rounded-2xl shadow-2xl grid md:grid-cols-[1.2fr_1fr] gap-6 p-6 md:p-8">
        {/* Left column */}
        <div className="border-b md:border-b-0 md:border-r border-emerald-100 md:pr-6 space-y-4">
          <div>
            <h1 className="text-2xl md:text-[26px] font-bold text-emerald-900 mb-1.5">
              X-ray Osteoarthritis Detector
            </h1>
            <p className="text-sm text-emerald-700 mb-4">
              Upload a knee or elbow X-ray. A deep ensemble of ResNet50 and
              EfficientNetB7 will analyze it for osteoarthritis.
            </p>
          </div>

          <label className="block border-2 border-dashed border-emerald-300 bg-emerald-50 rounded-xl px-4 py-5 text-center text-emerald-800 text-sm cursor-pointer hover:bg-emerald-50/70 transition">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {preview ? (
              <>
                <p className="m-0 font-semibold">Change X-ray</p>
                <p className="mt-1 text-xs">
                  Selected file ready for analysis.
                </p>
              </>
            ) : (
              <>
                <p className="m-0 font-semibold">Click to upload X-ray</p>
                <p className="mt-1 text-xs">
                  JPG / PNG, up to 5MB. Ensure patient data is anonymized.
                </p>
              </>
            )}
          </label>

          {preview && (
            <div className="mt-4 text-center">
              <img
                src={preview}
                alt="xray"
                className="max-w-full max-h-64 rounded-xl shadow-lg inline-block"
              />
            </div>
          )}

          {preview && (
            <button
              onClick={handlePredict}
              disabled={loading}
              className={`mt-4 inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-md transition ${
                loading
                  ? "bg-emerald-300 cursor-default"
                  : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
              }`}
            >
              {loading ? "Analyzing..." : "Analyze X-ray"}
            </button>
          )}

          {loading && (
            <div className="mt-3 text-sm text-emerald-800">
              <p>{statusText}</p>
              <div className="w-full h-2 mt-2 bg-emerald-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-1 text-xs">{progress}%</div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="pt-4 md:pt-0 md:pl-4 space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-emerald-900 mb-1">
              Result
            </h2>
            <p className="text-xs text-emerald-700">
              This tool is for research and education only and does not replace
              professional medical diagnosis.
            </p>
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-4 min-h-[140px]">
            {currentType && (
              <span
                className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold mb-2 ${
                  currentType === "normal"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {currentType === "normal" ? "NORMAL" : "OSTEOARTHRITIS"}
              </span>
            )}
            <p className="text-sm text-emerald-900 whitespace-pre-line mt-1">
              {resultText ||
                'Upload an X-ray and click "Analyze X-ray" to see the prediction.'}
            </p>
          </div>

          {statusText && !loading && (
            <p className="mt-1 text-[11px] text-emerald-700">{statusText}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
