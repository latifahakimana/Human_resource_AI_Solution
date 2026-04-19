'use client';
import { Briefcase, UserCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Welcome to Umurava AI</h1>
          <p className="text-gray-500 text-lg">Choose your path to get started with our AI-powered talent platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recruiter Card */}
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center group hover:scale-[1.02] transition-all">
            <div className="p-5 bg-zinc-900 rounded-2xl mb-6 shadow-lg shadow-zinc-200">
              <Briefcase size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">I am a Recruiter</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Find and shortlist the best talent using our AI-driven screening system.
            </p>
            <Link 
              href="/auth" 
              className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
            >
              Recruiter Login <ChevronRight size={18} />
            </Link>
          </div>

          {/* Talent Card */}
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center group hover:scale-[1.02] transition-all">
            <div className="p-5 bg-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-100">
              <UserCircle size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">I am a Talent</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Create your profile to be discovered by top companies through AI evaluation.
            </p>
            <Link 
              href="/profile" 
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              Build My Profile <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}


