'use client';
import { useState } from 'react';
import { PageId } from '@/lib/data';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Dashboard from '../components/Dashboard';
import Jobs from '../components/Jobs';
import Applicants from '../components/Applicants';
import Screening from '../components/Screening';
import Shortlist from '../components/Shortlist';
import Pipeline from '../components/Pipeline';
import Analytics from '../components/Analytics';
import Settings from '../components/Settings';
import { NewJobModal, UploadModal, CandidateModal } from '../components/Modals';


export default function Page() {
  const [page, setPage] = useState<PageId>('dashboard');
  const [newJobOpen, setNewJobOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [candidateOpen, setCandidateOpen] = useState(false);

 const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

const handleOpenShortlistCandidate = (id: string) => {
  setSelectedCandidateId(id);
  setIsModalOpen(true);
};
  const navigate = (p: string) => setPage(p as PageId);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activePage={page} onNavigate={navigate} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar page={page} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          {page === 'dashboard' && <Dashboard onNavigate={navigate} onOpenNewJob={() => setNewJobOpen(true)} onOpenUpload={() => setUploadOpen(true)} />}
          {page === 'jobs' && <Jobs onOpenNewJob={() => setNewJobOpen(true)} onNavigate={navigate} />}
          {page === 'applicants' && <Applicants onOpenCandidate={() => setCandidateOpen(true)} />}
          {page === 'screening' && <Screening onNavigate={navigate} onOpenUpload={() => setUploadOpen(true)} />}
            
            {page === 'shortlist' && <Shortlist onOpenCandidate={handleOpenShortlistCandidate} />}
          {/* {page === 'shortlist' && <Shortlist onOpenCandidate={() => setCandidateOpen(true)} />} */}
          {page === 'pipeline' && <Pipeline />}
          {page === 'analytics' && <Analytics />}
        </div>
      </div>
      <NewJobModal open={newJobOpen} onClose={() => setNewJobOpen(false)} />
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
      <CandidateModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        candidateId={selectedId} 
      />

      <CandidateModal 
  open={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  candidateId={selectedCandidateId} 
/>
    </div>
  );

}
