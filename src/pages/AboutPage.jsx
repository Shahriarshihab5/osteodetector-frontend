function AboutPage() {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-emerald-50">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-2xl font-bold text-emerald-900 mb-3">
            About Osteo Insight
          </h1>
          <p className="text-sm text-emerald-800 mb-2">
            Osteo Insight is a research prototype that uses deep learning to
            support osteoarthritis screening from X-ray images.
          </p>
          <p className="text-sm text-emerald-800">
            The model combines ResNet50 and EfficientNetB7, trained on labeled
            normal and osteoarthritis X-rays, and exposed through a Flask API
            consumed by a React frontend.
          </p>
        </div>
      </div>
    );
  }
  export default AboutPage;
  