import { FiDownload } from 'react-icons/fi';
import Button from '../components/atoms/Button.jsx';
import SectionTitle from '../components/molecules/SectionTitle.jsx';
import { usePortfolio } from '../context/portfolioContext.jsx';

const Resume = () => {
  const data = usePortfolio();

  const downloadResume = () => {
    const url = data?.resume?.url;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

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
