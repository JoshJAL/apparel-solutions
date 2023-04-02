import { IoChevronForward } from 'react-icons/io5/index.js';

interface BreadCrumbProps {
  category: string;
}

export default function CategoryBreadCrumb({ category }: BreadCrumbProps) {
  return (
    <div className='flex pb-4 flex-wrap gap-2 md:gap-0'>
      <a
        className='flex items-center justify-center text-teal-600 hover:text-teal-600 dark:text-oldPaper dark:hover:text-oldPaper text-xl hover:underline underline-offset-2'
        href={'/posts'}
      >
        All Posts
        <span className='text-zinc-900 dark:text-zinc-300'>
          <IoChevronForward />
        </span>
      </a>
      <p className='bg-oldPaper dark:bg-teal-600 dark:bg-opacity-40 py-2 px-3 rounded-lg text-xl'>{category}</p>
    </div>
  );
}
