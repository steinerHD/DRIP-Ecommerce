import { Routes, Route } from 'react-router-dom';
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';
import Home     from '../pages/Home/Home';
import Login    from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const AppRoutes = () => (
  <Routes>
    <Route path="/"          element={<Home />} />
    <Route path="/login"     element={<Login />} />
    <Route path="/register"  element={<Register />} />
    <Route path="/*"         element={<UserRoutes />} />
    <Route path="/admin/*"   element={<AdminRoutes />} />
  </Routes>
);

export default AppRoutes;