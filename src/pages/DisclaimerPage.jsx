function DisclaimerPage() {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-emerald-50">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-3">
          <h1 className="text-2xl font-bold text-emerald-900">
            Disclaimer
          </h1>
          <p className="text-sm text-emerald-800">
            This application is for research and educational purposes only and
            is not a medical device.
          </p>
          <p className="text-sm text-emerald-800">
            Predictions should never be used as a substitute for professional
            medical diagnosis, treatment, or advice. Always consult a
            qualified healthcare provider for clinical decisions.
          </p>
        </div>
      </div>
    );
  }
  export default DisclaimerPage;
  