import type { Post } from '../../../types/Post';

interface PostTileProps {
  post: Post;
}

export default function PostTile({ post }: PostTileProps) {
  return (
    <a href={`/posts/individualPost?postId=${post.id}`}>
      <div className='border-2 border-backgroundLightButtons rounded-xl p-3 dark:border-teal-600 hover:rotate-2 transition-all duration-200 ease-in-out flex flex-col items-centers'>
        <h1 className='font-semibold text-xl underline underline-offset-4 text-zinc-900 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-zinc-300'>
          {post.title}
        </h1>
        <p className='py-2 text-zinc-900 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-zinc-300'>
          {post.short_description}
        </p>
        <img src={`${import.meta.env.PUBLIC_SUPABASE_URL}/storage/v1/object/public/post-images/${post.thumbnail}`} />
      </div>
    </a>
  );
}
