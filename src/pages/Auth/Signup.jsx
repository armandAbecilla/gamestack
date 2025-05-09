import SignupForm from '../../components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className='flex h-screen items-start justify-center pt-20'>
      <div className='w-full max-w-[500px]'>
        <SignupForm />
      </div>
    </div>
  );
}
