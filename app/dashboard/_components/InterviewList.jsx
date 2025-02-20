"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true); // HIGHLIGHT: Added loading state

  useEffect(() => {
    if (user) {
      GetInterviewList();
    } else {
      setLoading(false);
    }
  }, [user]);
   
  const GetInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));

      console.log(result);
      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false); // HIGHLIGHT: Set loading to false after fetching
    }
  };

  return (
    <div>
      <h2 className='font-md text-md font-bold'>Previous Mock Interview</h2>

      {loading ? (
        <div>Loading interviews...</div> // HIGHLIGHT: Show loading indicator while fetching
      ) : interviewList.length === 0 ? (
        <div className="text-gray-500">
          No previous interview records. It looks like you're a new user!
        </div> // HIGHLIGHT: Show message when no records are found
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
          {interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewList;
