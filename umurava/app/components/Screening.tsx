
'use client';
import { useState, useEffect } from 'react';
import { Btn, Card, SectionHeader } from './ui';

interface ScreeningProps {
  onNavigate: (page: string) => void;
   onOpenUpload?: () => void;
}

type StepState = 'pending' | 'active' | 'done';

const STEPS = [
  { id: 1, label: 'Job Requirements Parsed', sub: 'Context loaded' },
  { id: 2, label: 'Applicants Loaded', sub: 'Database connection active' },
  { id: 3, label: 'Gemini AI Processing', sub: 'Analyzing profiles...' },
  { id: 4, label: 'Ranking & Shortlisting', sub: 'Calculating scores...' },
  { id: 5, label: 'Finalizing Results', sub: 'Updating database...' },
];

export default function Screening({ onNavigate, onOpenUpload }: ScreeningProps) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applicantCount, setApplicantCount] = useState(0);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [stepStates, setStepStates] = useState<StepState[]>(['done', 'done', 'pending', 'pending', 'pending']);

  // 1. Fetch Jobs and Applicant Count from Database
  useEffect(() => {
    async function fetchData() {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          fetch('/api/jobs'),
          fetch('/api/applicants')
        ]);
        const jobsData = await jobsRes.json();
        const appsData = await appsRes.json();
        
        setJobs(jobsData);
        setApplicantCount(appsData.length);
        if (jobsData.length > 0) setSelectedJobId(jobsData[0]._id);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 2. Real Logic: Loop through applicants and screen them via Gemini
  const startBulkScreening = async () => {
    if (!selectedJobId || running) return;
    setRunning(true);
    
    // Step 3: AI Processing Active
    setStepStates(['done', 'done', 'active', 'pending', 'pending']);

    try {
      // In a real production app, you would create a bulk API. 
      // Here, we fetch applicants and screen them one by one.
      const res = await fetch('/api/applicants');
      const applicants = await res.json();

      for (let i = 0; i < applicants.length; i++) {
        await fetch('/api/screening', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            applicantId: applicants[i]._id, 
            jobId: selectedJobId 
          })
        });
      }

      // Step 4 & 5: Finish up
      setStepStates(['done', 'done', 'done', 'active', 'pending']);
      setTimeout(() => setStepStates(['done', 'done', 'done', 'done', 'active']), 800);
      setTimeout(() => onNavigate('shortlist'), 2000); // Redirect to see results

    } catch (err) {
      alert("AI Screening encountered an error.");
      setRunning(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Initializing AI Engine...</div>;

  return (
    <div>
      <SectionHeader title="AI Screening Setup" sub="Umurava Intelligence" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
        <div>
          {/* Step 1: Select Job */}
          <Card style={{ padding: '24px', marginBottom: '20px' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--blue-900)', marginBottom: '16px' }}>1 · Select Target Job Posting</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)' }}>Job Posting</label>
              <select 
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                style={{ padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', fontSize: '14px', background: '#fff' }}
              >
                {jobs.map(job => (
                  <option key={job._id} value={job._id}>{job.title} — {job.location}</option>
                ))}
              </select>
            </div>
          </Card>

          {/* Step 2: Source Info */}
          <Card style={{ padding: '24px', marginBottom: '20px' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--blue-900)', marginBottom: '16px' }}>2 · Applicant Source</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px', background: 'var(--blue-50)', borderRadius: '12px', border: '1px solid var(--blue-100)' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--blue-900)' }}>{applicantCount} Candidates</div>
                <div style={{ fontSize: '13px', color: 'var(--blue-600)' }}>Currently in Umurava Database</div>
              </div>
              <div style={{ padding: '8px 16px', background: '#fff', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--success)', border: '1px solid var(--success)' }}>
                READY TO SCREEN
              </div>
            </div>
          </Card>

          {/* Step 3: Run */}
          <Card style={{ padding: '24px' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--blue-900)', marginBottom: '16px' }}>3 · Screening Settings</div>
            <p style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '20px' }}>
              AI will compare all {applicantCount} profiles against the selected job description using Gemini 1.5 Flash.
            </p>
            <Btn 
              variant="ai" 
              style={{ width: '100%', justifyContent: 'center', height: '48px' }} 
              onClick={startBulkScreening}
              disabled={running}
            >
              {running ? "🤖 Processing Candidates..." : "🤖 Run AI Screening with Gemini"}
            </Btn>
          </Card>
        </div>

        {/* AI Progress Panel */}
        <div style={{
          background: 'linear-gradient(135deg,var(--blue-900),var(--blue-700))',
          borderRadius: '12px', padding: '28px', color: '#fff'
        }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px' }}>🤖 Gemini AI Engine</div>
          <div style={{ fontSize: '13px', color: 'var(--blue-300)', marginBottom: '25px' }}>Batch Evaluation Mode</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {STEPS.map((step, i) => {
              const state = stepStates[i];
              return (
                <div key={step.id} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px', borderRadius: '10px',
                  background: state === 'done' ? 'rgba(0,194,124,0.15)' : state === 'active' ? 'rgba(43,107,232,0.4)' : 'rgba(255,255,255,0.05)',
                  transition: 'all 0.3s'
                }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: state === 'done' ? 'var(--success)' : state === 'active' ? 'var(--blue-400)' : 'rgba(255,255,255,0.1)'
                  }}>
                    {state === 'done' ? '✓' : '●'}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{step.label}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{step.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}