import { Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';

const AppRoutes = () => (
  <Routes>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    <Route path='/home' element={<div>Home Page</div>} />
  </Routes>
);

export default AppRoutes;
