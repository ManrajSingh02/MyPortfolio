import { Outlet } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar.jsx';

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default MainLayout;
