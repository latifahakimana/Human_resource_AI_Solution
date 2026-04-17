'use client';
import { jobs } from '@/lib/data';
import { Badge, Btn, Card, SectionHeader, ScoreBar } from './ui';

interface JobsProps {
  onOpenNewJob: () => void;
  onNavigate: (page: string) => void;
}

export default function Jobs({ onOpenNewJob, onNavigate }: JobsProps) {
  return (
    <div>
      <SectionHeader title="Job Postings" sub="12 total">
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
                {['Job Role', 'Department', 'Location', 'Applicants', 'Match Score', 'Status', 'Posted', 'Actions'].map(h => (
                  <th key={h} style={{ background: 'var(--gray-50)', padding: '13px 20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gray-400)', textAlign: 'left', borderBottom: '1px solid var(--gray-100)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} style={{ borderBottom: '1px solid var(--gray-100)', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-50)')}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontWeight: 600 }}>{job.role}</div>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '14px', color: 'var(--gray-600)' }}>{job.department}</td>
                  <td style={{ padding: '14px 20px', fontSize: '14px', color: 'var(--gray-600)' }}>{job.location}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ display: 'flex' }}>
                        {['A', 'B', 'C'].map((l, i) => (
                          <div key={i} style={{
                            width: '26px', height: '26px', borderRadius: '50%',
                            border: '2px solid #fff', marginLeft: i > 0 ? '-6px' : '0',
                            background: 'var(--blue-400)', color: '#fff',
                            fontSize: '10px', fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>{l}</div>
                        ))}
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--blue-600)' }}>{job.applicants}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', minWidth: '140px' }}>
                    <ScoreBar value={Math.floor(60 + Math.random() * 35)} />
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <Badge variant={job.status}>{job.status.charAt(0).toUpperCase() + job.status.slice(1)}</Badge>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--gray-400)' }}>{job.posted}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {job.status === 'draft' ? (
                        <Btn variant="ghost" size="sm">Edit</Btn>
                      ) : (
                        <Btn variant="ai" size="sm" onClick={() => onNavigate('screening')}>▶ Screen</Btn>
                      )}
                      <Btn variant="outline" size="sm">⋯</Btn>
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
