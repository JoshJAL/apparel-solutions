import supabase from '../../../utils/supabase';
import { useState, useEffect } from 'react';
import type { Post } from '../../../types/Post';
import ReactPlayer from 'react-player';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import BreadCrumb from '../breadCrumb/BreadCrumb';

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [invalidPost, setInvalidPost] = useState(false);
  const [noPost, setNoPost] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('postId') as string;
    if (!id) setInvalidPost(true);
    async function fetchPost() {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id);

      if (error && !error.message.includes('invalid input syntax for type bigint')) {
        alert(error.message);
      }

      if (data) setPost(data[0] as Post);
      if (data?.length === 0) setNoPost(true);
      setLoading(false);
    }

    fetchPost();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center mt-40'>
        <LoadingSpinner />
      </div>
    );
  }

  if (invalidPost) {
    window.location.href = '/posts';
  }

  if (noPost) {
    return (
      <div className='flex flex-col justify-center items-center mt-32'>
        <h1 className='text-4xl'>Oops!</h1>
        <h2 className='text-2xl py-4'>Looks like something went wrong trying to find that post</h2>
        <p className='text-xl'>Please go back to my posts and try again! </p>
        <a
          href='/posts'
          className=' mt-4 text-xl text-teal-600 dark:text-oldPaper hover:underline underline-offset-2 cursor-pointer'
        >
          Take me back!
        </a>
      </div>
    );
  }

  return (
    <div>
      <BreadCrumb category={post?.tag as string} title={post?.title as string} />
      <p className={`${post?.youtube_link ? '' : 'pb-5'} text-lg`}>&emsp;{post?.description}</p>
      {post?.youtube_link && (
        <div className='w-full flex my-5 items-center justify-center'>
          <ReactPlayer controls url={post?.youtube_link as string} />
        </div>
      )}
      <div className='grid md:grid-cols-2 gap-3 w-full items-center pb-4'>
        {post?.pictures?.map((picture, index) => {
          return (
            <img
              className='border dark:border-teal-600 border-backgroundLightButtons rounded-lg mx-auto'
              key={index}
              src={`${import.meta.env.PUBLIC_SUPABASE_URL}/storage/v1/object/public/post-images/${picture}`}
              alt={`${post.title} picture ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
