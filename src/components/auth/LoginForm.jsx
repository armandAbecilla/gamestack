import Input from '../UI/Input';
import Button from '../UI/Button';
import useInput from '../../hooks/useInput';
import { isEmailValid, isNotEmpty } from '../../util/validations';
import { Link, Form, useActionData } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function LoginForm() {
  const emailInput = useInput('', isEmailValid);
  const passwordInput = useInput('', isNotEmpty);
  const [errors, setErrors] = useState(null);
  const data = useActionData();

  useEffect(() => {
    if (data) {
      const actionData = JSON.parse(data);
      if (actionData?.status === 400) {
        setErrors(actionData.message);
      }
    }
  }, [data]);

  return (
    <div className='border-black-50 border p-8'>
      <h3 className='font-heading text-darkgreen mb-4 text-center text-2xl font-semibold uppercase'>
        Login at dagdagan na ang backlog!
      </h3>
      <Form method='POST' className='flex flex-col gap-4'>
        <div>
          <label htmlFor='email' className='text-stone-400'>
            Email
          </label>
          <Input
            value={emailInput.value}
            onChange={emailInput.onChange}
            onBlur={emailInput.onBlur}
            id='email'
            label='Email'
            type='email'
            required
          />
          {emailInput.hasErrors && (
            <span className='text-sm text-red-500/80'>
              Please enter a valid email address.
            </span>
          )}
        </div>

        <div>
          <label htmlFor='password' className='text-stone-400'>
            Password
          </label>
          <Input
            value={passwordInput.value}
            onChange={passwordInput.onChange}
            onBlur={passwordInput.onBlur}
            id='password'
            label='Password'
            type='password'
            required
          />
          {passwordInput.hasErrors && (
            <span className='text-sm text-red-500/80'>
              Please enter a password.
            </span>
          )}
        </div>

        <Link to='/signup' className='text-sm text-yellow-700'>
          Don't have an account?
        </Link>

        {errors && (
          <p className='text-center text-sm text-red-500/80'>{errors}</p>
        )}

        <div className='mx-auto'>
          <Button>Login</Button>
        </div>
      </Form>
    </div>
  );
}
