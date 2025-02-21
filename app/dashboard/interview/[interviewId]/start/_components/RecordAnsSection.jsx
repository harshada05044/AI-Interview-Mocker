"use client";
import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, Video, VideoOff } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GemininiAIModel";
import { UserAnswer } from "@/utils/schema";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnsSection({ MockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isWebcamOn, setIsWebcamOn] = useState(true);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => setUserAnswer((prevAns) => prevAns + result?.transcript));
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);

    const feedbackPromt =
      "Question:" +
      MockInterviewQuestion[activeQuestionIndex]?.question +
      ",User Answer:" +
      userAnswer +
      "Depends on question and user answer for given interview question " +
      "please give us rating for answer and feedback as area of improvement if any " +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPromt);
    const mockJsonResp = result.response.text().replace("```json", "").replace("```", "");
    console.log(mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: MockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: MockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      {/* Webcam Section */}
      <div className="flex flex-col mt-20 justify-center bg-black items-center rounded-lg p-5 relative">
        {/* Show webcam only if it's turned on */}
        {isWebcamOn ? (
          <Webcam
            key={isWebcamOn} // Forces re-render when toggled
            className="w-full max-w-[500px] h-[300px] transform scale-x-[-1]" // Mirrors the webcam
          />
        ) : (
          <div className="w-full max-w-[500px] h-[300px] flex items-center justify-center text-white bg-gray-900">
            <Image src={"/webCam.png"} width={200} height={200} alt="Webcam placeholder image" />
          </div>
        )}
      </div>

      {/* Toggle Webcam Button */}
      <Button
        variant="outline"
        className="my-4"
        onClick={() => setIsWebcamOn((prev) => !prev)}
      >
        {isWebcamOn ? (
          <span className="flex gap-2">
            <VideoOff /> Turn Off Webcam
          </span>
        ) : (
          <span className="flex gap-2">
            <Video /> Turn On Webcam
          </span>
        )}
      </Button>

      {/* Start/Stop Recording Button */}
      <Button disable={loading} variant="outline" className="my-10" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording...
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
}

export default RecordAnsSection;
