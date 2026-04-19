'use client';
import { Briefcase, UserCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6">
    
        <div className="grid grid-cols-1 gap-8">
          {/* Recruiter Card */}
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center group hover:scale-[1.02] transition-all">
            <div className="p-5 bg-zinc-900 rounded-2xl mb-6 shadow-lg shadow-zinc-200">
              <Briefcase size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Thank you</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Your profile has been recorded successfully
            </p>
            <Link 
              href="/" 
              className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
            >
              Back to Home<ChevronRight size={18} />
            </Link>
          </div>

          {/* Talent Card */}
        </div>
    </main>
  );
}


// "use client";

// import { useState } from "react";

// const jobs = [
//   {
//     id: 1,
//     title: "Data Scientist",
//     description: "Work on machine kfhjksahfgwfghfbw schvcvjVCHC VHJVDCKDC BAK learning models and data analysis.",
//   },
//   {
//     id: 2,
//     title: "Data Analyst",
//     description: "Analyze datasets and generate insights.",
//   },
//   {
//     id: 3,
//     title: "Frontend Developer",
//     description: "Build modern UI using React and Next.js.",
//   },
// ];

// export default function Home() {
//   const [search, setSearch] = useState("");

//   const filteredJobs = jobs.filter((job) =>
//     job.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <main className="min-h-screen bg-gray-100 flex">
      
//       {/* 🔵 SIDEBAR */}
//       <aside className="w-64 bg-blue-700 text-white p-6 flex flex-col">
//         <h2 className="text-2xl font-bold mb-10">Umurava</h2>

//         <nav className="space-y-4">
//           <div className="bg-blue-600 p-3 rounded-lg cursor-pointer">
//             Dashboard
//           </div>

//           <div className="p-3 rounded-lg hover:bg-blue-600 cursor-pointer">
//             My Applications
//           </div>

//           <div className="p-3 rounded-lg hover:bg-blue-600 cursor-pointer">
//             Job Board
//           </div>

//           <div className="p-3 rounded-lg hover:bg-blue-600 cursor-pointer">
//             Saved Jobs
//           </div>
//         </nav>
//       </aside>

//       {/* MAIN CONTENT */}
//       <section className="flex-1 flex justify-center">
//         <div className="w-full max-w-6xl px-6 py-10">

//           {/* HEADER */}
//           <h1 className="text-3xl font-bold text-blue-600 mb-8">
//             Apply For Job
//           </h1>

//           {/* 🔍 SEARCH */}
//           <div className="mb-10">
//             <input
//               type="text"
//               placeholder="Search jobs..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full p-3 border rounded-xl shadow-sm 
//               text-black placeholder-gray-500
//               focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* 🧾 JOB CARDS */}
//           <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredJobs.length > 0 ? (
//               filteredJobs.map((job) => (
//                 <div
//                   key={job.id}
//                   className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition"
//                 >
//                   <h2 className="text-xl font-semibold text-blue-600">
//                     {job.title}
//                   </h2>

//                   <p className="text-gray-600 mt-3 text-sm">
//                     {job.description}
//                   </p>

//                   <div className="flex justify-between items-center mt-6">
//                     <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//                       Apply
//                     </button>

//                     <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
//                       View All
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 col-span-full">
//                 No jobs found.
//               </p>
//             )}
//           </div>

//         </div>
//       </section>
//     </main>
//   );
// }
