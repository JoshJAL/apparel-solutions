import { useState, useEffect } from 'react';
import type { Post } from '../../../types/Post';
import supabase from '../../../utils/supabase';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import PostTile from './PostTile';

interface FilteredPostsProps {
  filter: string;
}

export default function FilteredPosts({ filter }: FilteredPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from('posts').select('*').eq('tag', filter).order('id', { ascending: false });

      if (data) setPosts(data as Post[]);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center mt-40'>
        <LoadingSpinner />
      </div>
    );
  }

  if (posts.length < 1) {
    return (
      <div className='flex justify-center items-center mt-40'>
        <p className='text-2xl'>No posts... yet!</p>
      </div>
    );
  }

  return (
    <div className='grid md:grid-cols-2 gap-4 py-5'>
      {posts.map((post) => (
        <PostTile key={post.id} post={post} />
      ))}
    </div>
  );
}
