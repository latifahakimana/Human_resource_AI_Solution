'use client';
import { useState } from 'react';
import { Btn, Card, SectionHeader } from './ui';

interface ScreeningProps {
  onNavigate: (page: string) => void;
  onOpenUpload: () => void;
}

type StepState = 'pending' | 'active' | 'done';

interface Step {
  id: number;
  label: string;
  sub: string;
}

const STEPS: Step[] = [
  { id: 1, label: 'Job Requirements Parsed', sub: 'Extracted 12 criteria' },
  { id: 2, label: 'Applicants Loaded', sub: '87 profiles ready' },
  { id: 3, label: 'Multi-Candidate Evaluation', sub: 'Waiting to start…' },
  { id: 4, label: 'Scoring & Ranking', sub: 'Waiting…' },
  { id: 5, label: 'Generating Explanations', sub: 'Waiting…' },
  { id: 6, label: 'Shortlist Ready', sub: 'Waiting…' },
];

export default function Screening({ onNavigate, onOpenUpload }: ScreeningProps) {
  const [stepStates, setStepStates] = useState<StepState[]>(['done', 'done', 'pending', 'pending', 'pending', 'pending']);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'platform' | 'upload'>('platform');

  const runScreening = () => {
    if (running) return;
    setRunning(true);
    const updates = [
      [2, 'active'],
      [2, 'done', 3, 'active'],
      [3, 'done', 4, 'active'],
      [4, 'done', 5, 'active'],
      [5, 'done', 'nav'],
    ];
    let i = 0;
    const run = () => {
      if (i >= updates.length) return;
      const u = updates[i];
      setStepStates(prev => {
        const next = [...prev];
        for (let j = 0; j < u.length; j += 2) {
          if (u[j] === 'nav') break;
          const idx = u[j] as number;
          next[idx] = u[j + 1] as StepState;
        }
        return next;
      });
      if (u.includes('nav')) {
        setTimeout(() => onNavigate('shortlist'), 800);
        return;
      }
      i++;
      setTimeout(run, 900);
    };
    setTimeout(run, 400);
  };

  const weights = [
    { label: 'Skills Match', pct: 40 },
    { label: 'Experience', pct: 30 },
    { label: 'Education', pct: 15 },
    { label: 'Relevance', pct: 15 },
  ];

  return (
    <div>
      <SectionHeader title="AI Screening Setup" sub="Full-Stack Engineer" />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          {/* Step 1: Job */}
          <Card style={{ padding: '24px', marginBottom: '20px' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--blue-900)', marginBottom: '16px' }}>1 · Select Job Posting</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)' }}>Job Posting</label>
                <select style={{ padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--gray-800)', background: '#fff', outline: 'none' }}>
                  <option>Full-Stack Engineer — Kigali/Remote</option>
                  <option>UX/UI Designer — Remote</option>
                  <option>Data Analyst — Nairobi</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)' }}>Language</label>
                <select style={{ padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--gray-800)', background: '#fff', outline: 'none' }}>
                  <option>English</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '16px', padding: '14px', background: 'var(--blue-50)', borderRadius: '10px', border: '1px solid var(--blue-100)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue-600)', marginBottom: '8px' }}>JOB REQUIREMENTS</div>
              <div style={{ fontSize: '13px', color: 'var(--gray-600)', lineHeight: 1.7 }}>
                TypeScript · React · Node.js · MongoDB<br />
                3–5 years experience · Remote-friendly<br />
                Computer Science or related degree
              </div>
            </div>
          </Card>

          {/* Step 2: Source */}
          <Card style={{ padding: '24px', marginBottom: '20px' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--blue-900)', marginBottom: '16px' }}>2 · Applicant Source</div>
            <div style={{ display: 'flex', gap: '4px', background: 'var(--gray-100)', padding: '4px', borderRadius: '10px', marginBottom: '20px' }}>
              {(['platform', 'upload'] as const).map((tab) => (
                <div key={tab} onClick={() => setActiveTab(tab)} style={{
                  flex: 1, padding: '8px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
                  background: activeTab === tab ? '#fff' : 'transparent',
                  color: activeTab === tab ? 'var(--blue-600)' : 'var(--gray-600)',
                  boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                }}>
                  {tab === 'platform' ? 'Umurava Platform' : 'Upload Files'}
                </div>
              ))}
            </div>
            {activeTab === 'platform' ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'var(--blue-50)', borderRadius: '10px', border: '1px solid var(--blue-100)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--blue-900)' }}>87 Applicants</div>
                  <div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>From Umurava talent pool</div>
                </div>
                <span style={{ fontSize: '28px' }}>✅</span>
              </div>
            ) : (
              <div onClick={onOpenUpload} style={{ border: '2px dashed var(--gray-200)', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer', background: 'var(--gray-50)', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--blue-400)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--blue-50)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gray-200)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--gray-50)'; }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📂</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--blue-900)' }}>Drop files or click to upload</div>
                <div style={{ fontSize: '13px', color: 'var(--gray-400)', marginTop: '4px' }}>Spreadsheets or PDF resumes</div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
                  {['CSV', 'XLSX', 'PDF'].map(f => (
                    <span key={f} style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: 'var(--blue-50)', color: 'var(--blue-600)', border: '1px solid var(--blue-200)' }}>{f}</span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Step 3: Settings */}
          <Card style={{ padding: '24px' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--blue-900)', marginBottom: '16px' }}>3 · Screening Settings</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)' }}>Shortlist Size</label>
                <select style={{ padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', background: '#fff', outline: 'none' }}>
                  <option>Top 10 Candidates</option>
                  <option selected>Top 20 Candidates</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)', display: 'block', marginBottom: '10px' }}>Scoring Weights</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {weights.map(w => (
                    <div key={w.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gray-600)', width: '120px', flexShrink: 0 }}>{w.label}</span>
                      <div style={{ flex: 1, height: '8px', background: 'var(--gray-100)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: '4px', background: 'linear-gradient(90deg,var(--blue-500),var(--blue-300))', width: `${w.pct}%` }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--blue-600)', width: '32px', textAlign: 'right' }}>{w.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <Btn variant="ai" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} onClick={runScreening}>
                🤖 Run AI Screening with Gemini
              </Btn>
            </div>
          </Card>
        </div>

        {/* AI Progress Panel */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg,var(--blue-900),var(--blue-700))',
            borderRadius: '12px', padding: '28px', color: '#fff',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', background: 'radial-gradient(circle,rgba(0,212,255,0.2) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', marginBottom: '4px' }}>🤖 Gemini AI Engine</div>
            <div style={{ fontSize: '13px', color: 'var(--blue-300)', marginBottom: '20px' }}>Powered by Google Gemini API</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {STEPS.map((step, i) => {
                const state = stepStates[i];
                return (
                  <div key={step.id} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 16px', borderRadius: '10px',
                    background: state === 'done' ? 'rgba(0,212,255,0.12)' : state === 'active' ? 'rgba(43,107,232,0.3)' : 'rgba(255,255,255,0.07)',
                    fontSize: '13px', transition: 'all 0.3s',
                  }}>
                    <div className={state === 'active' ? 'step-pulse' : ''} style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', flexShrink: 0,
                      background: state === 'done' ? 'var(--success)' : state === 'active' ? 'var(--blue-400)' : 'rgba(255,255,255,0.15)',
                    }}>
                      {state === 'done' ? '✓' : state === 'active' ? '●' : '○'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>
                        {i >= 2 && state === 'active' ? ['Evaluating 87 candidates…', 'Scoring & Ranking', 'Generating Explanations', 'Shortlist Ready! 🎉'][i - 2] : step.label}
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                        {i >= 2 && state === 'active' ? ['Batch processing with Gemini', 'Weighted criteria applied', 'Natural language reasoning', 'Top 20 candidates identified'][i - 2] : step.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '20px', padding: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--blue-300)', marginBottom: '6px' }}>PROMPT STRATEGY</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>Multi-candidate batch evaluation with weighted scoring rubric and chain-of-thought reasoning per candidate.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
