"use client";
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { UserAnswer } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  const params = useParams(); // ✅ Unwrap params using useParams()

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params; // ✅ Await params Promise
      if (!resolvedParams?.interviewId) {
        console.error("Interview ID is missing!");
        return;
      }
      GetFeedback(resolvedParams.interviewId);
    };

    fetchParams();
  }, [params]);

  const GetFeedback = async (interviewId) => {
    try {
      console.log("Fetching feedback for interview ID:", interviewId);
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);

      console.log("Fetched feedback:", result);
      setFeedbackList(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

 // Ensure only valid numeric ratings are used
const validRatings = feedbackList
.map(item => Number(item.rating)) // Convert to number
.filter(rating => !isNaN(rating) && rating >= 0); // Remove invalid ratings

const overallRating =
validRatings.length > 0
  ? validRatings.reduce((sum, rating) => sum + rating, 0)
  : "N/A";


  return (
    <div className='p-10'>
      {feedbackList.length === 0 ? (
        <h2 className='font-bold text-xl text-gray-500'>
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className='text-3xl font-bold text-green-500'>Congratulations</h2>
          <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
          <h2 className='text-primary text-lg my-3'>
            Your overall interview rating: <strong>{overallRating}/25</strong>
          </h2>
          <h2 className='text-sm text-gray-500'>
            Find below interview questions with correct answers, your answers, and feedback for improvement.
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className='mt-7'> 
              <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>
                {item.question} <ChevronsUpDown className='h-5 w-5' />
              </CollapsibleTrigger>
              <CollapsibleContent> 
                <div className='flex flex-col gap-2'>
                  <h2 className='text-red-500 p-2 border rounded-lg'>
                    <strong>Rating:</strong> {item.rating}
                  </h2>
                  <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                    <strong>Your Answer:</strong> {item.userAns}
                  </h2>
                  <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                    <strong>Correct Answer:</strong> {item.correctAns}
                  </h2>
                  <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'>
                    <strong>Feedback:</strong> {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>      
          ))}
        </>
      )}
      <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;
