import { FiDownload } from 'react-icons/fi';
import Button from '../components/common/Button.jsx';
import Loader from '../components/common/Loader.jsx';
import SectionTitle from '../components/common/SectionTitle.jsx';
import { usePortfolio } from '../hooks/usePortfolio.js';
import { trackResumeDownload } from '../services/portfolioService.js';

const Resume = () => {
  const { data, loading } = usePortfolio();

  const downloadResume = async () => {
    const response = await trackResumeDownload().catch(() => null);
    const url = response?.data?.url || data?.resume?.url;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) return <Loader fullScreen />;

  return (
    <main className="page-top section">
      <SectionTitle eyebrow="Resume" title="Latest Resume Preview">The CMS upload always controls the download link.</SectionTitle>
      <div className="resume-shell">
        {data.resume?.url ? (
          <iframe title="Resume preview" src={data.resume.url} />
        ) : (
          <div className="empty-state">
            <h3>No resume uploaded yet</h3>
            <p>Upload a PDF from the admin CMS to enable the public preview and download button.</p>
          </div>
        )}
        <Button icon={FiDownload} onClick={downloadResume} disabled={!data.resume?.url}>Download Resume</Button>
      </div>
    </main>
  );
};

export default Resume;
