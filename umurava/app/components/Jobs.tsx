
'use client';

import { useEffect, useState } from 'react';
import { Badge, Btn, Card, SectionHeader, ScoreBar } from './ui';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  status: 'active' | 'screening' | 'draft' | 'closed';
  educationLevel: string;
}

interface JobsProps {
  onOpenNewJob: () => void;
  onNavigate: (page: string) => void;
}

export default function Jobs({ onOpenNewJob, onNavigate }: JobsProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } 
    finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);


  if (loading) return <div className="p-8 text-center">Loading jobs...</div>;

  return (
    <div>
      <SectionHeader title="Job Postings" sub={`${jobs.length} total`}>
        <Btn variant="primary" onClick={onOpenNewJob}>＋ New Job</Btn>
      </SectionHeader>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', alignItems: 'center', flexWrap: 'wrap' }}>
        {['All Status', 'Active', 'Screening', 'Draft', 'Closed'].map((f) => (
          <select key={f} style={{
            padding: '8px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px',
            fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--gray-600)',
            background: '#fff', outline: 'none', cursor: 'pointer',
          }}>
            <option>{f}</option>
          </select>
        )).slice(0, 2)}
        <input type="text" placeholder="Search roles…" style={{
          padding: '8px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px',
          fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--gray-800)',
          background: '#fff', outline: 'none', width: '200px',
        }} />
        <Btn variant="outline" size="sm" style={{ marginLeft: 'auto' }}>📤 Export</Btn>
      </div>

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Job Role', 'Company', 'Location', 'Status', 'Eduaction Level', 'Actions'].map(h => (
                  <th key={h} style={{ background: 'var(--gray-50)', padding: '13px 20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gray-400)', textAlign: 'left', borderBottom: '1px solid var(--gray-100)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} style={{ borderBottom: '1px solid var(--gray-100)', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-50)')}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontWeight: 600 }}>{job.title}</div>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '14px', color: 'var(--gray-600)' }}>{job.company}</td>
                  <td style={{ padding: '14px 20px', fontSize: '14px', color: 'var(--gray-600)' }}>{job.location}</td>
                 
                  {/* <td style={{ padding: '14px 20px', minWidth: '140px' }}>
                    <ScoreBar value={job.scor || Math.floor(60 + Math.random() * 35)} />
                  </td> */}
                  <td style={{ padding: '14px 20px' }}>
                    <Badge variant={job.status}>{job.status?.charAt(0).toUpperCase() + job.status?.slice(1)}</Badge>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--gray-400)' }}>{job.educationLevel}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {job.status === 'draft' ? (
                        <Btn variant="ghost" size="sm">Edit</Btn>
                      ) : (
                        <Btn variant="ai" size="sm" onClick={() => onNavigate('screening')}>▶ Screen</Btn>
                      )}
                   
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}