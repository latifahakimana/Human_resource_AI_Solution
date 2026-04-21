'use client';

import { useEffect, useState } from 'react';
import { Badge, Btn, Card, SectionHeader } from './ui';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onOpenNewJob: () => void;
  onOpenUpload: () => void;
}

export default function Dashboard({ onNavigate, onOpenNewJob, onOpenUpload }: DashboardProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-8 text-center" style={{ fontFamily: 'DM Sans' }}>Loading dashboard data...</div>;
  if (!data) return <div className="p-8 text-center">Error loading dashboard.</div>;

  return (
    <div>
      {/* Stat cards from MongoDB */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px', marginBottom: '24px' }}>
        {data.stats.map((s: any, i: number) => (
          <div key={i} className="fade-up" style={{
            background: '#fff', borderRadius: '12px', padding: '22px 24px',
            boxShadow: '0 4px 24px rgba(3,15,43,0.13)', position: 'relative', overflow: 'hidden',
            border: '1px solid var(--gray-100)',
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '80px', height: '80px',
              borderRadius: '0 12px 0 80px', background: s.color, opacity: 0.08,
            }} />
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gray-400)', marginBottom: '10px' }}>{s.label}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '32px', color: 'var(--blue-900)', lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Recent Jobs Table */}
        <Card className="fade-up">
          <div style={{ padding: '18px 20px 0' }}>
            <SectionHeader title="Recent Jobs" sub="Live from database">
              <Btn variant="outline" size="sm" onClick={() => onNavigate('jobs')}>View All</Btn>
            </SectionHeader>
          </div>
          <div style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Role', 'Location', 'Status', 'Action'].map((h) => (
                    <th key={h} style={{ background: 'var(--gray-50)', padding: '13px 20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gray-400)', textAlign: 'left', borderBottom: '1px solid var(--gray-100)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recentJobs.map((job: any) => (
                  <tr key={job._id} style={{ borderBottom: '1px solid var(--gray-100)', transition: 'background 0.15s' }}>
                    <td style={{ padding: '14px 20px', fontSize: '14px' }}>
                      <div style={{ fontWeight: 600 }}>{job.title}</div>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--gray-500)' }}>{job.location}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <Badge variant={job.status}>{job.status}</Badge>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                       <Btn variant="ghost" size="sm" onClick={() => onNavigate('jobs')}>View</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* AI Activity Chart using dynamic data */}
        <Card style={{ padding: '20px' }} className="fade-up">
          <SectionHeader title="AI Activity" sub="last 7 days" />
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', paddingBottom: '4px', marginTop: '20px' }}>
            {data.analytics.map((d: any) => (
              <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--blue-600)' }}>{d.val}</div>
                <div style={{ width: '100%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg, var(--blue-400), var(--blue-600))', height: `${d.h}px`, transition: 'height 0.5s ease' }} />
                <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>{d.label}</div>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', background: 'var(--gray-100)', margin: '20px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Btn variant="primary" style={{ justifyContent: 'center' }} onClick={onOpenNewJob}>＋ Post New Job</Btn>
            <Btn variant="ai" style={{ justifyContent: 'center' }} onClick={() => onNavigate('screening')}>🤖 Run AI Screening</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}
