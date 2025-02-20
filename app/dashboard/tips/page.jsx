export default function TipsPage() {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-4">AI Tips & Best Practices</h1>
        
        {/* Section 1: Answering Techniques */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">📢 How to Structure Your Answers</h2>
          <p>Use the <strong>STAR Method</strong> to structure your answers:</p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Situation:</strong> Describe the context of the problem.</li>
            <li><strong>Task:</strong> Explain your role in the situation.</li>
            <li><strong>Action:</strong> Describe the steps you took.</li>
            <li><strong>Result:</strong> Share the outcome of your actions.</li>
          </ul>
        </section>
  
        {/* Section 2: Common Mistakes */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">❌ Common Interview Mistakes</h2>
          <ul className="list-disc list-inside ml-4">
            <li>Giving very short or very long answers.</li>
            <li>Not making eye contact (if using webcam).</li>
            <li>Speaking too fast due to nervousness.</li>
            <li>Not tailoring answers to the job role.</li>
          </ul>
        </section>
  
        {/* Section 3: AI Suggestions */}
        <section>
          <h2 className="text-xl font-semibold mb-2">🤖 AI-Powered Suggestions</h2>
          <p>Our AI analyzes your answers and provides feedback on:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Clarity & Confidence in your speech.</li>
            <li>Use of relevant keywords.</li>
            <li>Overall structure of your answer.</li>
          </ul>
          <p className="mt-2">Use this feedback to refine your responses and improve over time!</p>
        </section>
      </div>
    );
  }
  