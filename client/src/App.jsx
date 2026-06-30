import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/atoms/Loader.jsx';
import MainLayout from './layouts/MainLayout.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Resume = lazy(() => import('./pages/Resume.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
