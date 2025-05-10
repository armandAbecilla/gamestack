import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const auth = useSelector((state) => state.auth);

  return auth.user ? <Outlet /> : <Navigate to='/login' replace />;
}
