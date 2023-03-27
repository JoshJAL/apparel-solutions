import supabase from '../../../utils/supabase';
import { useEffect, useState } from 'react';
import type { Post } from '../../../types/Post';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import PostTile from './PostTile';

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('posts').select('*').order('id', { ascending: false });

      if (error) {
        alert(error.message);
      }

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
  return (
    <div className='grid md:grid-cols-2 gap-4 py-5'>
      {posts.map((post) => (
        <PostTile key={post.id} post={post} />
      ))}
    </div>
  );
}
