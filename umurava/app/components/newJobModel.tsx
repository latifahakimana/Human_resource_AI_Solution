'use client';
import { useState } from 'react';
import { Modal, Btn } from './ui';

export function NewJobModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // 1. State for form fields
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: 'Full-time',
    description: '',
    experience: '3–5 years',
    salary: '',
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Skills Logic (Add tag on Enter)
  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  // 2. Submit Logic
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          skills: skills // Add the array of skills
        }),
      });

      if (response.ok) {
        alert("Job Posted Successfully!");
        onClose(); // Close modal on success
      }
    } catch (error) {
      console.error("Error posting job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      id="modal-new-job"
      open={open}
      onClose={onClose}
      title="Post New Job"
      footer={
        <>
          <Btn variant="ghost" onClick={onClose} disabled={loading}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </Btn>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Job Title</label>
          <input name="title" value={formData.title} onChange={handleChange} type="text" placeholder="e.g. Full-Stack Engineer" style={inputStyle} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Department</label>
          <input name="department" value={formData.department} onChange={handleChange} type="text" placeholder="e.g. Engineering" style={inputStyle} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Location</label>
          <input name="location" value={formData.location} onChange={handleChange} type="text" placeholder="e.g. Kigali / Remote" style={inputStyle} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Employment Type</label>
          <select name="employmentType" value={formData.employmentType} onChange={handleChange} style={inputStyle}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Job Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the role..." style={{ ...inputStyle, minHeight: '80px' }} />
        </div>

        {/* Skills Input */}
        <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Required Skills (Press Enter)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '8px 12px', border: '1.5px solid var(--gray-200)', borderRadius: '10px', background: '#fff' }}>
            {skills.map(s => (
              <span key={s} style={tagStyle}>
                {s} <span onClick={() => removeSkill(s)} style={{ cursor: 'pointer', marginLeft: '5px' }}>×</span>
              </span>
            ))}
            <input 
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              type="text" 
              placeholder="Add skill…" 
              style={{ border: 'none', outline: 'none', flex: 1 }} 
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Experience Required</label>
          <select name="experience" value={formData.experience} onChange={handleChange} style={inputStyle}>
            <option>0–1 years</option>
            <option>1–3 years</option>
            <option>3–5 years</option>
            <option>5+ years</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600 }}>Salary Range</label>
          <input name="salary" value={formData.salary} onChange={handleChange} type="text" placeholder="e.g. $2,000 / month" style={inputStyle} />
        </div>
      </div>
    </Modal>
  );
}

// Shared styles to keep the code clean
const inputStyle = {
  width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-200)', 
  borderRadius: '10px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', background: '#fff', outline: 'none'
};

const tagStyle = {
  display: 'flex', alignItems: 'center', padding: '3px 10px', background: 'var(--blue-50)', 
  border: '1px solid var(--blue-200)', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: 'var(--blue-600)'
};