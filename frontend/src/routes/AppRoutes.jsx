import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Calender from '../pages/admin/Calender'
import Members from '../pages/admin/Members'
import Plans from '../pages/admin/Plans'
import Payments from '../pages/admin/Payments'
import Register from '../pages/auth/Register'
import CreateGym from '../pages/platform/CreateGym'
import Login from '../pages/auth/Login'
import BrowseGym from '../pages/platform/BrowseGym'
import GymHome from '../pages/gym/GymHome'
import Join from '../pages/gym/Join'
import MemberDashboard from '../pages/member/MemberDashboard'
import GymLayout from '../layouts/GymLayout'
import MemberLayout from '../layouts/MemberLayout'
import PlatformLayout from '../layouts/PlatformLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import HomePage from '../pages/HomePage';
const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<PlatformLayout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="gyms" element={<BrowseGym />} />
        <Route path="browse" element={<BrowseGym />} />
        <Route path="create-gym" element={<CreateGym />} />
        <Route path="login" element={<Login />} />
        <Route path="member/auth" element={<Login />} />
        <Route path="member/check" element={<MemberDashboard />} /> 
      </Route>


      <Route path="/admin/:gymSlug/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calendar" element={<Calender />} />
        <Route path="members" element={<Members />} />
        <Route path="plans" element={<Plans />} />
        <Route path="payments" element={<Payments />} />
      </Route>

      <Route path="/gym/:gymSlug/*" element={<GymLayout />}>
        <Route index element={<GymHome />} />
        <Route path="join/:planId" element={<Join />} />
      </Route>

      {/* MEMBER DASHBOARD */}
      <Route path="/member" element={<MemberLayout />}>
        <Route path="dashboard" element={<MemberDashboard />} />
        <Route index element={<MemberDashboard />} />
      </Route>
    </Routes>
  );
};


export default AppRoutes