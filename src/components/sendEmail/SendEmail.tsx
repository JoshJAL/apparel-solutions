import { useState } from 'react';
import { CHAU_EMAIL, MICHAEL_EMAIL, MICHAEL_PHONE } from '../../consts';

export default function SendEmail() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    window.open(`mailto:${email}?subject=Message from ${name}&body=${message}`);

    setName('');
    setMessage('');
  }

  return (
    <div id='contact'>
      <h2 className='text-xl font-semibold'>Contact Us</h2>
      <form className='flex flex-col my-3' onSubmit={(e) => handleSubmit(e)}>
        <label className='font-semibold py-2'>Who would you like to send an email to?</label>
        <select
          className='p-2 rounded-md text-zinc-900 outline-none border-2 border-backgroundLightButtons dark:border-teal-600 shadow-md'
          onChange={(e) => setEmail(e.target.value)}
          defaultValue=''
          required
        >
          <option value='' disabled>
            Please select and option
          </option>
          <option value={MICHAEL_EMAIL}>Michael Levine</option>
          <option value={CHAU_EMAIL}>Chau Truong</option>
          <option value={`${CHAU_EMAIL}; ${MICHAEL_EMAIL}`}>Both</option>
        </select>
        <label className='font-semibold py-2' htmlFor='input-name'>
          What is your name?
        </label>
        <input
          required
          className='p-2 rounded-md text-zinc-900 outline-none border-2 border-backgroundLightButtons dark:border-teal-600 shadow-md'
          value={name}
          type={'text'}
          name='input-name'
          id='input-name'
          onChange={(e) => setName(e.target.value)}
        />
        <label className='font-semibold py-2' htmlFor='input-message'>
          What is your message
        </label>
        <textarea
          name='input-message'
          id='input-message'
          required
          className='p-2 rounded-md text-zinc-900 outline-none border-2 border-backgroundLightButtons dark:border-teal-600 shadow-md'
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className='flex justify-center mt-3'>
          <button
            className='bg-backgroundLightButtons dark:bg-teal-600 px-5 py-3 text-lg rounded-lg shadow-md hover:bg-backgroundLightButtonsHover dark:hover:bg-teal-700 transition-all duration-200 ease-in-out'
            type='submit'
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
}
