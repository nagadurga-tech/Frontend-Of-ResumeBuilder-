import React, { useState } from 'react'
import { Sparkles,Loader2 } from 'lucide-react'
import {useSelector} from 'react-redux'
import api from '../configs/api.js'
import { toast } from 'react-hot-toast'


const ProfessionalSummaryForm = ({data,onChange,setResumeData}) => {

    const {token}=useSelector(state=>state.auth)
    const[isGenerating,setIsGenerating]=useState(false);

    const generateSummary=async()=>{
        try{
            if(!data||!data?.trim()){
                toast.error("Please enter professional summary to enhance")
                return;
            }
            setIsGenerating(true)
        const prompt = `
                Create a SIMPLE, CLEAN, and FRESHER-LEVEL professional summary.
                Follow this structure strictly:
                - 3 to 4 short lines
                - Use easy words
                - No experience exaggeration
                - Suitable for a student or fresher resume
                - Mention skills and learning mindset
                - Professional but friendly tone

                Use this style as reference (do NOT copy words exactly):
                "Motivated and detail-oriented fresher with a strong foundation in the field.
                Skilled in core technical skills with hands-on project experience.
                Quick learner with a passion for problem-solving and growth.
                Eager to contribute effectively to a team environment."
                User input:
                "${data}"
                Return ONLY the enhanced summary text.`;

        const response=await api.post('/api/ai/enhance-pro-sum',{userContent:prompt},{headers:{Authorization:`Bearer ${token}`}})
        const enhancedText=response?.data?.enhancedContent;
        if(!enhancedText){
            toast.error("AI did not return summary");
            return;   
        }
        setResumeData(prev=>({...prev, professional_summary: enhancedText,}))
        onChange(enhancedText)
        }catch(error){
            toast.error(error?.response?.data?.message||error.message)
        }finally{
            setIsGenerating(false)
        }
    }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Add summary for your resume
          </p>
        </div>

        {/* Button */}
        <button
          type="button"
          disabled={isGenerating}
          onClick={generateSummary}
          className="self-start sm:self-auto flex items-center gap-1 px-3 py-2 text-xs sm:text-sm 
          bg-purple-100 text-purple-700 rounded-md 
          hover:bg-purple-200 transition disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={data || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="w-full p-3 text-sm border border-gray-300 rounded-lg 
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
        outline-none resize-none transition"
        placeholder="Write a professional summary highlighting your strengths and goals..."
      />
    </div>
  )
}

export default ProfessionalSummaryForm