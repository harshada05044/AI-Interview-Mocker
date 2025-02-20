import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push('/dashboard/interview/' + interview?.mockId + "/feedback");
  };

  return (
    <div className="border border-violet-300 shadow-lg rounded-xl p-5 bg-white bg-opacity-90 backdrop-blur-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      
      {/* Job Position */}
      <h2 className="font-bold text-violet-700 text-lg tracking-wide">{interview?.jobPosition}</h2>

      {/* Experience */}
      <h2 className="text-sm text-gray-700 mt-1">{interview?.jobExperience} Years of Experience</h2>

      {/* Created At */}
      <h2 className="text-xs text-gray-500 mt-1">🕒 Created At: {interview?.createdAt}</h2>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4 gap-4">
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full border-violet-500 text-violet-600 hover:bg-violet-500 hover:text-white transition-all duration-300"
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>

        <Button 
          size="sm" 
          className="w-full bg-violet-700 hover:bg-violet-600 text-white transition-all duration-300"
          onClick={onStart}
        >
          Start
        </Button>
      </div>

    </div>
  );
}

export default InterviewItemCard;

