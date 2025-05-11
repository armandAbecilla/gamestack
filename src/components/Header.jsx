// components
import Button from './UI/Button';

// redux
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

import logoImg from '../assets/gamestack-logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.clear();
    dispatch(authActions.clearUser());
  }

  return (
    <>
      <header className='flex items-center justify-between py-7'>
        <div className='flex items-center gap-4'>
          <Link to='/'>
            <img className='h-16' src={logoImg} alt='Logo image' />
          </Link>

          <Link
            to='/'
            className='font-heading text-darkgreen text-[2rem] font-bold tracking-wider uppercase'
          >
            GameStack
          </Link>
        </div>
        <nav className='flex gap-4'>
          <Button textOnly onClick={handleLogout}>
            Sign out
          </Button>
        </nav>
      </header>
    </>
  );
}
