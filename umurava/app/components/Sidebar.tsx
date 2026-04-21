'use client';
import { PageId } from '@/lib/data';

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}



const navItems: { id: PageId; icon: string; label: string; badge?: number; section?: string }[] = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard', section: 'Main' },
  { id: 'jobs', icon: '💼', label: 'Job Postings' },
  { id: 'applicants', icon: '👥', label: 'Applicants'},
  { id: 'screening', icon: '🤖', label: 'AI Screening' },
  { id: 'shortlist', icon: '⭐', label: 'Shortlists' },
  // { id: 'pipeline', icon: '🔀', label: 'Pipeline', section: 'Analytics' },
  // { id: 'analytics', icon: '📈', label: 'Analytics' },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  let lastSection = '';

  return (
    <aside style={{
      width: '260px',
      background: 'var(--blue-900)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* decorative gradients */}
      <div style={{
        position: 'absolute', top: '-80px', left: '-80px',
        width: '260px', height: '260px',
        background: 'radial-gradient(circle, rgba(17,81,200,0.35) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', right: '-60px',
        width: '200px', height: '200px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{
        padding: '28px 24px 20px',
        display: 'flex', alignItems: 'center', gap: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, var(--blue-400), var(--accent))',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800, fontSize: '16px', color: '#fff',
        }}>U</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px', color: '#fff', lineHeight: 1 }}>Umurava</span>
          <span style={{ fontSize: '10px', color: 'var(--blue-300)', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '2px' }}>TalentAI</span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 1 }}>
        {navItems.map((item) => {
          const showSection = item.section && item.section !== lastSection;
          if (item.section) lastSection = item.section;
          const isActive = activePage === item.id;

          return (
            <div key={item.id}>
              {showSection && (
                <div style={{
                  padding: '20px 24px 8px',
                  fontSize: '10px', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '1.8px',
                  color: 'var(--blue-400)',
                }}>
                  {item.section}
                </div>
              )}
              <div
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '11px 20px', margin: '2px 12px',
                  borderRadius: '10px', cursor: 'pointer',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  fontSize: '14px', fontWeight: 500,
                  transition: 'all 0.2s',
                  background: isActive ? 'linear-gradient(135deg, rgba(17,81,200,0.7), rgba(43,107,232,0.4))' : 'transparent',
                  boxShadow: isActive ? '0 2px 12px rgba(17,81,200,0.35)' : 'none',
                  position: 'relative',
                }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLDivElement).style.color = '#fff'; }}
                onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = 'rgba(255,255,255,0.55)'; } }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute', left: '-12px', top: '50%', transform: 'translateY(-50%)',
                    width: '3px', height: '22px',
                    background: 'var(--accent)', borderRadius: '0 3px 3px 0',
                  }} />
                )}
                <span style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                  {item.icon}
                </span>
                {item.label}
                {item.badge && (
                  <span style={{
                    marginLeft: 'auto',
                    background: 'var(--blue-500)', color: '#fff',
                    fontSize: '10px', fontWeight: 700,
                    padding: '2px 7px', borderRadius: '20px',
                  }}>{item.badge}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* User card */}
      <div style={{
        marginTop: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '16px',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 12px', borderRadius: '10px',
          cursor: 'pointer', transition: 'background 0.2s',
        }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'linear-gradient(135deg,var(--blue-400),var(--accent))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '14px',
          }}>RK</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Recruiter</div>
            <div style={{ fontSize: '11px', color: 'var(--blue-300)' }}>Senior Recruiter</div>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>⋯</span>
        </div>
      </div>
    </aside>
  );
}
