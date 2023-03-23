import { useState } from 'react';
import { MICHAEL_EMAIL } from '../../consts';

export default function SendEmail() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    window.open(`mailto:${MICHAEL_EMAIL}?subject=Message from ${name}&body=${message}`);

    setName('');
    setMessage('');
  }

  return (
    <div id='contact'>
      <h2 className='text-xl font-semibold'>Send Me an Email</h2>
      <form className='flex flex-col my-3' onSubmit={(e) => handleSubmit(e)}>
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
          What is your message?
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
