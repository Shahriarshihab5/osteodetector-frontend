function HowItWorksPage() {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-emerald-50">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-3">
          <h1 className="text-2xl font-bold text-emerald-900">
            How it works
          </h1>
          <ol className="list-decimal ml-5 text-sm text-emerald-800 space-y-1">
            <li>You upload an anonymized knee or elbow X-ray image.</li>
            <li>The image is sent securely to the Flask backend.</li>
            <li>The Keras ensemble model preprocesses and analyzes the X-ray.</li>
            <li>The backend returns probabilities for Normal and Osteoarthritis.</li>
            <li>The React app visualizes the result and confidence score.</li>
          </ol>
        </div>
      </div>
    );
  }
  export default HowItWorksPage;
  