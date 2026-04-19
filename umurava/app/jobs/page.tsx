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


