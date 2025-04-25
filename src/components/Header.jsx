import { useContext } from 'react';
import logoImg from '../assets/gamestack-logo.png';
import Button from './UI/Button';
import UserActionsContext from '../store/UserActionsContext';
export default function Header() {
  const { showAdd } = useContext(UserActionsContext);

  function handleQuickAdd() {
    showAdd();
  }

  return (
    <>
      <header className='flex items-center justify-between py-7'>
        <div className='flex items-center gap-4'>
          <img className='h-16' src={logoImg} alt='Logo image' />
          <h1 className='font-heading text-darkgreen text-[2rem] font-bold tracking-wider uppercase'>
            GameStack
          </h1>
        </div>
        <nav>
          <Button className='hidden xl:block' onClick={handleQuickAdd}>
            Quick Add
          </Button>

          <button
            onClick={handleQuickAdd}
            class='bg-darkgreen hover:bg-darkgreen-100 flex h-10 w-10 items-center justify-center rounded-full text-white xl:hidden'
          >
            +
          </button>
        </nav>
      </header>
    </>
  );
}
