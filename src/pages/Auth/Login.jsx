import { projectConfig } from '../../config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import LoginForm from '../../components/auth/LoginForm';
import { useActionData, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function LoginPage() {
  const data = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const loginData = JSON.parse(data);

      if (loginData.status === 200) {
        const { data: responseData } = loginData;

        localStorage.clear();
        const user = {
          id: responseData.id,
          email: responseData.email,
          firstName: responseData.first_name,
          lastName: responseData.last_name,
        };
        const token = responseData.token;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        dispatch(
          authActions.setUser({
            user: user,
            token: token,
          }),
        );

        navigate('/');
      }
    }
  }, [data, dispatch, navigate]);

  return (
    <div className='flex h-screen items-start justify-center pt-20'>
      <div className='w-full max-w-[500px]'>
        <LoginForm />
      </div>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');

  try {
    const response = await axios.post(`${projectConfig.API_URL}/auth/login`, {
      email,
      password,
    });

    return new Response(
      JSON.stringify({
        data: response.data,
        status: 200,
      }),
      { status: 200 },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: e.response.data.message,
        status: e.status,
      }),
      { status: e.status },
    );
  }
}
