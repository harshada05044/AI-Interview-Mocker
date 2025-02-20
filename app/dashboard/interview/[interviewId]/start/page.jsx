"use client";
import React, { useState, useEffect } from "react";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { db } from "@/utils/db";
import QuestionSection from "./_components/QuestionSection";
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params: paramsPromise }) {
  const [params, setParams] = useState(null); // State to store resolved params
  const [interviewData, setInterviewData] = useState();
  const [MockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

  // Resolve params and set state
  useEffect(() => {
    paramsPromise.then((resolvedParams) => setParams(resolvedParams));
  }, [paramsPromise]);

  // Fetch interview details once params are resolved
  useEffect(() => {
    if (params) {
      const GetInterviewDetails = async () => {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));

        if (result[0]) {
          setInterviewData(result[0]);

          const jsonMockResp = JSON.parse(result[0].jsonMockResp);
          console.log(jsonMockResp);
          setMockInterviewQuestion(jsonMockResp);
        }
      };

      GetInterviewDetails();
    }
  }, [params]);

  return(
  <div>
    <div className ='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/*Questions*/}
        <QuestionSection MockInterviewQuestion={MockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}/>

        {/*Video/Audio Recording*/}
        <RecordAnsSection 
        MockInterviewQuestion={MockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}/>
    </div>
    <div className='flex justify-end gap-6'>
     {activeQuestionIndex>0&& <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
     {activeQuestionIndex!==MockInterviewQuestion?.length-1&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
     {activeQuestionIndex==MockInterviewQuestion?.length-1&&
     <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
     <Button>End Interview</Button>
     </Link>
     }
    </div>
  </div>

  ) 
}

export default StartInterview;
