'use client';
import { analyticsData } from '@/lib/data';
import { Card, SectionHeader } from './ui';

export default function Analytics() {
  const metrics = [
    { label: 'Time to Hire', value: '8.4 days', sub: '↓ 32% vs last month', color: 'var(--success)' },
    { label: 'AI Accuracy', value: '94%', sub: '↑ 2% vs last month', color: 'var(--blue-500)' },
    { label: 'Screening Cost', value: '$0.12', sub: 'per candidate', color: 'var(--accent)' },
    { label: 'Offer Acceptance', value: '78%', sub: '↑ 5% vs last month', color: 'var(--warn)' },
  ];

  const sources = [
    { label: 'Umurava Platform', pct: 62, color: 'var(--blue-500)' },
    { label: 'LinkedIn', pct: 18, color: 'var(--blue-300)' },
    { label: 'Job Boards', pct: 12, color: 'var(--accent)' },
    { label: 'Referrals', pct: 8, color: 'var(--success)' },
  ];

  return (
    <div>
      <SectionHeader title="Analytics & Insights" sub="Last 30 days" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px', marginBottom: '24px' }}>
        {metrics.map((m) => (
          <Card key={m.label} style={{ padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gray-400)', marginBottom: '8px' }}>{m.label}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '28px', color: 'var(--blue-900)', lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: '12px', color: m.color, marginTop: '6px', fontWeight: 600 }}>{m.sub}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Bar chart */}
        <Card style={{ padding: '24px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--blue-900)', marginBottom: '20px' }}>AI Screenings — Weekly</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px', paddingBottom: '4px' }}>
            {analyticsData.weekly.map((d) => (
              <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--blue-600)' }}>{d.val}</div>
                <div style={{ width: '100%', borderRadius: '6px 6px 0 0', background: 'linear-gradient(180deg, var(--blue-400), var(--blue-600))', height: `${d.h}px`, minHeight: '4px' }} />
                <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>{d.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Source breakdown */}
        <Card style={{ padding: '24px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--blue-900)', marginBottom: '20px' }}>Applicant Sources</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {sources.map((s) => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                  <span style={{ fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: 'var(--blue-600)' }}>{s.pct}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--gray-100)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '4px', background: s.color, width: `${s.pct}%`, transition: 'width 0.5s' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
