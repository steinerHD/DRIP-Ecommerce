import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Admin from '../pages/Admin/Admin';

const AdminRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" />;

  return (
    <Routes>
      <Route path="/" element={<Admin />} />
    </Routes>
  );
};

export default AdminRoutes;