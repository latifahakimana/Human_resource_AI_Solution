export type PageId = 'dashboard' | 'jobs' | 'applicants' | 'screening' | 'shortlist' | 'pipeline' | 'analytics' | 'settings';

export type BadgeVariant = 'active' | 'draft' | 'closed' | 'screening' | 'blue';

export interface Job {
  id: string;
  role: string;
  location: string;
  applicants: number;
  status: BadgeVariant;
  department: string;
  posted: string;
}

export interface Applicant {
  id: string;
  name: string;
  initials: string;
  role: string;
  location: string;
  score: number;
  skills: string[];
  status: BadgeVariant;
  source: string;
}

export interface Candidate {
  id: string;
  rank: number;
  name: string;
  initials: string;
  role: string;
  location: string;
  score: number;
  skills: string[];
  gaps: string[];
  reasoning: string;
  experience: string;
  education: string;
  availability: string;
  skillScores: { name: string; pct: number }[];
}

export const jobs: Job[] = [
  { id: '1', role: 'Full-Stack Engineer', location: 'Kigali · Remote', applicants: 87, status: 'active', department: 'Engineering', posted: '2 days ago' },
  { id: '2', role: 'UX/UI Designer', location: 'Remote', applicants: 54, status: 'screening', department: 'Design', posted: '5 days ago' },
  { id: '3', role: 'Data Analyst', location: 'Nairobi', applicants: 43, status: 'active', department: 'Analytics', posted: '1 week ago' },
  { id: '4', role: 'Product Manager', location: 'Lagos', applicants: 29, status: 'draft', department: 'Product', posted: '3 days ago' },
  { id: '5', role: 'DevOps Engineer', location: 'Remote', applicants: 61, status: 'active', department: 'Engineering', posted: '4 days ago' },
  { id: '6', role: 'Mobile Developer', location: 'Kampala', applicants: 38, status: 'closed', department: 'Engineering', posted: '2 weeks ago' },
];

export const applicants: Applicant[] = [
  { id: '1', name: 'Alice Mutoni', initials: 'A', role: 'Senior Software Engineer', location: 'Kigali', score: 91, skills: ['TypeScript', 'React', 'Node.js'], status: 'active', source: 'Umurava Platform' },
  { id: '2', name: 'Brian Ochieng', initials: 'B', role: 'Full-Stack Developer', location: 'Nairobi', score: 85, skills: ['Vue.js', 'Python', 'PostgreSQL'], status: 'active', source: 'LinkedIn' },
  { id: '3', name: 'Chloe Nzeyimana', initials: 'C', role: 'Frontend Engineer', location: 'Kigali', score: 78, skills: ['React', 'CSS', 'GraphQL'], status: 'screening', source: 'Umurava Platform' },
  { id: '4', name: 'David Kiprotich', initials: 'D', role: 'Backend Developer', location: 'Nairobi', score: 72, skills: ['Node.js', 'MongoDB', 'AWS'], status: 'active', source: 'Job Board' },
  { id: '5', name: 'Eve Uwimana', initials: 'E', role: 'Software Engineer', location: 'Kigali', score: 68, skills: ['Java', 'Spring Boot'], status: 'draft', source: 'Referral' },
  { id: '6', name: 'Frank Otieno', initials: 'F', role: 'Full-Stack Developer', location: 'Kampala', score: 65, skills: ['Angular', 'Express'], status: 'active', source: 'Umurava Platform' },
];

export const candidates: Candidate[] = [
  {
    id: '1', rank: 1, name: 'Alice Mutoni', initials: 'A', role: 'Senior Software Engineer', location: 'Kigali',
    score: 91, skills: ['TypeScript', 'React', 'Node.js', 'MongoDB'], gaps: ['Limited AWS', 'No DevOps'],
    reasoning: 'Alice is the top-ranked candidate. Her 4 years of TypeScript experience directly matches the primary technical requirement. Strong React + Node.js portfolio demonstrates production-grade systems.',
    experience: '4 years Full-Stack', education: 'BSc CS – Univ. of Rwanda', availability: 'Immediately',
    skillScores: [{ name: 'TypeScript', pct: 95 }, { name: 'React', pct: 90 }, { name: 'Node.js', pct: 85 }, { name: 'MongoDB', pct: 82 }, { name: 'AWS', pct: 35 }],
  },
  {
    id: '2', rank: 2, name: 'Brian Ochieng', initials: 'B', role: 'Full-Stack Developer', location: 'Nairobi',
    score: 85, skills: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'], gaps: ['No React', 'Limited TS'],
    reasoning: 'Brian brings strong backend skills with Python and excellent database knowledge. His DevOps experience with Docker is a valuable differentiator, though frontend stack differs slightly.',
    experience: '5 years Backend', education: 'BSc Software Eng – UoN', availability: '2 weeks notice',
    skillScores: [{ name: 'Python', pct: 92 }, { name: 'PostgreSQL', pct: 88 }, { name: 'Docker', pct: 80 }, { name: 'Vue.js', pct: 75 }, { name: 'TypeScript', pct: 40 }],
  },
  {
    id: '3', rank: 3, name: 'Chloe Nzeyimana', initials: 'C', role: 'Frontend Engineer', location: 'Kigali',
    score: 78, skills: ['React', 'CSS', 'GraphQL', 'Figma'], gaps: ['Weak backend', 'No Node.js'],
    reasoning: 'Chloe excels in frontend with exceptional UI/UX sense. GraphQL expertise is a strong plus. Backend skills need development but her React proficiency is outstanding.',
    experience: '3 years Frontend', education: 'BSc IT – INES Ruhengeri', availability: '1 month notice',
    skillScores: [{ name: 'React', pct: 93 }, { name: 'CSS/Tailwind', pct: 90 }, { name: 'GraphQL', pct: 78 }, { name: 'Node.js', pct: 30 }, { name: 'MongoDB', pct: 20 }],
  },
  {
    id: '4', rank: 4, name: 'David Kiprotich', initials: 'D', role: 'Backend Developer', location: 'Nairobi',
    score: 72, skills: ['Node.js', 'MongoDB', 'AWS', 'Redis'], gaps: ['Weak frontend', 'No TypeScript'],
    reasoning: 'David has solid backend foundations and AWS experience. His cloud skills fill a gap in the team. TypeScript adoption would be required but his learning curve appears manageable.',
    experience: '3 years Backend', education: 'Diploma CS – Strathmore', availability: 'Immediately',
    skillScores: [{ name: 'Node.js', pct: 80 }, { name: 'AWS', pct: 78 }, { name: 'MongoDB', pct: 72 }, { name: 'React', pct: 35 }, { name: 'TypeScript', pct: 25 }],
  },
];

export const pipelineData = {
  applied: [
    { name: 'Alice M.', role: 'Full-Stack Eng', score: 91 },
    { name: 'Brian O.', role: 'Full-Stack Dev', score: 85 },
    { name: 'Chloe N.', role: 'Frontend Eng', score: 78 },
  ],
  screened: [
    { name: 'David K.', role: 'Backend Dev', score: 72 },
    { name: 'Eve U.', role: 'Software Eng', score: 68 },
  ],
  shortlisted: [
    { name: 'Frank O.', role: 'Full-Stack Dev', score: 65 },
    { name: 'Grace M.', role: 'Engineer', score: 80 },
  ],
  rejected: [
    { name: 'Henry B.', role: 'Developer', score: 42 },
  ],
};

export const analyticsData = {
  weekly: [
    { label: 'Mon', val: 12, h: 40 },
    { label: 'Tue', val: 28, h: 93 },
    { label: 'Wed', val: 19, h: 63 },
    { label: 'Thu', val: 35, h: 116 },
    { label: 'Fri', val: 22, h: 73 },
    { label: 'Sat', val: 9, h: 30 },
    { label: 'Sun', val: 5, h: 16 },
  ],
};
