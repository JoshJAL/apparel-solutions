import { IoChevronForward } from 'react-icons/io5';

interface BreadCrumbProps {
  category: string;
  title: string;
}

function capitalizeFirstLetter(string: string) {
  if (string === 'youtubeVideo') return string.replace('youtubeVideo', 'YouTube Video');
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function BreadCrumb({ category, title }: BreadCrumbProps) {
  return (
    <div className='flex pb-4 flex-wrap gap-2 md:gap-0'>
      <a
        className='flex items-center justify-center text-teal-600 dark:text-oldPaper text-xl hover:underline underline-offset-2'
        href={'/posts'}
      >
        Posts
        <span className='text-zinc-900 dark:text-zinc-300'>
          <IoChevronForward />
        </span>
      </a>
      <a className='flex items-center justify-center text-xl hover:underline underline-offset-2' href={'/categories'}>
        {capitalizeFirstLetter(category)}
        <IoChevronForward />
      </a>
      <p className='bg-oldPaper dark:bg-teal-600 dark:bg-opacity-40 py-2 px-3 rounded-lg text-xl'>{title}</p>
    </div>
  );
}
