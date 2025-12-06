function Footer() {
    return (
      <footer className="border-t border-emerald-100 bg-white/90 backdrop-blur mt-8">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-between text-[11px] sm:text-xs text-emerald-800">
          {/* Left: credits */}
          <div className="text-center sm:text-left">
            <p className="font-medium">
              Osteo Insight · Powered by <span className="font-semibold">Team FractureFighters</span>
            </p>
            <p className="mt-0.5">
              Contact:{" "}
              <a
                href="mailto:shahriarshihab1123@gmail.com"
                className="underline underline-offset-2 hover:text-emerald-600"
              >
                shahriarshihab1123@gmail.com
              </a>
            </p>
          </div>
  
          {/* Right: socials */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <span className="text-emerald-700">Connect with us:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100"
              >
                ig
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100"
              >
                in
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  