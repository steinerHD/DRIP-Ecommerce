import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Shop from '../pages/Shop/Shop';
import Cart from '../pages/Cart/Cart';

const UserRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default UserRoutes;