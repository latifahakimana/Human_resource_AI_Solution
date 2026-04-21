'use client';
import { ReactNode, useEffect } from 'react';

// Badge
export function Badge({ variant, children }: { variant: string; children: ReactNode }) {
  const styles: Record<string, { bg: string; color: string }> = {
    active:    { bg: 'rgba(0,194,124,0.12)',   color: 'var(--success)' },
    draft:     { bg: 'rgba(138,151,176,0.15)', color: 'var(--gray-600)' },
    closed:    { bg: 'rgba(255,77,106,0.1)',   color: 'var(--danger)' },
    screening: { bg: 'rgba(0,212,255,0.12)',   color: '#007FAF' },
    blue:      { bg: 'rgba(17,81,200,0.1)',    color: 'var(--blue-600)' },
  };
  const s = styles[variant] || styles.blue;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 10px', borderRadius: '20px',
      fontSize: '11px', fontWeight: 700, letterSpacing: '0.3px',
      background: s.bg, color: s.color,
    }}>{children}</span>
  );
}

// Button
interface BtnProps {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger' | 'ai';
  size?: 'sm' | 'md';
  onClick?: (e?: React.MouseEvent) => void;
  children: ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
}
export function Btn({ variant = 'primary', size = 'md', onClick, children, style, disabled }: BtnProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '7px',
    padding: size === 'sm' ? '7px 14px' : '10px 20px',
    borderRadius: '10px',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: size === 'sm' ? '13px' : '14px',
    fontWeight: 600, cursor: 'pointer', border: 'none',
    transition: 'all 0.2s', whiteSpace: 'nowrap',
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: 'linear-gradient(135deg,var(--blue-500),var(--blue-400))', color: '#fff', boxShadow: '0 4px 14px rgba(17,81,200,0.35)' },
    outline: { background: 'transparent', color: 'var(--blue-500)', border: '1.5px solid var(--blue-200)' },
    ghost:   { background: 'var(--gray-100)', color: 'var(--gray-600)' },
    danger:  { background: 'rgba(255,77,106,0.1)', color: 'var(--danger)' },
    ai:      { background: 'linear-gradient(135deg,#0A2560,var(--blue-400))', color: '#fff', boxShadow: '0 4px 20px rgba(0,212,255,0.25)' },
  };
  return (
    <button
      onClick={onClick}
      disabled ={disabled}
      className={variant === 'ai' ? 'btn-ai-shimmer' : ''}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}

// Card
export function Card({ children, style, className }: { children: ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={className} style={{
      background: '#fff', borderRadius: '12px',
      border: '1px solid var(--gray-100)',
      boxShadow: '0 4px 24px rgba(3,15,43,0.13)',
      overflow: 'hidden', ...style,
    }}>
      {children}
    </div>
  );
}

// Modal
export function Modal({ id, open, onClose, title, children, footer }: {
  id: string; open: boolean; onClose: () => void;
  title: ReactNode; children: ReactNode; footer?: ReactNode;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(3,15,43,0.6)', backdropFilter: 'blur(4px)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        className="modal-anim"
        style={{
          background: '#fff', borderRadius: '16px',
          width: '720px', maxWidth: '95vw', maxHeight: '90vh',
          overflowY: 'auto', boxShadow: '0 24px 80px rgba(3,15,43,0.35)',
        }}
      >
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid var(--gray-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, background: '#fff', zIndex: 1,
          borderRadius: '16px 16px 0 0',
        }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', color: 'var(--blue-900)' }}>
            {title}
          </div>
          <button onClick={onClose} style={{ cursor: 'pointer', fontSize: '20px', color: 'var(--gray-400)', background: 'none', border: 'none', lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: '28px' }}>{children}</div>
        {footer && (
          <div style={{ padding: '20px 28px', borderTop: '1px solid var(--gray-100)', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ScoreBar
export function ScoreBar({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ flex: 1, height: '6px', background: 'var(--gray-100)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: '3px',
          background: 'linear-gradient(90deg, var(--blue-400), var(--accent))',
          width: `${value}%`,
        }} />
      </div>
      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue-600)', width: '32px', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

// Ring score
export function ScoreRing({ score, size = 52 }: { score: number; size?: number }) {
  const inner = Math.round(size * 0.73);
  return (
    <div style={{
      width: `${size}px`, height: `${size}px`, borderRadius: '50%',
      background: `conic-gradient(var(--blue-400) 0% ${score}%, var(--gray-100) ${score}% 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: `${inner}px`, height: `${inner}px`, borderRadius: '50%',
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Syne, sans-serif', fontWeight: 800,
        fontSize: size > 60 ? '18px' : '12px', color: 'var(--blue-600)',
      }}>{score}</div>
    </div>
  );
}

// Tag
export function Tag({ children, gap }: { children: ReactNode; gap?: boolean }) {
  return (
    <span style={{
      padding: '3px 10px', borderRadius: '20px',
      fontSize: '11px', fontWeight: 600,
      background: gap ? 'rgba(255,176,32,0.1)' : 'var(--blue-50)',
      color: gap ? '#A07000' : 'var(--blue-600)',
      border: `1px solid ${gap ? 'rgba(255,176,32,0.25)' : 'var(--blue-100)'}`,
    }}>{children}</span>
  );
}

// Section Header
export function SectionHeader({ title, sub, children }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--blue-900)' }}>
        {title}
        {sub && <small style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 400, color: 'var(--gray-400)', marginLeft: '8px' }}>{sub}</small>}
      </div>
      {children}
    </div>
  );
}

// Divider
export function Divider() {
  return <div style={{ height: '1px', background: 'var(--gray-100)', margin: '20px 0' }} />;
}
