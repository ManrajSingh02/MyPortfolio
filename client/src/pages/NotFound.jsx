import Button from '../components/common/Button.jsx';

const NotFound = () => (
  <main className="page-top section empty-state">
    <h1>404</h1>
    <p>This page does not exist.</p>
    <Button to="/">Back Home</Button>
  </main>
);

export default NotFound;
