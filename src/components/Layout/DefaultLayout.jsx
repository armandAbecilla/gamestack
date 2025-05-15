import { Outlet } from 'react-router-dom';
import Header from '../Header';

export default function DefaultLayout() {
  return (
    <div className='container mx-auto px-5'>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
