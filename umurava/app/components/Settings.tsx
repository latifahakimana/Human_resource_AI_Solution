'use client';
import { Card, SectionHeader, Divider } from './ui';

export default function Settings() {
  const sections = [
    {
      title: 'AI Configuration',
      items: [
        { label: 'AI Provider', sub: 'Select the AI model used for screening', input: 'select', options: ['Google Gemini Pro', 'GPT-4o', 'Claude 3.5 Sonnet'] },
        { label: 'API Key', sub: 'Your Gemini API key for AI screening', input: 'password', placeholder: 'sk-••••••••••••••••' },
        { label: 'Max Candidates per Batch', sub: 'Number of candidates processed per AI call', input: 'number', placeholder: '50' },
      ],
    },
    {
      title: 'Screening Defaults',
      items: [
        { label: 'Default Shortlist Size', sub: 'How many candidates to shortlist by default', input: 'select', options: ['Top 10', 'Top 20', 'Top 30', 'Top 50'] },
        { label: 'Minimum Score Threshold', sub: 'Automatically reject candidates below this score', input: 'number', placeholder: '40' },
        { label: 'Auto-Screen New Applicants', sub: 'Run AI screening automatically when applicants are added', input: 'toggle', enabled: true },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { label: 'Email Notifications', sub: 'Receive email when screening is complete', input: 'toggle', enabled: true },
        { label: 'Slack Integration', sub: 'Post shortlist results to Slack channel', input: 'toggle', enabled: false },
        { label: 'Notification Email', sub: 'Email address for notifications', input: 'email', placeholder: 'recruiter@company.com' },
      ],
    },
    {
      title: 'Team & Access',
      items: [
        { label: 'Company Name', sub: 'Your organization name', input: 'text', placeholder: 'Umurava Technologies' },
        { label: 'Default Language', sub: 'Language for AI-generated content', input: 'select', options: ['English', 'French', 'Kinyarwanda', 'Swahili'] },
      ],
    },
  ];

  return (
    <div>
      <SectionHeader title="Settings" sub="Configuration" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {sections.map((section) => (
          <Card key={section.title} style={{ padding: '24px' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--blue-900)', marginBottom: '20px' }}>
              {section.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {section.items.map((item) => (
                <div key={item.label}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gray-600)', display: 'block', marginBottom: '4px' }}>{item.label}</label>
                  <div style={{ fontSize: '11px', color: 'var(--gray-400)', marginBottom: '8px' }}>{item.sub}</div>
                  {item.input === 'toggle' ? (
                    <div style={{
                      width: '44px', height: '24px', borderRadius: '12px',
                      background: item.enabled ? 'var(--blue-500)' : 'var(--gray-200)',
                      cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
                    }}>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
                        position: 'absolute', top: '3px',
                        left: item.enabled ? '23px' : '3px',
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                      }} />
                    </div>
                  ) : item.input === 'select' ? (
                    <select style={{
                      width: '100%', padding: '10px 14px',
                      border: '1.5px solid var(--gray-200)', borderRadius: '10px',
                      fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                      color: 'var(--gray-800)', background: '#fff', outline: 'none',
                    }}>
                      {item.options?.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={item.input}
                      placeholder={item.placeholder}
                      style={{
                        width: '100%', padding: '10px 14px',
                        border: '1.5px solid var(--gray-200)', borderRadius: '10px',
                        fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                        color: 'var(--gray-800)', background: '#fff', outline: 'none',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button style={{ padding: '10px 20px', borderRadius: '10px', background: 'var(--gray-100)', color: 'var(--gray-600)', border: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          Reset to Defaults
        </button>
        <button style={{ padding: '10px 20px', borderRadius: '10px', background: 'linear-gradient(135deg,var(--blue-500),var(--blue-400))', color: '#fff', border: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(17,81,200,0.35)' }}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
