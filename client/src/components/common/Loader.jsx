const Loader = ({ fullScreen = false }) => (
  <div className={fullScreen ? 'loader-screen' : 'loader-inline'}>
    <span className="loader-ring" />
  </div>
);

export default Loader;
