"use client";
import { useState } from "react";
import { ChevronLeft, Plus, X, Globe, Briefcase, GraduationCap, Award, FolderRoot } from "lucide-react";
import { useRouter } from 'next/navigation';

// DUMMY DATA MATCHING THE PDF SCHEMA
const DUMMY_PROFILE = {
  firstName: "RICHARD",
  lastName: "USENGIMANA",
  email: "usengimanarichard531@gmail.com",
  headline: "Data Scientist",
  bio: "Experienced data scientist with a focus on machine learning and AI-powered recruitment systems.",
  location: "Kigali, Rwanda",
  skills: [
    { name: "Python", level: "Advanced", yearsOfExperience: 3 },
    { name: "Node.js", level: "Intermediate", yearsOfExperience: 2 }
  ],
  experience: [
    { 
      company: "Rwanda AI Lab", 
      role: "Junior Data Scientist", 
      startDate: "2024-01", 
      endDate: "Present", 
      description: "Working on LLM integration and candidate screening logic.",
      technologies: ["Python", "TensorFlow"],
      isCurrent: true 
    }
  ],
  education: [
    { 
      institution: "University of Rwanda", 
      degree: "Bachelor of Science", 
      fieldOfStudy: "Mathematics & Computer Science", 
      startYear: "2020", 
      endYear: "2024" 
    }
  ],
  certifications: [
    { name: "AWS Certified Developer", issuer: "Amazon", issueDate: "2025-01" }
  ],
  projects: [
    { 
      name: "E-commerce Platform", 
      role: "Lead Developer", 
      description: "A full-stack e-commerce solution with AI recommendations.", 
      technologies: "React, Node.js, PostgreSQL", 
      link: "https://github.com/richard/shop" 
    }
  ],
  availability: { status: "Available", type: "Full-time" },
  languages: [
    { name: "English", proficiency: "Fluent" },
    { name: "Kinyarwanda", proficiency: "Native" }
  ]
};

export default function CreateTalentProfile() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(DUMMY_PROFILE);
    const router = useRouter();

  const totalSteps = 7;
  const progress = Math.round((step / totalSteps) * 100);

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleFinish = () => {
   router.push('/jobs');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center py-12 px-4 font-sans">
      {/* Back Nav */}
      <div className="w-full max-w-4xl mb-8">
        <button onClick={prevStep} className="flex items-center text-gray-500 hover:text-gray-800 transition-all">
          <ChevronLeft size={20} />
          <span className="ml-2 text-sm font-medium">Back to Home</span>
        </button>
      </div>

      {/* Progress Header */}
      <div className="w-full max-w-4xl mb-10">
        <h1 className="text-3xl font-bold text-[#1E293B] mb-2 tracking-tight">Create Your Talent Profile</h1>
        <p className="text-gray-500">Complete all steps to submit your profile for AI evaluation</p>
        
        <div className="mt-8">
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span className="text-blue-600 font-bold">Step {step} of {totalSteps}</span>
            <span className="text-gray-400">{progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-700 ease-in-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Container */}
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10">
        {step === 1 && <BasicInfoForm data={formData} setData={setFormData} />}
        {step === 2 && <SkillsForm data={formData} setData={setFormData} />}
        {step === 3 && <ExperienceForm data={formData} setData={setFormData} />}
        
        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-between pt-8 border-t border-gray-50">
          <button 
            onClick={prevStep}
            className={`px-8 py-3 rounded-xl font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors ${step === 1 ? 'invisible' : ''}`}
          >
            Back
          </button>
          
          <button 
            onClick={step === totalSteps ? handleFinish : nextStep}
            className="px-12 py-3 rounded-xl font-bold text-white bg-[#2563EB] hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            {step === totalSteps ? "Finish & Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-Form components for clean code
function BasicInfoForm({ data, setData }: any) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center gap-3">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Globe size={20}/></div>
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Basic Information</h2>
          <p className="text-sm text-gray-500">Tell us about yourself</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">First Name *</label>
          <input 
            className="w-full p-4 border border-gray-200 rounded-2xl focus:border-blue-500 outline-none transition-all"
            value={data.firstName}
            onChange={(e) => setData({...data, firstName: e.target.value})}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Last Name *</label>
          <input 
            className="w-full p-4 border border-gray-200 rounded-2xl focus:border-blue-500 outline-none transition-all"
            value={data.lastName}
            onChange={(e) => setData({...data, lastName: e.target.value})}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Professional Headline *</label>
        <input 
          className="w-full p-4 border border-gray-200 rounded-2xl focus:border-blue-500 outline-none transition-all"
          value={data.headline}
          onChange={(e) => setData({...data, headline: e.target.value})}
        />
      </div>

      <div>
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Bio (max 500 characters) *</label>
        <textarea 
          rows={4}
          className="w-full p-4 border border-gray-200 rounded-2xl focus:border-blue-500 outline-none transition-all resize-none"
          value={data.bio}
          onChange={(e) => setData({...data, bio: e.target.value})}
        />
        <p className="text-right text-xs text-gray-300 font-medium mt-2">{data.bio.length}/500</p>
      </div>
    </div>
  );
}

function SkillsForm({ data, setData }: any) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center gap-3">
        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Award size={20}/></div>
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Skills</h2>
          <p className="text-sm text-gray-500">Add your professional skills and proficiency levels</p>
        </div>
      </div>

      {data.skills.map((skill: any, idx: number) => (
        <div key={idx} className="p-8 border border-gray-100 rounded-3xl bg-[#FBFBFF] mb-6 relative">
          <button className="absolute top-6 right-6 text-gray-300 hover:text-red-500"><X size={20}/></button>
          <div className="mb-8">
            <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Skill Name</label>
            <input 
              className="w-full p-4 border border-gray-100 rounded-2xl bg-white shadow-sm outline-none"
              value={skill.name}
            />
          </div>
          <div className="space-y-4">
             <div className="flex justify-between font-bold">
               <span className="text-sm text-gray-500">Proficiency Level</span>
               <span className="text-blue-600">{skill.level}</span>
             </div>
             <input type="range" className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
             <div className="flex justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
                <span>Expert</span>
             </div>
          </div>
        </div>
      ))}

      <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-blue-200 hover:text-blue-400 transition-all">
        <Plus size={20}/> Add Skill
      </button>
    </div>
  );
}

function ExperienceForm({ data, setData }: any) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center gap-3">
        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Award size={20}/></div>
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Skills</h2>
          <p className="text-sm text-gray-500">Add your professional skills and proficiency levels</p>
        </div>
      </div>

      {data.skills.map((skill: any, idx: number) => (
        <div key={idx} className="p-8 border border-gray-100 rounded-3xl bg-[#FBFBFF] mb-6 relative">
          <button className="absolute top-6 right-6 text-gray-300 hover:text-red-500"><X size={20}/></button>
          <div className="mb-8">
            <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Skill Name</label>
            <input 
              className="w-full p-4 border border-gray-100 rounded-2xl bg-white shadow-sm outline-none"
              value={skill.name}
            />
          </div>
          <div className="space-y-4">
             <div className="flex justify-between font-bold">
               <span className="text-sm text-gray-500">Proficiency Level</span>
               <span className="text-blue-600">{skill.level}</span>
             </div>
             <input type="range" className="w-full accent-blue-600 h-1.5 bg-black-200 rounded-lg appearance-none cursor-pointer" />
             <div className="flex justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
                <span>Expert</span>
             </div>
          </div>
        </div>
      ))}

      <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-blue-200 hover:text-blue-400 transition-all">
        <Plus size={20}/> Add Skill
      </button>
    </div>
  );
}