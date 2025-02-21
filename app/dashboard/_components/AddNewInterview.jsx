"use client"; // We have used useState so we have to make "use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GemininiAIModel";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/utils/db'
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";


function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition,setJobPosition]=useState();
  const [jobDescription,setJobDescription]=useState();
  const [jobExperience,setJobExperience]=useState();
  const [loading,setLoading]=useState(false);
  const [jsonResponse,setJsonResponse]=useState([]);
  const {user}=useUser();
  const router=useRouter();

  const onSubmit=async(e)=>{
    setLoading(true)
    e.preventDefault()
    console.log(jobPosition,jobDescription,jobExperience)
    const InputPrompt="Job Position:"+jobPosition+", Job Description: "+jobDescription+" ,Years of Experience:"+jobExperience+", Depends on this Job Position,Job Description & chatYears of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview questions along with Answer in JSON Format, Give question and answered field on JSON"

    const result=await chatSession.sendMessage(InputPrompt)
    const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')

    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);

    if(MockJsonResp){
     
    const resp=await db.insert(MockInterview)
    .values({
      mockId:uuidv4(),
      jsonMockResp:MockJsonResp,
      jobPosition:jobPosition,
      jobDescription:jobDescription,
      jobExperience:jobExperience,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-YYYY')
    }).returning({mockId:MockInterview.mockId});

    console.log("Inserted ID:",resp)
    if (resp) {
      setOpenDialog(false);
      router.push(`/dashboard/interview/${resp[0]?.mockId}`);
    }
    
     
  }
  else{
    console.log("ERROR");
  }

    setLoading(false)
  }

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-2xl">
        Tell us more about your job interview
      </DialogTitle>
    </DialogHeader>

    <div className="text-sm text-muted-foreground font-serif">
      <h2>
        Add details about your job position/role, Job description and
        years of experience.
      </h2>
    </div>
    <form onSubmit={onSubmit}>
      <div>
        <div className="mt-7 my-2 font-serif">
          <label>Job Role/Job Position</label>
          <Input placeholder="Ex.Full Stack Developer" required 
          onChange={(event)=>setJobPosition(event.target.value)}/>
        </div>

        <div className="my-3 font-serif">
          <label>Job Description/ Tech Stack in Short</label>
          <Textarea placeholder="Ex.React,Angular,NodeJs,MySql etc" required 
          onChange={(event)=>setJobDescription(event.target.value)}/>
        </div>

        <div className="my-3 font-serif">
          <label>Years of Experience</label>
          <Input placeholder="Ex.5" type="number" max="60" 
          onChange={(event)=>setJobExperience(event.target.value)}/>
        </div>
      </div>
      <div className="flex gap-5 justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setOpenDialog(false)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading?
          <>
          <LoaderCircle className='animate-spin'/>'Generating from AI'
          </>:'Start Interview'
          }
        </Button>
      </div>
    </form>
  </DialogContent>
</Dialog>

    </div>
  );
}

export default AddNewInterview;


