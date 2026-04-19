'use client';
import { useState } from 'react';
import { Modal, Btn, Divider, ScoreRing } from './ui';

// ── New Job Modal ──────────────────────────────────────────────
export function NewJobModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      id="modal-new-job"
      open={open}
      onClose={onClose}
      title="Post New Job"
      footer={
        <>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="outline">Save as Draft</Btn>
          <Btn variant="primary">Publish Job</Btn>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {[
          { label: 'Job Title', placeholder: 'e.g. Full-Stack Engineer', full: false },
          { label: 'Department', placeholder: 'e.g. Engineering', full: false },
        ].map(f => (
          <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)' }}>{f.label}</label>
            <input type="text" placeholder={f.placeholder} style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--gray-800)', background: '#fff', outline: 'none' }} />
          </div>
        ))}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)' }}>Location</label>
          <input type="text" placeholder="e.g. Kigali / Remote" style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', background: '#fff', outline: 'none' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)' }}>Employment Type</label>
          <select style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', background: '#fff', outline: 'none' }}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)' }}>Job Description</label>
          <textarea placeholder="Describe the role, responsibilities, and requirements…" style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', background: '#fff', outline: 'none', minHeight: '100px', resize: 'vertical' }} />
        </div>

        <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)' }}>Required Skills</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '8px 12px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', minHeight: '44px' }}>
            {['TypeScript', 'React', 'Node.js'].map(s => (
              <span key={s} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 10px', background: 'var(--blue-50)', border: '1px solid var(--blue-200)', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: 'var(--blue-600)' }}>
                {s} <span style={{ cursor: 'pointer', color: 'var(--blue-400)', fontSize: '14px' }}>×</span>
              </span>
            ))}
            <input type="text" placeholder="Add skill…" style={{ border: 'none', outline: 'none', fontSize: '13px', fontFamily: 'DM Sans, sans-serif', minWidth: '80px', flex: 1 }} />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--gray-400)' }}>Press Enter to add a skill tag</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)' }}>Experience Required</label>
          <select style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', background: '#fff', outline: 'none' }}>
            <option>0–1 years</option>
            <option>1–3 years</option>
            <option selected>3–5 years</option>
            <option>5+ years</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)' }}>Salary Range</label>
          <input type="text" placeholder="e.g. $2,000 – $3,500 / month" style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', background: '#fff', outline: 'none' }} />
        </div>
      </div>
    </Modal>
  );
}

// ── Upload Modal ───────────────────────────────────────────────
export function UploadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<'spreadsheet' | 'pdf' | 'links'>('spreadsheet');

  const tabs = [
    { id: 'spreadsheet' as const, label: 'Spreadsheet (CSV/Excel)' },
    { id: 'pdf' as const, label: 'PDF Resumes' },
    { id: 'links' as const, label: 'Resume Links' },
  ];

  return (
    <Modal
      id="modal-upload"
      open={open}
      onClose={onClose}
      title="Upload Applicants"
      footer={
        <>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary">Upload & Process</Btn>
        </>
      }
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: '16px' }}>
          Upload applicant data for <strong style={{ color: 'var(--blue-900)' }}>Full-Stack Engineer</strong>
        </div>
        <div style={{ display: 'flex', gap: '4px', background: 'var(--gray-100)', padding: '4px', borderRadius: '10px', marginBottom: '20px' }}>
          {tabs.map(t => (
            <div key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: '8px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer',
              fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
              background: tab === t.id ? '#fff' : 'transparent',
              color: tab === t.id ? 'var(--blue-600)' : 'var(--gray-600)',
              boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            }}>{t.label}</div>
          ))}
        </div>

        {tab === 'spreadsheet' && (
          <>
            <div style={{ border: '2px dashed var(--gray-200)', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer', background: 'var(--gray-50)', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--blue-400)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--blue-50)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gray-200)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--gray-50)'; }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--blue-900)' }}>Drop your spreadsheet here</div>
              <div style={{ fontSize: '13px', color: 'var(--gray-400)', marginTop: '4px' }}>Or click to browse your files</div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
                {['CSV', 'XLSX', 'XLS'].map(f => (
                  <span key={f} style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: 'var(--blue-50)', color: 'var(--blue-600)', border: '1px solid var(--blue-200)' }}>{f}</span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: '14px', padding: '12px', background: 'var(--blue-50)', borderRadius: '10px', fontSize: '12px', color: 'var(--blue-600)', border: '1px solid var(--blue-100)' }}>
              💡 <strong>Tip:</strong> Your spreadsheet should include columns: Name, Email, Phone, Skills, Experience, Education, Location. <a href="#" style={{ color: 'var(--blue-500)' }}>Download template</a>
            </div>
          </>
        )}

        {tab === 'pdf' && (
          <div style={{ border: '2px dashed var(--gray-200)', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer', background: 'var(--gray-50)' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📄</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--blue-900)' }}>Drop PDF resumes here</div>
            <div style={{ fontSize: '13px', color: 'var(--gray-400)', marginTop: '4px' }}>Upload multiple PDFs at once</div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
              <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: 'var(--blue-50)', color: 'var(--blue-600)', border: '1px solid var(--blue-200)' }}>PDF</span>
            </div>
          </div>
        )}

        {tab === 'links' && (
          <div>
            <div style={{ marginBottom: '12px', fontSize: '13px', color: 'var(--gray-600)' }}>Paste resume or LinkedIn URLs below, one per line:</div>
            <textarea placeholder="https://linkedin.com/in/alice-mutoni&#10;https://linkedin.com/in/brian-ochieng&#10;https://drive.google.com/resume.pdf" style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', background: '#fff', outline: 'none', minHeight: '140px', resize: 'vertical' }} />
          </div>
        )}
      </div>
    </Modal>
  );
}

// ── Candidate Detail Modal ─────────────────────────────────────
export function CandidateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const candidate = {
    name: 'Alice Mutoni',
    role: 'Senior Software Engineer',
    location: 'Kigali',
    score: 91,
    rank: 1,
    rankOf: 87,
    verdict: 'Highly Recommended',
    // skillScores: [
    //   // { name: 'TypeScript', pct: 95 },
    //   // { name: 'React', pct: 90 },
    //   // { name: 'Node.js', pct: 85 },
    //   // { name: 'MongoDB', pct: 82 },
    //   // { name: 'AWS', pct: 35 },
    // ],
    education: 'BSc Computer Science – University of Rwanda',
    experience: '4 years in Full-Stack development',
    location2: 'Kigali, Rwanda (Open to remote)',
    source: 'Umurava Platform Profile',
    availability: 'Available immediately',
    reasoning: 'Alice Mutoni is the top-ranked candidate for this Full-Stack Engineer role. Her 4 years of TypeScript experience directly matches the primary technical requirement, and her React + Node.js portfolio demonstrates she can build scalable, production-grade systems. She has contributed to 3 enterprise-level projects involving MongoDB. Her primary gap is limited AWS/cloud experience. Given the strength of her core stack alignment, this gap is considered acceptable.',
    strengths: ['TypeScript expert', 'Full-stack portfolio', 'MongoDB experience', 'Immediate availability'],
    gaps: ['Limited AWS', 'No DevOps experience', 'Smaller team projects'],
  };

  return (
    <Modal
      id="modal-candidate"
      open={open}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'linear-gradient(135deg,#061A3F,#2B6BE8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '20px' }}>A</div>
          <div>
            <div>{candidate.name}</div>
            <div style={{ fontSize: '13px', color: 'var(--gray-400)', fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>
              {candidate.role} · {candidate.location} · <span style={{ color: 'var(--success)' }}>Rank #1</span>
            </div>
          </div>
        </div>
      }
      // footer={
      //   <>
      //     <Btn variant="ghost" onClick={onClose}>Close</Btn>
      //     <Btn variant="danger" size="sm">❌ Reject</Btn>
      //     <Btn variant="outline">📅 Schedule Interview</Btn>
      //     <Btn variant="primary">✅ Move to Interview</Btn>
      //   </>
      // }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Left: AI Evaluation */}
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: 'var(--blue-900)', marginBottom: '12px' }}>AI EVALUATION</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <ScoreRing score={candidate.score} size={72} />
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--blue-900)' }}>{candidate.score} / 100</div>
              <div style={{ fontSize: '13px', color: 'var(--success)', fontWeight: 600 }}>{candidate.verdict}</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Rank #{candidate.rank} of {candidate.rankOf} applicants</div>
            </div>
          </div>

          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--blue-900)', marginBottom: '10px' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* {candidate.skillScores.map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gray-600)', width: '90px', flexShrink: 0 }}>{s.name}</span>
                <div style={{ flex: 1, height: '8px', background: 'var(--gray-100)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '4px', background: 'linear-gradient(90deg,var(--blue-500),var(--blue-300))', width: `${s.pct}%` }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--blue-600)', width: '32px', textAlign: 'right' }}>{s.pct}%</span>
              </div>
            ))} */}
          </div>
        </div>

        {/* Right: Profile */}
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--blue-900)', marginBottom: '12px' }}>PROFILE DETAILS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: '🎓', label: 'Education', value: candidate.education },
              { icon: '💼', label: 'Experience', value: candidate.experience },
              { icon: '📍', label: 'Location', value: candidate.location2 },
              { icon: '🌐', label: 'Source', value: candidate.source },
              { icon: '📅', label: 'Availability', value: candidate.availability },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--gray-800)', marginTop: '1px' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--blue-900)', marginBottom: '10px' }}>🤖 AI REASONING</div>
      <div style={{ background: 'var(--blue-50)', borderRadius: '10px', padding: '16px', fontSize: '13px', lineHeight: 1.8, color: 'var(--gray-700)', borderLeft: '4px solid var(--blue-400)' }}>
        {candidate.reasoning} <strong style={{ color: 'var(--blue-600)' }}>Final recommendation: Strongly consider for first interview round.</strong>
      </div>

      <Divider />

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '160px', padding: '14px', background: 'rgba(0,194,124,0.07)', borderRadius: '10px', border: '1px solid rgba(0,194,124,0.2)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Strengths</div>
          <div style={{ fontSize: '12px', color: 'var(--gray-700)', lineHeight: 1.8 }}>
            {candidate.strengths.map(s => <div key={s}>✓ {s}</div>)}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: '160px', padding: '14px', background: 'rgba(255,176,32,0.07)', borderRadius: '10px', border: '1px solid rgba(255,176,32,0.2)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warn)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Gaps / Risks</div>
          <div style={{ fontSize: '12px', color: 'var(--gray-700)', lineHeight: 1.8 }}>
            {candidate.gaps.map(g => <div key={g}>⚠ {g}</div>)}
          </div>
        </div>
      </div>
    </Modal>
  );
}
