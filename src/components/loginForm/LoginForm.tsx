import { useState } from 'react';
import { IoEyeOff, IoEye } from 'react-icons/io5/index.js';
import supabase from '../../../utils/supabase';

interface Props {
  setSession: (session: any) => void;
}
export default function LoginForm({ setSession }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    let emailToSend = email.trim().toLowerCase();
    let passwordToSend = password.trim();
    e.preventDefault();
    setLoggingIn(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailToSend,
      password: passwordToSend
    });
    console.log(error);
    if (data) {
      setSession(data);
    }
    setLoggingIn(false);
  }

  return (
    <form className={'flex flex-col'} onSubmit={handleSubmit}>
      <label className='font-semibold py-2' htmlFor='email'>
        Email
      </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='p-2 rounded-md text-zinc-900 outline-none border-2 border-backgroundLightButtons dark:border-teal-600 shadow-md'
        type='email'
        name='email'
        id='email'
      />
      <label className='font-semibold py-2' htmlFor='password'>
        Password
      </label>
      <div className='relative grid items-center'>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='p-2 rounded-md text-zinc-900 outline-none border-2 border-backgroundLightButtons dark:border-teal-600 shadow-md'
          type={showPassword ? 'text' : 'password'}
          name='password'
          id='password'
        />
        <IoEyeOff
          onClick={() => setShowPassword(!showPassword)}
          className={`${showPassword ? 'hidden' : 'block'} absolute z-10 right-3 cursor-pointer text-zinc-900`}
        />
        <IoEye
          onClick={() => setShowPassword(!showPassword)}
          className={`${!showPassword ? 'hidden' : 'block'} absolute z-10 right-3 cursor-pointer text-zinc-900`}
        />
      </div>
      <div className='flex justify-start my-5'>
        <button
          className='bg-backgroundLightButtons dark:bg-teal-600 px-5 py-3 text-lg rounded-lg shadow-md hover:bg-backgroundLightButtonsHover dark:hover:bg-teal-700 transition-all duration-200 ease-in-out'
          type='submit'
        >
          {loggingIn ? 'Logging in...' : 'Log In'}
        </button>
      </div>
      <div className='flex w-full items-center justify-center'>
        <p>
          {"Don't have an account? Sign up "}{' '}
          <a className='text-teal-600 hover:underline underline-offset-2' href='/signUp'>
            here
          </a>
          !
        </p>
      </div>
    </form>
  );
}
