import LoginForm from '../../components/auth/LoginForm';
export default function LoginPage() {
  return (
    <div className='flex h-screen items-start justify-center pt-20'>
      <div className='w-full max-w-[500px]'>
        <LoginForm />
      </div>
    </div>
  );
}
