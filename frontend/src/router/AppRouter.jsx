import { createBrowserRouter, Navigate } from 'react-router-dom';
import GuestLayout from '../layouts/GuestLayout';
import AdminLayout from '../layouts/AdminLayout';

import Welcome from '../pages/guest/Welcome';
import Identify from '../pages/guest/Identify';
import Home from '../pages/guest/Home';
import Bingo from '../pages/guest/Bingo';
import Gallery from '../pages/guest/Gallery';
import UploadPhoto from '../pages/guest/UploadPhoto';
import Ranking from '../pages/guest/Ranking';
import Profile from '../pages/guest/Profile';

import Dashboard from '../pages/admin/Dashboard';
import PhotoModeration from '../pages/admin/PhotoModeration';
import BingoConfig from '../pages/admin/BingoConfig';
import UsersLeaderboard from '../pages/admin/UsersLeaderboard';

const router = createBrowserRouter([
  { path: '/', element: <Welcome /> },
  { path: '/identificacion', element: <Identify /> },
  {
    element: <GuestLayout />,
    children: [
      { path: '/inicio', element: <Home /> },
      { path: '/bingo', element: <Bingo /> },
      { path: '/fotos', element: <Gallery /> },
      { path: '/fotos/subir', element: <UploadPhoto /> },
      { path: '/ranking', element: <Ranking /> },
      { path: '/perfil', element: <Profile /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: '/admin', element: <Dashboard /> },
      { path: '/admin/photos', element: <PhotoModeration /> },
      { path: '/admin/bingo', element: <BingoConfig /> },
      { path: '/admin/users', element: <UsersLeaderboard /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;
