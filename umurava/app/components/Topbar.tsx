'use client';

const breadcrumbMap: Record<string, string> = {
  dashboard: 'Dashboard / Overview',
  jobs: 'Jobs / All Postings',
  applicants: 'Applicants / All',
  screening: 'AI Screening / Setup',
  shortlist: 'Shortlist / Results',
  // pipeline: 'Analytics / Pipeline',
  // analytics: 'Analytics / Insights'
};

export default function Topbar({ page }: { page: string }) {
  const parts = (breadcrumbMap[page] || page).split('/');

  return (
    <div style={{
      height: '64px',
      background: '#fff',
      borderBottom: '1px solid var(--gray-100)',
      display: 'flex', alignItems: 'center',
      padding: '0 28px', gap: '16px',
      flexShrink: 0,
    }}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--blue-900)' }}>
        {parts[0]}
        {parts[1] && <span style={{ color: 'var(--blue-400)' }}> /{parts[1]}</span>}
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          background: 'var(--gray-50)', border: '1.5px solid var(--gray-200)',
          borderRadius: '10px', padding: '0 14px', gap: '8px', height: '38px',
        }}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search jobs, candidates…"
            style={{
              border: 'none', background: 'transparent',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
              color: 'var(--gray-800)', outline: 'none', width: '200px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
