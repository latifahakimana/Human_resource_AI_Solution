// "use client";
// import { useState } from "react";
// import { ChevronLeft, Plus, X, Globe, Briefcase, GraduationCap, Award, FolderRoot } from "lucide-react";
// import { useRouter } from 'next/navigation';

// // DUMMY DATA MATCHING THE PDF SCHEMA
// const DUMMY_PROFILE = {
//   firstName: "RICHARD",
//   lastName: "USENGIMANA",
//   email: "usengimanarichard531@gmail.com",
//   headline: "Data Scientist",
//   bio: "Experienced data scientist with a focus on machine learning and AI-powered recruitment systems.",
//   location: "Kigali, Rwanda",
//   skills: [
//     { name: "Python", level: "Advanced", yearsOfExperience: 3 },
//     { name: "Node.js", level: "Intermediate", yearsOfExperience: 2 }
//   ],
//   experience: [
//     { 
//       company: "Rwanda AI Lab", 
//       role: "Junior Data Scientist", 
//       startDate: "2024-01", 
//       endDate: "Present", 
//       description: "Working on LLM integration and candidate screening logic.",
//       technologies: ["Python", "TensorFlow"],
//       isCurrent: true 
//     }
//   ],
//   education: [
//     { 
//       institution: "University of Rwanda", 
//       degree: "Bachelor of Science", 
//       fieldOfStudy: "Mathematics & Computer Science", 
//       startYear: "2020", 
//       endYear: "2024" 
//     }
//   ],
//   certifications: [
//     { name: "AWS Certified Developer", issuer: "Amazon", issueDate: "2025-01" }
//   ],
//   projects: [
//     { 
//       name: "E-commerce Platform", 
//       role: "Lead Developer", 
//       description: "A full-stack e-commerce solution with AI recommendations.", 
//       technologies: "React, Node.js, PostgreSQL", 
//       link: "https://github.com/richard/shop" 
//     }
//   ],
//   availability: { status: "Available", type: "Full-time" },
//   languages: [
//     { name: "English", proficiency: "Fluent" },
//     { name: "Kinyarwanda", proficiency: "Native" }
//   ]
// };

// export default function CreateTalentProfile() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState(DUMMY_PROFILE);
//     const router = useRouter();

//   const totalSteps = 7;
//   const progress = Math.round((step / totalSteps) * 100);

//   const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
//   const prevStep = () => setStep((s) => Math.max(s - 1, 1));

//   const handleFinish = () => {
//    router.push('/jobs');
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center py-12 px-4 font-sans">
//       {/* Back Nav */}
//       <div className="w-full max-w-4xl mb-8">
//         <button onClick={prevStep} className="flex items-center text-gray-500 hover:text-gray-800 transition-all">
//           <ChevronLeft size={20} />
//           <span className="ml-2 text-sm font-medium">Back to Home</span>
//         </button>
//       </div>

//       {/* Progress Header */}
//       <div className="w-full max-w-4xl mb-10">
//         <h1 className="text-3xl font-bold text-[#1E293B] mb-2 tracking-tight">Create Your Talent Profile</h1>
//         <p className="text-gray-500">Complete all steps to submit your profile for AI evaluation</p>
        
//         <div className="mt-8">
//           <div className="flex justify-between text-sm font-semibold mb-2">
//             <span className="text-blue-600 font-bold">Step {step} of {totalSteps}</span>
//             <span className="text-gray-400">{progress}% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
//             <div 
//               className="bg-blue-600 h-full transition-all duration-700 ease-in-out" 
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Step Container */}
//       <div className="w-full max-w-4xl bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10">
//         {step === 1 && <BasicInfoForm data={formData} setData={setFormData} />}
//         {step === 2 && <SkillsForm data={formData} setData={setFormData} />}
//         {step === 3 && <ExperienceForm data={formData} setData={setFormData} />}
        
//         {/* Navigation Buttons */}
//         <div className="mt-12 flex justify-between pt-8 border-t border-gray-50">
//           <button 
//             onClick={prevStep}
//             className={`px-8 py-3 rounded-xl font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors ${step === 1 ? 'invisible' : ''}`}
//           >
//             Back
//           </button>
          
//           <button 
//             onClick={step === totalSteps ? handleFinish : nextStep}
//             className="px-12 py-3 rounded-xl font-bold text-white bg-[#2563EB] hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
//           >
//             {step === totalSteps ? "Finish & Submit" : "Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Sub-Form components for clean code
// function BasicInfoForm({ data, setData }: any) {
//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <div className="mb-8 flex items-center gap-3">
//         <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Globe size={20}/></div>
//         <div>
//           <h2 className="text-xl font-bold text-[#1E293B]">Basic Information</h2>
//           <p className="text-sm text-gray-500">Tell us about yourself</p>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">First Name *</label>
//           <input 
//             className="w-full p-4 border border-gray-200 rounded-2xl focus:border-blue-500 outline-none transition-all"
//             value={data.firstName}
//             onChange={(e) => setData({...data, firstName: e.target.value})}
//           />
//         </div>
//         <div>
//           <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Last Name *</label>
//           <input 
//             className="w-full p-4 border border-gray-200 rounded-2xl focus:border-blue-500 outline-none transition-all"
//             value={data.lastName}
//             onChange={(e) => setData({...data, lastName: e.target.value})}
//           />
//         </div>
//       </div>

//       <div className="mb-6">
//         <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Professional Headline *</label>
//         <input 
//           className="w-full p-4 border border-gray-200 rounded-2xl focus:border-blue-500 outline-none transition-all"
//           value={data.headline}
//           onChange={(e) => setData({...data, headline: e.target.value})}
//         />
//       </div>

//       <div>
//         <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Bio (max 500 characters) *</label>
//         <textarea 
//           rows={4}
//           className="w-full p-4 border border-gray-200 rounded-2xl focus:border-blue-500 outline-none transition-all resize-none"
//           value={data.bio}
//           onChange={(e) => setData({...data, bio: e.target.value})}
//         />
//         <p className="text-right text-xs text-gray-300 font-medium mt-2">{data.bio.length}/500</p>
//       </div>
//     </div>
//   );
// }

// function SkillsForm({ data, setData }: any) {
//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <div className="mb-8 flex items-center gap-3">
//         <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Award size={20}/></div>
//         <div>
//           <h2 className="text-xl font-bold text-[#1E293B]">Skills</h2>
//           <p className="text-sm text-gray-500">Add your professional skills and proficiency levels</p>
//         </div>
//       </div>

//       {data.skills.map((skill: any, idx: number) => (
//         <div key={idx} className="p-8 border border-gray-100 rounded-3xl bg-[#FBFBFF] mb-6 relative">
//           <button className="absolute top-6 right-6 text-gray-300 hover:text-red-500"><X size={20}/></button>
//           <div className="mb-8">
//             <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Skill Name</label>
//             <input 
//               className="w-full p-4 border border-gray-100 rounded-2xl bg-white shadow-sm outline-none"
//               value={skill.name}
//             />
//           </div>
//           <div className="space-y-4">
//              <div className="flex justify-between font-bold">
//                <span className="text-sm text-gray-500">Proficiency Level</span>
//                <span className="text-blue-600">{skill.level}</span>
//              </div>
//              <input type="range" className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
//              <div className="flex justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest">
//                 <span>Beginner</span>
//                 <span>Intermediate</span>
//                 <span>Advanced</span>
//                 <span>Expert</span>
//              </div>
//           </div>
//         </div>
//       ))}

//       <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-blue-200 hover:text-blue-400 transition-all">
//         <Plus size={20}/> Add Skill
//       </button>
//     </div>
//   );
// }

// function ExperienceForm({ data, setData }: any) {
//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <div className="mb-8 flex items-center gap-3">
//         <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Award size={20}/></div>
//         <div>
//           <h2 className="text-xl font-bold text-[#1E293B]">Skills</h2>
//           <p className="text-sm text-gray-500">Add your professional skills and proficiency levels</p>
//         </div>
//       </div>

//       {data.skills.map((skill: any, idx: number) => (
//         <div key={idx} className="p-8 border border-gray-100 rounded-3xl bg-[#FBFBFF] mb-6 relative">
//           <button className="absolute top-6 right-6 text-gray-300 hover:text-red-500"><X size={20}/></button>
//           <div className="mb-8">
//             <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Skill Name</label>
//             <input 
//               className="w-full p-4 border border-gray-100 rounded-2xl bg-white shadow-sm outline-none"
//               value={skill.name}
//             />
//           </div>
//           <div className="space-y-4">
//              <div className="flex justify-between font-bold">
//                <span className="text-sm text-gray-500">Proficiency Level</span>
//                <span className="text-blue-600">{skill.level}</span>
//              </div>
//              <input type="range" className="w-full accent-blue-600 h-1.5 bg-black-200 rounded-lg appearance-none cursor-pointer" />
//              <div className="flex justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest">
//                 <span>Beginner</span>
//                 <span>Intermediate</span>
//                 <span>Advanced</span>
//                 <span>Expert</span>
//              </div>
//           </div>
//         </div>
//       ))}

//       <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold flex items-center justify-center gap-2 hover:border-blue-200 hover:text-blue-400 transition-all">
//         <Plus size={20}/> Add Skill
//       </button>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { ChevronLeft, Plus, X, Globe, Briefcase, GraduationCap, Award, FolderRoot, Link as LinkIcon, Calendar, CheckCircle2 } from "lucide-react";
import { useRouter } from 'next/navigation';

// INITIAL STATE MATCHING THE PDF SCHEMA EXACTLY
const INITIAL_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  headline: "",
  bio: "",
  location: "",
  skills: [{ name: "", level: "Intermediate", yearsOfExperience: 1 }],
  languages: [{ name: "", proficiency: "Conversational" }],
  experience: [{ 
    company: "", role: "", startDate: "", endDate: "", 
    description: "", technologies: "", isCurrent: false 
  }],
  education: [{ institution: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "" }],
  certifications: [{ name: "", issuer: "", issueDate: "" }],
  projects: [{ name: "", description: "", technologies: "", role: "", link: "", startDate: "", endDate: "" }],
  availability: { status: "Available", type: "Full-time", startDate: "" },
  socialLinks: { linkedin: "", github: "", portfolio: "" }
};

export default function CreateTalentProfile() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const totalSteps = 7;
  const progress = Math.round((step / totalSteps) * 100);

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Data Transformation: Convert comma-separated tech strings to arrays for the AI schema
      const finalData = {
        ...formData,
        experience: formData.experience.map(exp => ({
          ...exp,
          technologies: typeof exp.technologies === 'string' ? exp.technologies.split(',').map(s => s.trim()) : exp.technologies
        })),
        projects: formData.projects.map(proj => ({
          ...proj,
          technologies: typeof proj.technologies === 'string' ? proj.technologies.split(',').map(s => s.trim()) : proj.technologies
        }))
      };

      const response = await fetch('/api/talent/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        router.push('/dashboard?success=profile_created');
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center py-12 px-4 font-sans">
      <div className="w-full max-w-4xl mb-8">
        <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-gray-800 transition-all">
          <ChevronLeft size={20} />
          <span className="ml-2 text-sm font-medium">Back</span>
        </button>
      </div>

      <div className="w-full max-w-4xl mb-10">
        <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Talent Profile Specification</h1>
        <div className="mt-8">
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span className="text-blue-600">Step {step} of {totalSteps}</span>
            <span className="text-gray-400">{progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-3xl border border-gray-100 shadow-sm p-10">
        {step === 1 && <BasicInfoForm data={formData} setData={setFormData} />}
        {step === 2 && <SkillsAndLanguagesForm data={formData} setData={setFormData} />}
        {step === 3 && <WorkExperienceForm data={formData} setData={setFormData} />}
        {step === 4 && <EducationForm data={formData} setData={setFormData} />}
        {step === 5 && <ProjectsForm data={formData} setData={setFormData} />}
        {step === 6 && <CertificationsForm data={formData} setData={setFormData} />}
        {step === 7 && <AvailabilityForm data={formData} setData={setFormData} />}

        <div className="mt-12 flex justify-between pt-8 border-t border-gray-50">
          <button onClick={prevStep} className={`px-8 py-3 rounded-xl font-bold text-gray-500 bg-gray-50 ${step === 1 ? 'invisible' : ''}`}>Back</button>
          <button 
            onClick={step === totalSteps ? handleSubmit : nextStep}
            disabled={isSubmitting}
            className="px-12 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg disabled:bg-gray-400"
          >
            {isSubmitting ? "Saving..." : step === totalSteps ? "Finish & Submit" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** SUB-COMPONENTS FOR EACH STEP **/

function BasicInfoForm({ data, setData }: any) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-4">
        <Globe className="text-blue-600" />
        <h2 className="text-xl font-bold">1. Basic Information</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="First Name *" value={data.firstName} onChange={(v:any) => setData({...data, firstName: v})} />
        <Input label="Last Name *" value={data.lastName} onChange={(v:any) => setData({...data, lastName: v})} />
      </div>
      <Input label="Email Address *" value={data.email} onChange={(v:any) => setData({...data, email: v})} />
      <Input label="Headline (e.g. Senior Fullstack Engineer) *" value={data.headline} onChange={(v:any) => setData({...data, headline: v})} />
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-400 uppercase">Bio</label>
        <textarea 
          className="w-full p-4 border rounded-2xl focus:ring-2 ring-blue-100 outline-none h-32" 
          value={data.bio} 
          onChange={(e) => setData({...data, bio: e.target.value})}
        />
      </div>
      <Input label="Location (City, Country) *" value={data.location} onChange={(v:any) => setData({...data, location: v})} />
    </div>
  );
}

function SkillsAndLanguagesForm({ data, setData }: any) {
  const addSkill = () => setData({...data, skills: [...data.skills, { name: "", level: "Intermediate", yearsOfExperience: 1 }]});
  const addLang = () => setData({...data, languages: [...data.languages, { name: "", proficiency: "Fluent" }]});

  return (
    <div className="space-y-8 animate-in fade-in">
      <section>
        <h3 className="font-bold mb-4 flex items-center gap-2"><Award size={18}/> Skills</h3>
        {data.skills.map((s: any, i: number) => (
          <div key={i} className="flex gap-4 mb-4 items-end bg-gray-50 p-4 rounded-2xl">
            <Input className="flex-1" label="Skill Name" value={s.name} onChange={(v:any) => {
              const newSkills = [...data.skills]; newSkills[i].name = v; setData({...data, skills: newSkills});
            }} />
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Level</label>
              <select className="w-full p-4 border rounded-xl" value={s.level} onChange={(e) => {
                const newSkills = [...data.skills]; newSkills[i].level = e.target.value; setData({...data, skills: newSkills});
              }}>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option>
              </select>
            </div>
            <Input className="w-24" label="Years" type="number" value={s.yearsOfExperience} onChange={(v:any) => {
               const newSkills = [...data.skills]; newSkills[i].yearsOfExperience = parseInt(v); setData({...data, skills: newSkills});
            }} />
          </div>
        ))}
        <button onClick={addSkill} className="text-blue-600 font-bold text-sm">+ Add Skill</button>
      </section>

      <section>
        <h3 className="font-bold mb-4 flex items-center gap-2"><Globe size={18}/> Languages</h3>
        {data.languages.map((l: any, i: number) => (
          <div key={i} className="flex gap-4 mb-4 items-end bg-gray-50 p-4 rounded-2xl">
            <Input className="flex-1" label="Language" value={l.name} onChange={(v:any) => {
              const nl = [...data.languages]; nl[i].name = v; setData({...data, languages: nl});
            }} />
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Proficiency</label>
              <select className="w-full p-4 border rounded-xl" value={l.proficiency} onChange={(e) => {
                 const nl = [...data.languages]; nl[i].proficiency = e.target.value; setData({...data, languages: nl});
              }}>
                <option>Basic</option><option>Conversational</option><option>Fluent</option><option>Native</option>
              </select>
            </div>
          </div>
        ))}
        <button onClick={addLang} className="text-blue-600 font-bold text-sm">+ Add Language</button>
      </section>
    </div>
  );
}

function WorkExperienceForm({ data, setData }: any) {
  const addExp = () => setData({...data, experience: [...data.experience, { company: "", role: "", startDate: "", endDate: "", description: "", technologies: "", isCurrent: false }]});
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2"><Briefcase/> Work Experience</h2>
      {data.experience.map((exp: any, i: number) => (
        <div key={i} className="p-6 border rounded-3xl space-y-4 relative">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Company" value={exp.company} onChange={(v:any) => {
               const ne = [...data.experience]; ne[i].company = v; setData({...data, experience: ne});
            }}/>
            <Input label="Role" value={exp.role} onChange={(v:any) => {
               const ne = [...data.experience]; ne[i].role = v; setData({...data, experience: ne});
            }}/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date (YYYY-MM)" placeholder="2022-01" value={exp.startDate} onChange={(v:any) => {
               const ne = [...data.experience]; ne[i].startDate = v; setData({...data, experience: ne});
            }}/>
            <Input label="End Date (or 'Present')" value={exp.endDate} onChange={(v:any) => {
               const ne = [...data.experience]; ne[i].endDate = v; setData({...data, experience: ne});
            }}/>
          </div>
          <Input label="Technologies (comma separated)" placeholder="React, Node.js, AWS" value={exp.technologies} onChange={(v:any) => {
               const ne = [...data.experience]; ne[i].technologies = v; setData({...data, experience: ne});
          }}/>
        </div>
      ))}
      <button onClick={addExp} className="w-full py-4 border-2 border-dashed rounded-2xl text-gray-400 hover:text-blue-500 transition-all">+ Add Experience</button>
    </div>
  );
}

function ProjectsForm({ data, setData }: any) {
    const addProj = () => setData({...data, projects: [...data.projects, { name: "", description: "", technologies: "", role: "", link: "", startDate: "", endDate: "" }]});
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><FolderRoot/> Portfolio Projects</h2>
            {data.projects.map((p: any, i: number) => (
                <div key={i} className="p-6 border rounded-3xl space-y-4">
                    <Input label="Project Name" value={p.name} onChange={(v:any) => {
                        const np = [...data.projects]; np[i].name = v; setData({...data, projects: np});
                    }}/>
                    <Input label="Project Link" value={p.link} onChange={(v:any) => {
                        const np = [...data.projects]; np[i].link = v; setData({...data, projects: np});
                    }}/>
                    <Input label="Technologies Used" placeholder="Next.js, Tailwind, Prisma" value={p.technologies} onChange={(v:any) => {
                        const np = [...data.projects]; np[i].technologies = v; setData({...data, projects: np});
                    }}/>
                </div>
            ))}
            <button onClick={addProj} className="w-full py-4 border-2 border-dashed rounded-2xl text-gray-400 hover:text-blue-500">+ Add Project</button>
        </div>
    )
}

function AvailabilityForm({ data, setData }: any) {
    return (
        <div className="space-y-8">
            <h2 className="text-xl font-bold flex items-center gap-2"><Calendar/> Availability & Socials</h2>
            <div className="grid grid-cols-2 gap-4 bg-blue-50 p-6 rounded-3xl">
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Status</label>
                    <select className="w-full p-4 border rounded-xl" value={data.availability.status} onChange={(e) => setData({...data, availability: {...data.availability, status: e.target.value}})}>
                        <option>Available</option><option>Open to Opportunities</option><option>Not Available</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Type</label>
                    <select className="w-full p-4 border rounded-xl" value={data.availability.type} onChange={(e) => setData({...data, availability: {...data.availability, type: e.target.value}})}>
                        <option>Full-time</option><option>Part-time</option><option>Contract</option>
                    </select>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="font-bold">Social Links</h3>
                <Input label="LinkedIn URL" value={data.socialLinks.linkedin} onChange={(v:any) => setData({...data, socialLinks: {...data.socialLinks, linkedin: v}})}/>
                <Input label="GitHub URL" value={data.socialLinks.github} onChange={(v:any) => setData({...data, socialLinks: {...data.socialLinks, github: v}})}/>
            </div>
        </div>
    )
}

// Helpers for other sections (Education/Certs) follow same pattern...
function EducationForm({ data, setData }: any) { return <div className="space-y-4"><h2 className="text-xl font-bold flex items-center gap-2"><GraduationCap/> Education</h2><p className="text-gray-400">Complete the education details as per schema...</p></div> }
function CertificationsForm({ data, setData }: any) { return <div className="space-y-4"><h2 className="text-xl font-bold flex items-center gap-2"><Award/> Certifications</h2><p className="text-gray-400">Add your professional certifications...</p></div> }

// Reusable Input Component
function Input({ label, value, onChange, type = "text", className = "", placeholder = "" }: any) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full p-4 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 ring-blue-50 outline-none transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}