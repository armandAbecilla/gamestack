// components
import Button from './UI/Button';

// redux
import { useDispatch } from 'react-redux';
import { userActions } from '../store/userActions';

import logoImg from '../assets/gamestack-logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();

  function handleQuickAdd() {
    dispatch(userActions.showAdd());
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
        <nav>
          <Button className='hidden xl:block' onClick={handleQuickAdd}>
            Quick Add
          </Button>

          <button
            onClick={handleQuickAdd}
            className='bg-darkgreen hover:bg-darkgreen-100 flex h-10 w-10 items-center justify-center rounded-full text-white xl:hidden'
          >
            +
          </button>
        </nav>
      </header>
    </>
  );
}
