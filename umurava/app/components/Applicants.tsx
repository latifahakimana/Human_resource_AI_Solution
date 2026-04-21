// 'use client';

// import { useEffect, useState } from 'react';
// import { Badge, Btn, Card, ScoreBar, SectionHeader, Tag } from './ui';
// import { CandidateModal } from './candidateId';

// // Define the shape of your MongoDB data
// interface MongoApplicant {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   headline: string;
//   location?: string;
//   score?: number;
//   skills?: string[];
// }

// export default function Applicants({ onOpenCandidate }: { onOpenCandidate: () => void }) {
//   const [applicants, setApplicants] = useState<MongoApplicant[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   <CandidateModal 
//   open={isModalOpen} 
//   onClose={() => setIsModalOpen(false)} 
//   candidateId={selectedCandidateId} 
// />
//   // 1. Fetch data from your API
//   useEffect(() => {
//     async function fetchApplicants() {
//       try {
//         const response = await fetch('/api/applicants'); 
//         if (response.ok) {
//           const data = await response.json();
//           setApplicants(data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchApplicants();
//   }, []);

  

//   if (loading) return <div className="p-8 text-center">Loading applicants...</div>;

//   return (
//     <div>
//       <SectionHeader title="All Applicants" sub={`${applicants.length} total`}>
//         <div style={{ display: 'flex', gap: '8px' }}>
//           <Btn variant="outline" size="sm">📤 Export</Btn>
//           <Btn variant="primary" size="sm">＋ Add Applicant</Btn>
//         </div>
//       </SectionHeader>

//       {/* ... Filters and Search Input stay exactly the same ... */}
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
//                 {['Candidate', 'Role Applied', 'Location', 'Action'].map(h => (
//                   <th key={h} style={{ background: 'var(--gray-50)', padding: '13px 20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gray-400)', textAlign: 'left', borderBottom: '1px solid var(--gray-100)', whiteSpace: 'nowrap' }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {applicants.map((a) => {
//                 // Logic to handle name and initials
//                 const fullName = `${a.firstName} ${a.lastName}`;
//                 const initials = `${a.firstName[0]}${a.lastName[0]}`.toUpperCase();

//                 return (
//                   <tr key={a._id} style={{ borderBottom: '1px solid var(--gray-100)', transition: 'background 0.15s', cursor: 'pointer' }}
//                     onClick={onOpenCandidate}
//                     onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-50)')}
//                     onMouseLeave={e => (e.currentTarget.style.background = '')}>
//                     <td style={{ padding: '14px 20px' }}>
//                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                         <div style={{
//                           width: '36px', height: '36px', borderRadius: '10px',
//                           background: 'linear-gradient(135deg,var(--blue-600),var(--blue-400))',
//                           color: '#fff', fontWeight: 700, fontSize: '14px',
//                           display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         }}>{initials}</div>
//                         <div>
//                           <div style={{ fontWeight: 600 }}>{fullName}</div>
//                           <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>{a.email}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--gray-600)' }}>
//                       {a.headline || "General Applicant"}
//                     </td>
//                     <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--gray-600)' }}>
//                       {a.location || "Remote"}
//                     </td>
//                     {/* <td style={{ padding: '14px 20px', minWidth: '120px' }}>
//                       <ScoreBar value={a.score || 0} />
//                     </td> */}
//                     {/* <td style={{ padding: '14px 20px' }}>
//                       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
//                         {a.skills?.map(s => <Tag key={s}>{s}</Tag>) || <Tag>New</Tag>}
//                       </div>
//                     </td> */}
//                     <td style={{ padding: '14px 20px' }}>
//                       <Btn variant="outline" size="sm" onClick={() => {
//   setSelectedCandidateId(applicant._id);
//   setIsModalOpen(true);
// }} >View</Btn>
//                     </td>
//                   </tr>
//                 );
//               })}
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
import { CandidateModal } from './Modals'; 

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

export default function Applicants({ onOpenCandidate }: { onOpenCandidate: (id: string) => void }) {

  const [applicants, setApplicants] = useState<MongoApplicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Helper to open modal
  const handleOpenModal = (id: string) => {
    setSelectedCandidateId(id);
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-8 text-center">Loading applicants...</div>;

  return (
    <div>
      <SectionHeader title="All Applicants" sub={`${applicants.length} total`}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Btn variant="outline" size="sm">📤 Export</Btn>
          {/* <Btn variant="primary" size="sm">＋ Add Applicant</Btn> */}
        </div>
      </SectionHeader>

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
                {['Candidate', 'Role Applied', 'Location', 'Action'].map(h => (
                  <th key={h} style={{ background: 'var(--gray-50)', padding: '13px 20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gray-400)', textAlign: 'left', borderBottom: '1px solid var(--gray-100)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applicants.map((a) => {
                const fullName = `${a.firstName} ${a.lastName}`;
                const initials = `${a.firstName?.[0] || ''}${a.lastName?.[0] || ''}`.toUpperCase();

                return (
                  <tr key={a._id} style={{ borderBottom: '1px solid var(--gray-100)', transition: 'background 0.15s' }}
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
                    <td style={{ padding: '14px 20px' }}>
                      <Btn variant="outline" size="sm" onClick={() => handleOpenModal(a._id)}>View</Btn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* The Modal must be inside the return statement */}
      <CandidateModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        candidateId={selectedCandidateId} 
      />
    </div>
  );
}


// 'use client';
// import { useEffect, useState } from 'react';
// import { Btn, Card, SectionHeader } from './ui';
// import { CandidateModal } from './Modals';

// export default function Applicants({ onOpenCandidate }: { onOpenCandidate: (id: string) => void }) {
//   const [applicants, setApplicants] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//    const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetch('/api/applicants')
//       .then(res => res.json())
//       .then(data => { setApplicants(data); setLoading(false); });
//   }, []);

//   if (loading) return <div className="p-10 text-center">Loading List...</div>;

//   return (
//     <div>
//       <SectionHeader title="Applicants" sub={`${applicants.length} total`} />
//       <Card>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ textAlign: 'left', background: 'var(--gray-50)' }}>
//               <th style={{ padding: '12px' }}>Candidate</th>
//               <th style={{ padding: '12px' }}>Headline</th>
//               <th style={{ padding: '12px' }}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applicants.map((a) => (
//               <tr key={a._id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
//                 <td style={{ padding: '12px' }}>{a.firstName} {a.lastName}</td>
//                 <td style={{ padding: '12px' }}>{a.headline}</td>
//                 <td style={{ padding: '12px' }}>
//                   {/* IMPORTANT: This passes the ID up to the Dashboard */}
//                   <Btn variant="outline" size="sm" onClick={() => onOpenCandidate(a._id)}>
//                     View
//                   </Btn>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Card>
//       <CandidateModal 
//         open={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         candidateId={selectedCandidateId} 
//       />
//     </div>
//   );
// }