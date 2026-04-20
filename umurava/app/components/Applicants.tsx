// 'use client';
// import { applicants } from '@/lib/data';
// import { Badge, Btn, Card, ScoreBar, SectionHeader, Tag } from './ui';

// export default function Applicants({ onOpenCandidate }: { onOpenCandidate: () => void }) {
//   return (
//     <div>
//       <SectionHeader title="All Applicants" sub="142 total">
//         <div style={{ display: 'flex', gap: '8px' }}>
//           <Btn variant="outline" size="sm">📤 Export</Btn>
//           <Btn variant="primary" size="sm">＋ Add Applicant</Btn>
//         </div>
//       </SectionHeader>

//       <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
//         {['All Jobs', 'All Status', 'All Sources'].map(f => (
//           <select key={f} style={{
//             padding: '8px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px',
//             fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--gray-600)',
//             background: '#fff', outline: 'none', cursor: 'pointer',
//           }}>
//             <option>{f}</option>
//           </select>
//         ))}
//         <input type="text" placeholder="Search candidates…" style={{
//           padding: '8px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px',
//           fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--gray-800)',
//           background: '#fff', outline: 'none', flex: 1, minWidth: '180px',
//         }} />
//       </div>

//       <Card>
//         <div style={{ overflowX: 'auto' }}>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr>
//                 {['Candidate', 'Role Applied', 'Location', 'AI Score', 'Skills', 'Action'].map(h => (
//                   <th key={h} style={{ background: 'var(--gray-50)', padding: '13px 20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gray-400)', textAlign: 'left', borderBottom: '1px solid var(--gray-100)', whiteSpace: 'nowrap' }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {applicants.map((a) => (
//                 <tr key={a.id} style={{ borderBottom: '1px solid var(--gray-100)', transition: 'background 0.15s', cursor: 'pointer' }}
//                   onClick={onOpenCandidate}
//                   onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-50)')}
//                   onMouseLeave={e => (e.currentTarget.style.background = '')}>
//                   <td style={{ padding: '14px 20px' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                       <div style={{
//                         width: '36px', height: '36px', borderRadius: '10px',
//                         background: 'linear-gradient(135deg,var(--blue-600),var(--blue-400))',
//                         color: '#fff', fontWeight: 700, fontSize: '14px',
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                       }}>{a.initials}</div>
//                       <div>
//                         <div style={{ fontWeight: 600 }}>{a.name}</div>
//                         <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>{a.location}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--gray-600)' }}>{a.role}</td>
//                   <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--gray-600)' }}>{a.location}</td>
//                   <td style={{ padding: '14px 20px', minWidth: '120px' }}>
//                     <ScoreBar value={a.score} />
//                   </td>
//                   <td style={{ padding: '14px 20px' }}>
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
//                       {a.skills.map(s => <Tag key={s}>{s}</Tag>)}
//                     </div>
//                   </td>
//                   {/* <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--gray-400)' }}>{a.source}</td>
//                   <td style={{ padding: '14px 20px' }}>
//                     <Badge variant={a.status}>{a.status.charAt(0).toUpperCase() + a.status.slice(1)}</Badge>
//                   </td> */}
//                   <td style={{ padding: '14px 20px' }}>
//                     <Btn variant="outline" size="sm" onClick={(e) => { e?.stopPropagation(); onOpenCandidate(); }}>View</Btn>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { Badge, Btn, Card, ScoreBar, SectionHeader, Tag } from './ui';

// Define the shape of your MongoDB data
interface MongoApplicant {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  location?: string;
  score?: number;
  skills?: string[];
}

export default function Applicants({ onOpenCandidate }: { onOpenCandidate: () => void }) {
  const [applicants, setApplicants] = useState<MongoApplicant[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from your API
  useEffect(() => {
    async function fetchApplicants() {
      try {
        const response = await fetch('/api/applicants'); 
        if (response.ok) {
          const data = await response.json();
          setApplicants(data);
        }
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApplicants();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading applicants...</div>;

  return (
    <div>
      <SectionHeader title="All Applicants" sub={`${applicants.length} total`}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Btn variant="outline" size="sm">📤 Export</Btn>
          <Btn variant="primary" size="sm">＋ Add Applicant</Btn>
        </div>
      </SectionHeader>

      {/* ... Filters and Search Input stay exactly the same ... */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
        {['All Jobs', 'All Status', 'All Sources'].map(f => (
          <select key={f} style={{
            padding: '8px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px',
            fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--gray-600)',
            background: '#fff', outline: 'none', cursor: 'pointer',
          }}>
            <option>{f}</option>
          </select>
        ))}
        <input type="text" placeholder="Search candidates…" style={{
          padding: '8px 14px', border: '1.5px solid var(--gray-200)', borderRadius: '10px',
          fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--gray-800)',
          background: '#fff', outline: 'none', flex: 1, minWidth: '180px',
        }} />
      </div>

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Candidate', 'Role Applied', 'Location', 'AI Score', 'Skills', 'Action'].map(h => (
                  <th key={h} style={{ background: 'var(--gray-50)', padding: '13px 20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gray-400)', textAlign: 'left', borderBottom: '1px solid var(--gray-100)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applicants.map((a) => {
                // Logic to handle name and initials
                const fullName = `${a.firstName} ${a.lastName}`;
                const initials = `${a.firstName[0]}${a.lastName[0]}`.toUpperCase();

                return (
                  <tr key={a._id} style={{ borderBottom: '1px solid var(--gray-100)', transition: 'background 0.15s', cursor: 'pointer' }}
                    onClick={onOpenCandidate}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-50)')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '10px',
                          background: 'linear-gradient(135deg,var(--blue-600),var(--blue-400))',
                          color: '#fff', fontWeight: 700, fontSize: '14px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>{initials}</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{fullName}</div>
                          <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>{a.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--gray-600)' }}>
                      {a.headline || "General Applicant"}
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--gray-600)' }}>
                      {a.location || "Remote"}
                    </td>
                    {/* <td style={{ padding: '14px 20px', minWidth: '120px' }}>
                      <ScoreBar value={a.score || 0} />
                    </td> */}
                    {/* <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {a.skills?.map(s => <Tag key={s}>{s}</Tag>) || <Tag>New</Tag>}
                      </div>
                    </td> */}
                    <td style={{ padding: '14px 20px' }}>
                      <Btn variant="outline" size="sm" onClick={(e) => { e?.stopPropagation(); onOpenCandidate(); }}>View</Btn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}