import { useState, useRef, useEffect } from "react";

function MedicalChatbot({ isOpen, onClose, diagnosisResult, confidenceScore, gradcamAvailable }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial greeting when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const greeting = diagnosisResult
          ? {
              role: "assistant",
              content: `Hello! 👋 I'm your AI medical assistant. I see you just received a diagnosis result showing **${diagnosisResult}** with ${(confidenceScore * 100).toFixed(1)}% confidence. I'm here to help you understand your results better. What would you like to know?`,
            }
          : {
              role: "assistant",
              content: "Hello! 👋 I'm your AI medical assistant. Once you upload and analyze an X-ray, I'll be here to help you understand the results. Feel free to ask me anything about osteoarthritis!",
            };
        setMessages([greeting]);
      }, 500);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulated AI responses (replace with actual API call)
  const getAIResponse = async (userMessage) => {
    setIsTyping(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let response = "";

    // Context-aware responses based on diagnosis
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("what") && lowerMessage.includes("osteoarthritis")) {
      response = `Osteoarthritis (OA) is a degenerative joint disease where the protective cartilage cushioning the ends of bones gradually wears down. It most commonly affects knees, hips, hands, and spine. 

**Key Facts:**
• Most common form of arthritis worldwide
• Affects over 300 million people globally
• Risk increases with age, obesity, and joint injuries
• Symptoms include pain, stiffness, and reduced mobility

The AI model detected this by analyzing specific patterns in your X-ray image.`;
    } else if (lowerMessage.includes("confidence") || lowerMessage.includes("accurate")) {
      response = `The AI model reported a **${(confidenceScore * 100).toFixed(1)}% confidence** in its prediction. This confidence score is calculated based on:

**1. Ensemble Learning:** Combining ResNet50 and EfficientNetB7 models
**2. Pattern Recognition:** Analyzing joint space narrowing, bone spurs, and cartilage degradation
**3. Training Data:** Trained on thousands of annotated medical X-rays

${gradcamAvailable ? "The Grad-CAM visualization shows exactly which areas of your X-ray the AI focused on when making this prediction." : ""}

Remember: This is a research tool, not a diagnostic device. Always consult healthcare professionals.`;
    } else if (lowerMessage.includes("gradcam") || lowerMessage.includes("heatmap") || lowerMessage.includes("red areas")) {
      response = `**Grad-CAM (Gradient-weighted Class Activation Mapping)** is an explainable AI technique that visualizes what the neural network "sees" when analyzing your X-ray.

**How it works:**
🔴 **Red/Hot areas** = High attention (model focused heavily here)
🟡 **Yellow areas** = Moderate attention
🔵 **Blue/Cool areas** = Low attention

In medical imaging, Grad-CAM helps:
✓ Build trust by showing AI reasoning
✓ Identify potential problem areas
✓ Enable doctors to verify AI predictions
✓ Improve transparency in AI decision-making

The highlighted regions typically correspond to joint abnormalities like cartilage loss or bone changes.`;
    } else if (lowerMessage.includes("normal") && diagnosisResult === "Normal") {
      response = `Great news! Your X-ray was classified as **Normal** with ${(confidenceScore * 100).toFixed(1)}% confidence. This means:

✅ No significant signs of osteoarthritis detected
✅ Joint space appears healthy
✅ No obvious bone spurs or cartilage degradation

**What to do next:**
• Maintain an active lifestyle
• Keep a healthy weight
• Exercise regularly (low-impact activities)
• Stay hydrated and eat joint-friendly foods

However, this is a research tool. If you have joint pain or concerns, please consult an orthopedic specialist for a comprehensive clinical evaluation.`;
    } else if ((lowerMessage.includes("osteoarthritis") || lowerMessage.includes("positive")) && diagnosisResult === "Osteoarthritis") {
      response = `The AI detected signs of **Osteoarthritis** with ${(confidenceScore * 100).toFixed(1)}% confidence. While this may be concerning, early detection is actually beneficial!

**What this means:**
⚠️ The model identified patterns consistent with OA
⚠️ This could indicate joint space narrowing or bone changes

**Important Next Steps:**
1️⃣ **Consult a Specialist:** See an orthopedic doctor or rheumatologist
2️⃣ **Get Clinical Diagnosis:** Professional imaging review is essential
3️⃣ **Discuss Treatment:** Options include physical therapy, medications, lifestyle changes
4️⃣ **Stay Proactive:** Early intervention can slow progression

**Remember:** 
• This is a screening tool, not a medical diagnosis
• Many OA cases are manageable with proper care
• Treatment options have advanced significantly
• You're taking the right step by seeking information!`;
    } else if (lowerMessage.includes("treatment") || lowerMessage.includes("cure") || lowerMessage.includes("help")) {
      response = `While there's no cure for osteoarthritis, many effective treatments can help manage symptoms and improve quality of life:

**Non-Surgical Options:**
💊 **Medications:** Pain relievers, NSAIDs, corticosteroid injections
🏃 **Physical Therapy:** Strengthening exercises, range-of-motion activities
⚖️ **Weight Management:** Reduces stress on weight-bearing joints
🧊 **Hot/Cold Therapy:** Reduces pain and inflammation
🦯 **Assistive Devices:** Braces, canes, shoe inserts

**Surgical Options (Advanced Cases):**
🏥 **Arthroscopy:** Minimally invasive joint repair
🦴 **Osteotomy:** Bone realignment
🔧 **Joint Replacement:** For severe cases

**Lifestyle Changes:**
✓ Low-impact exercises (swimming, cycling)
✓ Anti-inflammatory diet
✓ Adequate rest and sleep
✓ Stress management

Always discuss treatment options with your healthcare provider!`;
    } else if (lowerMessage.includes("prevent") || lowerMessage.includes("avoid")) {
      response = `Great question! While you can't prevent all OA risk factors (like age or genetics), you can take proactive steps:

**Prevention Strategies:**

🏋️ **Maintain Healthy Weight**
• Reduces stress on joints (especially knees)
• Every 1 lb lost = 4 lbs less pressure on knees

🤸 **Stay Active**
• Low-impact exercises: swimming, cycling, yoga
• Strengthens muscles supporting joints
• Maintains flexibility

🥗 **Eat Joint-Friendly Foods**
• Omega-3 fatty acids (fish, nuts)
• Antioxidants (berries, leafy greens)
• Vitamin D and calcium

⚠️ **Protect Your Joints**
• Use proper techniques when lifting
• Avoid repetitive stress
• Wear appropriate footwear

🩺 **Regular Check-ups**
• Early detection allows earlier intervention
• Monitor joint health over time

🚫 **Avoid**
• Smoking (increases inflammation)
• Excessive alcohol
• Sedentary lifestyle

Prevention is always easier than treatment!`;
    } else if (lowerMessage.includes("resnet") || lowerMessage.includes("efficientnet") || lowerMessage.includes("model") || lowerMessage.includes("ai")) {
      response = `Our system uses an **Ensemble Deep Learning** approach combining two powerful neural networks:

**🔷 ResNet50 (Residual Network)**
• 50-layer deep convolutional network
• Uses "skip connections" to learn complex patterns
• Excellent for medical image classification
• Pre-trained on millions of images

**🔷 EfficientNetB7**
• State-of-the-art efficient architecture
• Balanced accuracy and computational efficiency
• Scales depth, width, and resolution optimally
• Highly accurate on medical imaging tasks

**🎯 Ensemble Approach Benefits:**
✓ Combines strengths of both models
✓ Reduces individual model weaknesses
✓ Increases overall prediction confidence
✓ More robust to image variations

**Training Process:**
1. Collected & annotated real X-ray images with medical professionals
2. Trained on labeled Normal vs Osteoarthritis cases
3. Validated on separate test datasets
4. Achieved 94%+ accuracy

The models analyze patterns like joint space narrowing, bone spurs, and cartilage changes.`;
    } else if (lowerMessage.includes("accurate") || lowerMessage.includes("reliable") || lowerMessage.includes("trust")) {
      response = `Great question about reliability! Here's the transparency you deserve:

**✅ Strengths:**
• **94%+ Accuracy** on test datasets
• **Ensemble approach** reduces errors
• **Grad-CAM visualization** for transparency
• **Trained on real medical data** annotated by doctors

**⚠️ Limitations:**
• **Research tool only** - not FDA-approved
• Best for knee X-rays (training focus)
• Image quality affects results
• Cannot replace clinical examination
• Doesn't account for patient history or symptoms

**🔍 How to Interpret Results:**
• High confidence (>90%) = Strong pattern detected
• Medium confidence (70-90%) = Moderate indicators
• Low confidence (<70%) = Uncertain, needs clinical review

**🏥 Why See a Doctor:**
• Clinical context matters (symptoms, history)
• Additional tests may be needed (MRI, CT)
• Physical examination provides crucial insights
• Treatment planning requires professional judgment

**Bottom Line:** This is a powerful screening tool to assist, not replace, medical professionals. Think of it as a "second opinion" that helps prioritize cases or provide educational insights.`;
    } else if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      response = `You're very welcome! 😊 I'm glad I could help you understand your results better. 

Remember:
• This is a research and educational tool
• Always consult healthcare professionals for medical decisions
• Early detection and intervention are key to managing OA
• Stay proactive about your joint health!

If you have any more questions about your X-ray analysis, osteoarthritis, or the AI system, feel free to ask anytime! 🏥💙`;
    } else {
      // Default fallback
      response = `I understand you're asking about "${userMessage}". 

I can help you with:
• Understanding your diagnosis results
• Explaining osteoarthritis and its symptoms
• How the AI model works (ResNet50 & EfficientNetB7)
• What Grad-CAM visualization means
• Treatment and prevention strategies
• Model accuracy and reliability

Could you please rephrase your question? For example:
- "What is osteoarthritis?"
- "How accurate is the AI model?"
- "What do the red areas in Grad-CAM mean?"
- "What should I do if I have osteoarthritis?"

I'm here to help! 😊`;
    }

    setIsTyping(false);
    return response;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Get AI response
    const aiResponse = await getAIResponse(inputValue);
    const assistantMessage = { role: "assistant", content: aiResponse };
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6 pointer-events-none">
      <div
        className="pointer-events-auto w-full md:w-96 h-[600px] bg-white rounded-3xl shadow-2xl border-2 border-emerald-200 flex flex-col overflow-hidden"
        style={{ animation: "slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl border border-white/30">
              🤖
            </div>
            <div>
              <h3 className="font-bold text-lg">Medical AI Assistant</h3>
              <p className="text-xs opacity-90">Ask me about your results</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-emerald-50/30 to-white">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              style={{ animation: `fade-in-up 0.3s ease-out ${idx * 0.05}s both` }}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                    : "bg-white border-2 border-emerald-100 text-slate-800 shadow-md"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-emerald-100 rounded-2xl px-4 py-3 shadow-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t-2 border-emerald-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {[
              "What is OA?",
              "How accurate?",
              "Treatment options",
              "Grad-CAM meaning"
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setInputValue(suggestion)}
                className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full text-xs font-medium whitespace-nowrap transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default MedicalChatbot;
