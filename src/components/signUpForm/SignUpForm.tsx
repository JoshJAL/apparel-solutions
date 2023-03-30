import { useState } from 'react';
import { IoEyeOff, IoEye } from 'react-icons/io5/index.js';
import supabase from '../../../utils/supabase';

export default function SignUpForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signingUp, setSigningUp] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSigningUp(true);

    let { data: whiteListEmails } = await supabase.from('whiteListEmails').select('*');

    for (let i = 0; i < whiteListEmails!.length; i++) {
      if (email.trim().toLowerCase() === whiteListEmails![i].email.toLowerCase()) {
        await supabase.auth.signUp({
          email,
          password
        });
        setSuccess(true);
        setSigningUp(false);
      }
    }
    setSigningUp(false);
  }

  if (success)
    return (
      <div className='flex items-center flex-col gap-10 pt-10'>
        <p className='text-3xl'>You were successfully signed up!</p>
        <p className='text-xl'>{'Check your email to verify your account'}</p>
      </div>
    );

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
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
          {signingUp ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
}
