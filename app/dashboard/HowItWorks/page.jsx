export default function HowItWorksPage() {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">How It Works</h1>
  
        {/* Introduction */}
        <p className="text-lg mb-4">
          This website is designed for AI-powered mock interviews, helping users practice and improve their interview skills. 
        </p>
  
        {/* Step-by-Step Guide */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🚀 How to Use the AI Mock Interview</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Go to the <strong>Dashboard</strong> and click <strong>"Create New Interview"</strong>.</li>
            <li>Enter details like <strong>Job Role, Job Description, and Years of Experience</strong>.</li>
            <li>Click <strong>"Start Interview"</strong> to begin.</li>
          </ol>
        </div>
  
        {/* Interview Process */}
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold">🎤 During the Interview</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You will be asked <strong>five questions</strong>.</li>
            <li>Click <strong>"Record Answer"</strong> to respond.</li>
            <li>Optionally, turn on your <strong>webcam</strong> for a more realistic experience.</li>
            <li>Click <strong>"Next Question"</strong> to proceed or <strong>"Previous Question"</strong> to review.</li>
            <li>After answering all questions, click <strong>"End Interview"</strong>.</li>
          </ul>
        </div>
  
        {/* Feedback Section */}
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold">📊 Reviewing Your Feedback</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>After ending the interview, you will be navigated to the <strong>Feedback Page</strong>.</li>
            <li>Here, you can review:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li><strong>Your Answer</strong></li>
                <li><strong>AI's Suggested Answer</strong> (correct response)</li>
                <li><strong>AI-Generated Feedback</strong> for improvement</li>
                <li><strong>Score</strong> for each answer</li>
              </ul>
            </li>
            <li>You can revisit past feedback anytime from the <strong>Dashboard</strong>.</li>
          </ul>
        </div>
      </div>
    );
  }
  