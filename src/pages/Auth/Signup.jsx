import { projectConfig } from '../../config';
import axios from 'axios';
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

export async function action({ request, params }) {
  const data = await request.formData();

  const user = {
    email: data.get('email'),
    password: data.get('password'),
    firstName: data.get('first-name'),
    lastName: data.get('last-name'),
  };

  try {
    const res = await axios.post(`${projectConfig.API_URL}/auth/signup`, user);

    return res;
  } catch (e) {
    return {
      error: e.response.data.message,
    };
  }
}
