'use client';
import { useEffect, useState } from 'react';
import { Btn, ScoreRing, SectionHeader, Tag } from './ui';

export default function Shortlist({ onOpenCandidate }: { onOpenCandidate: (id: string) => void }) {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShortlist() {
      try {
        const res = await fetch('/api/applicants');
        if (res.ok) {
          const data = await res.json();
          // Filter for screened candidates and sort by AI score
          const sorted = data
            .filter((cand: any) => cand.score > 0)
            .sort((a: any, b: any) => b.score - a.score)
            .slice(0, 20);
          setCandidates(sorted);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchShortlist();
  }, []);

  const rankStyle = (rank: number) => {
    if (rank === 1) return { bg: '#FFF7E0', border: '#FFD700', color: '#B8860B' };
    if (rank === 2) return { bg: '#F5F5F5', border: '#C0C0C0', color: '#666' };
    if (rank === 3) return { bg: '#FFF0E8', border: '#CD7F32', color: '#8B4513' };
    return { bg: 'var(--blue-50)', border: 'var(--blue-200)', color: 'var(--blue-600)' };
  };

  if (loading) return <div className="p-10 text-center">Ranking candidates...</div>;

  return (
    <div>
      {/* Hero Stats */}
      <div className="fade-up" style={{
        background: 'linear-gradient(135deg,var(--blue-900) 0%, var(--blue-700) 60%, #1151C8 100%)',
        borderRadius: '12px', padding: '28px 32px', color: '#fff', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '24px', position: 'relative'
      }}>
        <div style={{ fontSize: '48px' }}>⭐</div>
        <div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px' }}>AI Shortlist Results</h2>
          <p style={{ fontSize: '13px', color: 'var(--blue-200)' }}>Top candidates ranked by Gemini AI</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: '28px' }}>{candidates.length}</div>
            <div style={{ fontSize: '11px', color: 'var(--blue-300)' }}>Shortlisted</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: '28px' }}>{candidates[0]?.score || 0}%</div>
            <div style={{ fontSize: '11px', color: 'var(--blue-300)' }}>Top Score</div>
          </div>
        </div>
      </div>

      <SectionHeader title={`Top ${candidates.length} Candidates`}>
        <Btn variant="outline" size="sm">Export CSV</Btn>
      </SectionHeader>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '18px' }}>
        {candidates.map((c, index) => {
          const rank = index + 1;
          const rs = rankStyle(rank);
          const initials = `${c.firstName?.[0] || ''}${c.lastName?.[0] || ''}`.toUpperCase();

          return (
            <div
              key={c._id}
              onClick={() => onOpenCandidate(c._id)}
              style={{
                background: '#fff', borderRadius: '12px',
                border: rank <= 3 ? `1.5px solid var(--blue-200)` : '1.5px solid var(--gray-100)',
                padding: '22px', transition: 'all 0.2s', position: 'relative', cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(3,15,43,0.07)',
              }}
            >
              {/* Rank Label */}
              <div style={{
                position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', 
                borderRadius: '50%', background: rs.bg, border: `2px solid ${rs.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: '13px', color: rs.color,
              }}>#{rank}</div>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '12px',
                  background: 'linear-gradient(135deg,var(--blue-600),var(--blue-400))',
                  color: '#fff', fontWeight: 700, fontSize: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{initials}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--blue-900)' }}>{c.firstName} {c.lastName}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{c.headline}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <ScoreRing score={c.score} />
                </div>
              </div>

              {/* FIX 1: Accessing Skills Name correctly */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                {c.skills?.slice(0, 4).map((s: any) => (
                  <Tag key={s.name}>{s.name}</Tag>
                ))}
                {c.gaps?.slice(0, 1).map((g: string) => (
                  <Tag key={g} gap>{g}</Tag>
                ))}
              </div>

              {/* Reasoning */}
              <div style={{ background: 'var(--gray-50)', borderRadius: '8px', padding: '12px', fontSize: '12px', color: 'var(--gray-600)', borderLeft: '3px solid var(--blue-300)', marginBottom: '14px' }}>
                {c.reasoning?.substring(0, 100)}...
              </div>

              {/* FIX 2: Accessing nested Education and Availability */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', color: 'var(--gray-400)' }}>
                  🎓 <strong>{c.education?.[0]?.fieldOfStudy || 'N/A'}</strong>
                </span>
                <span style={{ fontSize: '11px', color: 'var(--gray-400)' }}>
                  💼 <strong>{c.experience?.[0]?.role || 'Professional'}</strong>
                </span>
                <span style={{ fontSize: '11px', color: 'var(--gray-400)' }}>
                  📅 <strong>{c.availability?.status || 'Available'}</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}