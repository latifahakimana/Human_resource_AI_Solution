'use client';
import { pipelineData } from '@/lib/data';
import { SectionHeader } from './ui';

const cols = [
  { key: 'applied' as const, label: 'Applied', colorClass: 'applied', count: 87, color: 'var(--blue-600)', bg: 'var(--blue-50)' },
  { key: 'screened' as const, label: 'AI Screened', colorClass: 'screened', count: 54, color: '#007FAF', bg: 'rgba(0,212,255,0.1)' },
  { key: 'shortlisted' as const, label: 'Shortlisted', colorClass: 'shortlist', count: 20, color: 'var(--success)', bg: 'rgba(0,194,124,0.1)' },
  { key: 'rejected' as const, label: 'Rejected', colorClass: 'rejected', count: 13, color: 'var(--danger)', bg: 'rgba(255,77,106,0.08)' },
];

export default function Pipeline() {
  return (
    <div>
      <SectionHeader title="Hiring Pipeline" sub="Full-Stack Engineer" />

      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
        {cols.map((col) => (
          <div key={col.key} style={{ minWidth: '220px', flex: 1 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', borderRadius: '10px 10px 0 0',
              fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px',
              background: col.bg, color: col.color,
            }}>
              {col.label}
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px',
              }}>{pipelineData[col.key].length}</div>
            </div>
            <div style={{ background: 'var(--gray-50)', padding: '8px', borderRadius: '0 0 10px 10px', minHeight: '120px' }}>
              {pipelineData[col.key].map((card) => (
                <div key={card.name} style={{
                  background: '#fff', borderRadius: '8px', padding: '12px',
                  marginBottom: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  fontSize: '13px', borderLeft: '3px solid var(--blue-300)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(3,15,43,0.13)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'; }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--blue-900)' }}>{card.name}</div>
                  <div style={{ color: 'var(--gray-400)', fontSize: '11px', marginTop: '2px' }}>{card.role}</div>
                  <div style={{ marginTop: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--blue-500)' }}>Score: {card.score}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Funnel stats */}
      <div style={{ marginTop: '24px', background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid var(--gray-100)', boxShadow: '0 4px 24px rgba(3,15,43,0.13)' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--blue-900)', marginBottom: '16px' }}>Conversion Funnel</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {[['Applied', '87', 'var(--blue-500)'], ['Screened', '54', 'var(--accent)'], ['Shortlisted', '20', 'var(--success)'], ['Interviewed', '8', 'var(--warn)'], ['Hired', '3', 'var(--blue-400)']].map(([label, val, color], i, arr) => (
            <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', position: 'relative' }}>
                <div style={{
                  height: `${80 - i * 12}px`,
                  background: color,
                  opacity: 0.85,
                  borderRadius: i === 0 ? '8px 0 0 8px' : i === arr.length - 1 ? '0 8px 8px 0' : '0',
                  transition: 'height 0.5s ease',
                }} />
              </div>
              <div style={{ marginTop: '8px', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', color: 'var(--blue-900)' }}>{val}</div>
              <div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
