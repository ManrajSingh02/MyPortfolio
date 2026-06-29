import { FiDownload } from 'react-icons/fi';
import Button from '../components/common/Button.jsx';
import Loader from '../components/common/Loader.jsx';
import SectionTitle from '../components/common/SectionTitle.jsx';
import { usePortfolio } from '../hooks/usePortfolio.js';

const Resume = () => {
  const { data, loading } = usePortfolio();

  const downloadResume = () => {
    const url = data?.resume?.url;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) return <Loader fullScreen />;

  return (
    <main className="page-top section">
      <SectionTitle eyebrow="Resume" title="Latest Resume Preview">View or download the developer's resume.</SectionTitle>
      <div className="resume-shell">
        {data.resume?.url ? (
          <iframe title="Resume preview" src={data.resume.url} />
        ) : (
          <div className="empty-state">
            <h3>No resume uploaded yet</h3>
            <p>The resume file is not available right now.</p>
          </div>
        )}
        <Button icon={FiDownload} onClick={downloadResume} disabled={!data.resume?.url}>Download Resume</Button>
      </div>
    </main>
  );
};

export default Resume;
