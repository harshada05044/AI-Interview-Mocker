"use client"; // because we use useEffect
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


function Interview({ params }) {
  const [resolvedParams, setResolvedParams] = useState({ interviewId: null }); // Default value as an object
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnable, setWebCamEnable] = useState(false);

  useEffect(() => {
    const getParams = async (params) => params; // Mock async function
    getParams(params).then((data) => setResolvedParams(data));
  }, [params]);

  /**
   * Fetch interview details by MockId/InterviewId
   */
  useEffect(() => {
    if (resolvedParams) {
      const GetInterviewDetails = async () => {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, resolvedParams.interviewId));
        setInterviewData(result[0]);
      };
      GetInterviewDetails();
    }
  }, [resolvedParams]);

  return (
    <div className='my-10 '>
      <h2 className='font-bold text-2xl mb-5'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>
        {/* Left Side (Job Details and Information) */}
        <div className='flex flex-col gap-5 my-5'>
          {/* Job Details Section */}
          {interviewData ? (
            <div className='flex flex-col p-5 rounded-lg border gap-5'>
              <h2 className='text-lg'>
                <strong>Job Role/Job Position:</strong> {interviewData.jobPosition}
              </h2>
              <h2 className='text-lg'>
                <strong>Job Description/Tech Stack:</strong> {interviewData.jobDescription}
              </h2>
              <h2 className='text-lg'>
                <strong>Years of Experience:</strong> {interviewData.jobExperience}
              </h2>
            </div>
          ) : (
            <p className='p-5 border rounded-lg'>Loading interview details...</p>
          )}

          {/* Information Section */}
          <div className='flex flex-col p-5 rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex items-center gap-2 text-yellow-600 '>
              <Lightbulb /> Information
            </h2>
            <p className=' mt-3 text-yellow-500'>
              {process.env.NEXT_PUBLIC_INFORMATION || "No additional information available at this time."}
            </p>
          </div>
        </div>

        {/* Right Side (Webcam) */}
        <div className='flex flex-col items-center gap-5'>
          {webCamEnable ? (
            <Webcam
              onUserMedia={() => setWebCamEnable(true)}
              onUserMediaError={() => setWebCamEnable(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
              <Button className="w-full" onClick={() => setWebCamEnable(true)}>Enable Web Cam and Microphone</Button>
            </>
          )}
        </div>
      </div>
      <div className='flex justify-end items-end mt-7'>
        <Link  href={'/dashboard/interview/'+resolvedParams.interviewId+'/start'}>
          <Button>Start Interview</Button>
        </Link>
        
      </div>
      
    </div>
  );
}

export default Interview;
