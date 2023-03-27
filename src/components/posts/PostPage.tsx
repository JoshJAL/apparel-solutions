import supabase from '../../../utils/supabase';
import { useState, useEffect } from 'react';
import type { Post } from '../../../types/Post';
import ReactPlayer from 'react-player';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import BreadCrumb from '../breadCrumb/BreadCrumb';

interface PostPageProps {
  id: string | undefined;
}

export default function PostPage({ id }: PostPageProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id);

      if (error) {
        alert(error.message);
      }

      if (data) setPost(data[0] as Post);
      setLoading(false);
    }

    fetchPost();
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center mt-40'>
        <LoadingSpinner />
      </div>
    );

  return (
    <div>
      <BreadCrumb category={post?.tag as string} title={post?.title as string} />
      <p className={`${post?.youtube_link ? '' : 'pb-5'} text-lg`}>&emsp;{post?.description}</p>
      {post?.youtube_link && (
        <div className='w-full flex my-5'>
          <ReactPlayer controls url={post?.youtube_link as string} />
        </div>
      )}
      <div className='grid md:grid-cols-2 gap-3 w-full items-center pb-4'>
        {post?.pictures?.map((picture, index) => {
          return (
            <img
              className='border dark:border-teal-600 border-backgroundLightButtons rounded-lg'
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
