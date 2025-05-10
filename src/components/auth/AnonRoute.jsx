import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function AnonRoute() {
  const auth = useSelector((state) => state.auth);

  return auth.user ? <Navigate to='/' replace /> : <Outlet />;
}
