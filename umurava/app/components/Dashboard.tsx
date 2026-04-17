'use client';
import { analyticsData, jobs } from '@/lib/data';
import { Badge, Btn, Card, SectionHeader } from './ui';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onOpenNewJob: () => void;
  onOpenUpload: () => void;
}

export default function Dashboard({ onNavigate, onOpenNewJob, onOpenUpload }: DashboardProps) {
  const stats = [
    { label: 'Active Jobs', value: '12', sub: '+3 this week', icon: '💼', color: 'var(--blue-500)' },
    { label: 'Total Applicants', value: '547', sub: '+84 this week', icon: '👥', color: 'var(--accent)' },
    { label: 'Shortlisted', value: '68', sub: '12.4% shortlist rate', icon: '⭐', color: 'var(--success)' },
    { label: 'AI Screenings Run', value: '31', sub: '94% accuracy rate', icon: '⚡', color: 'var(--warn)' },
  ];

  return (
    <div>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px', marginBottom: '24px' }}>
        {stats.map((s, i) => (
          <div key={i} className="fade-up" style={{
            background: '#fff', borderRadius: '12px', padding: '22px 24px',
            boxShadow: '0 4px 24px rgba(3,15,43,0.13)', position: 'relative', overflow: 'hidden',
            border: '1px solid var(--gray-100)', transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '80px', height: '80px',
              borderRadius: '0 12px 0 80px', background: s.color, opacity: 0.08,
            }} />
            <span style={{ position: 'absolute', top: '22px', right: '20px', fontSize: '24px', opacity: 0.65 }}>{s.icon}</span>
            <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gray-400)', marginBottom: '10px' }}>{s.label}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '32px', color: 'var(--blue-900)', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--gray-400)', marginTop: '6px' }}>
              <strong style={{ color: 'var(--success)' }}>{s.sub.split(' ')[0]}</strong> {s.sub.split(' ').slice(1).join(' ')}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Recent Jobs */}
        <Card className="fade-up">
          <div style={{ padding: '18px 20px 0' }}>
            <SectionHeader title="Recent Jobs" sub="5 active">
              <Btn variant="outline" size="sm" onClick={() => onNavigate('jobs')}>View All</Btn>
            </SectionHeader>
          </div>
          <div style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Role', 'Applicants', 'Status', 'Action'].map((h) => (
                    <th key={h} style={{ background: 'var(--gray-50)', padding: '13px 20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gray-400)', textAlign: 'left', borderBottom: '1px solid var(--gray-100)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.slice(0, 4).map((job) => (
                  <tr key={job.id} style={{ borderBottom: '1px solid var(--gray-100)', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-50)')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}>
                    <td style={{ padding: '14px 20px', fontSize: '14px' }}>
                      <div style={{ fontWeight: 600 }}>{job.role}</div>
                      <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>{job.location}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--blue-600)' }}>{job.applicants}</div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <Badge variant={job.status}>{job.status.charAt(0).toUpperCase() + job.status.slice(1)}</Badge>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      {job.status === 'draft' ? (
                        <Btn variant="ghost" size="sm">Edit</Btn>
                      ) : job.status === 'screening' ? (
                        <Btn variant="outline" size="sm" onClick={() => onNavigate('shortlist')}>View Results</Btn>
                      ) : (
                        <Btn variant="ai" size="sm" onClick={() => onNavigate('screening')}>▶ Screen</Btn>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* AI Activity + Quick Actions */}
        <Card style={{ padding: '20px' }} className="fade-up">
          <SectionHeader title="AI Activity" sub="last 7 days" />
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', paddingBottom: '4px' }}>
            {analyticsData.weekly.map((d) => (
              <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--blue-600)' }}>{d.val}</div>
                <div style={{ width: '100%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg, var(--blue-400), var(--blue-600))', height: `${d.h}px`, minHeight: '4px', transition: 'height 0.5s ease' }} />
                <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>{d.label}</div>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', background: 'var(--gray-100)', margin: '20px 0' }} />

          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--blue-900)', marginBottom: '14px' }}>Quick Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Btn variant="primary" style={{ justifyContent: 'center' }} onClick={onOpenNewJob}>＋ Post New Job</Btn>
            <Btn variant="ai" style={{ justifyContent: 'center' }} onClick={() => onNavigate('screening')}>🤖 Run AI Screening</Btn>
            <Btn variant="outline" style={{ justifyContent: 'center' }} onClick={onOpenUpload}>📂 Upload Applicants</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}
