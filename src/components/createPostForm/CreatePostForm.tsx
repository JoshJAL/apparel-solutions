import supabase from '../../../utils/supabase';
import { useRef, useState, useEffect } from 'react';
import LoginForm from '../loginForm/LoginForm';

export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [containsYouTubeVideo, setContainsYouTubeVideo] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([] || null);
  const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([] || null);
  const fileInputRef = useRef(null);
  const [uploadedThumbnail, setUploadedThumbnail] = useState<File | null>(null);
  const thumbnailInputRef = useRef(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    async function getSession() {
      const session = await supabase.auth.getSession();
      const sessionData = session.data.session;
      setSession(sessionData);
    }

    getSession();
  }, [setSession]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    if (containsYouTubeVideo) {
      const { error: thumbnailError } = await supabase.storage
        .from('post-images')
        .upload(uploadedThumbnail!.name, uploadedThumbnail!, {
          cacheControl: '3600',
          upsert: false
        });

      if (thumbnailError && thumbnailError.message !== 'The resource already exists') {
        alert(thumbnailError.message + '\nThere was an error uploading your thumbnail.\nPlease try again.');
      }

      const { error } = await supabase.from('posts').insert([
        {
          title,
          short_description: shortDescription,
          description: content,
          tag,
          contains_youtube_video: containsYouTubeVideo,
          youtube_link: youtubeLink,
          pictures: uploadedFileNames,
          thumbnail: uploadedThumbnail!.name
        }
      ]);

      if (error) {
        alert(error.message + '\nPlease try again.');
      }
    } else {
      const { error } = await supabase.from('posts').insert([
        {
          title,
          short_description: shortDescription,
          description: content,
          tag,
          contains_youtube_video: containsYouTubeVideo,
          pictures: uploadedFileNames,
          thumbnail: uploadedThumbnail!.name
        }
      ]);

      if (error) {
        alert(error.message + '\nPlease try again.');
      }
    }

    if (uploadedFiles.length > 0) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        const { error } = await supabase.storage.from('post-images').upload(uploadedFiles[i].name, uploadedFiles[i], {
          cacheControl: '3600',
          upsert: false
        });

        if (error && error.message !== 'The resource already exists') {
          alert(error.message + '\nThere was an error uploading your image(s).\nPlease try again.');
        }
      }
    }

    setSubmitting(false);
    setTitle('');
    setShortDescription('');
    setContent('');
    setTag('');
    setContainsYouTubeVideo(false);
    setUploadedFiles([]);
    setUploadedFileNames([]);
    // @ts-ignore
    // This will clear the input text; typescript doesn't like it but it works
    fileInputRef.current.value = null;
    // @ts-ignore
    thumbnailInputRef.current.value = null;
  }

  function handleUploadFiles(chosenFiles: File[]) {
    const uploaded = [...uploadedFiles];
    const fileNames = [...uploadedFileNames];
    chosenFiles.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        fileNames.push(file.name);
      }
    });
    setUploadedFiles(uploaded);
    setUploadedFileNames(fileNames);
  }

  function handleFileEvent(e: React.ChangeEvent<HTMLInputElement>) {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  }

  if (!session) return <LoginForm setSession={setSession} />;

  return (
    <>
      <form className={'flex flex-col'} onSubmit={handleSubmit}>
        <label className='font-semibold py-2' htmlFor='title'>
          Title
        </label>
        <input
          required
          className='p-2 rounded-md text-zinc-900 outline-none border-2 border-backgroundLightButtons dark:border-teal-600 shadow-md'
          name='title'
          id='title'
          type={'text'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className='font-semibold py-2'>Thumbnail</label>
        <input
          required
          className='file:bg-backgroundLightButtons file:dark:text-zinc-300 file:dark:bg-teal-600 file:border-none file:px-2 file:py-2 file:rounded-lg file:hover file:hover:bg-backgroundLightButtonsHover file:dark:hover:bg-teal-700 file:transition-all file:duration-200 file:ease-in-out file:cursor-pointer'
          type='file'
          multiple
          onChange={(e) => {
            setUploadedThumbnail(e.target.files![0]);
          }}
          ref={thumbnailInputRef}
        />
        <label className='font-semibold py-2' htmlFor='tags'>
          Tags
        </label>
        <select
          required
          className='p-2 rounded-md text-zinc-900 outline-none border-2 border-backgroundLightButtons dark:border-teal-600 shadow-md'
          onChange={(e) => setTag(e.target.value)}
          name='tags'
          id='tags'
          value={tag}
        >
          <option value='' disabled>
            Select a tag
          </option>
          <option value='fabric'>Fabric</option>
          <option value='garment'>Garment</option>
          <option value='youtubeVideo'>YouTube Video</option>
        </select>
        <label className='font-semibold py-2' htmlFor='shortDescription'>
          Short Description
        </label>
        <input
          required
          className='p-2 rounded-md text-zinc-900 outline-none border-2 border-backgroundLightButtons dark:border-teal-600 shadow-md'
          name='shortDescription'
          id='shortDescription'
          type={'text'}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />
        <label className='font-semibold py-2' htmlFor='content'>
          Content
        </label>
        <textarea
          required
          className='p-2 rounded-md text-zinc-900 outline-none border-2 border-backgroundLightButtons dark:border-teal-600 shadow-md'
          rows={6}
          name='content'
          id='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label className='flex gap-2 font-semibold py-2'>
          <input
            className='accent-backgroundLightButtons dark:accent-teal-600'
            checked={containsYouTubeVideo}
            type={'checkbox'}
            onChange={() => setContainsYouTubeVideo(!containsYouTubeVideo)}
          />
          <span>Does this post include a YouTube video?</span>
        </label>
        {containsYouTubeVideo && (
          <>
            <label className='font-semibold py-2' htmlFor='youtubeVideo'>
              YouTube Link
            </label>
            <input
              className='p-2 rounded-md text-zinc-900 outline-none border-2 border-backgroundLightButtons dark:border-teal-600 shadow-md'
              name='shortDescription'
              id='shortDescription'
              type={'text'}
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
          </>
        )}
        <label className='font-semibold py-2'>Any Pictures?</label>
        <input
          className='file:bg-backgroundLightButtons file:dark:text-zinc-300 file:dark:bg-teal-600 file:border-none file:px-2 file:py-2 file:rounded-lg file:hover file:hover:bg-backgroundLightButtonsHover file:dark:hover:bg-teal-700 file:transition-all file:duration-200 file:ease-in-out file:cursor-pointer'
          type='file'
          multiple
          onChange={(e) => {
            handleFileEvent(e);
          }}
          ref={fileInputRef}
        />
        <div className='flex justify-start my-5'>
          <button
            className='bg-backgroundLightButtons dark:bg-teal-600 px-5 py-3 text-lg rounded-lg shadow-md hover:bg-backgroundLightButtonsHover dark:hover:bg-teal-700 transition-all duration-200 ease-in-out'
            type='submit'
          >
            {submitting ? 'Creating Post...' : 'Create Post'}
          </button>
        </div>
      </form>
    </>
  );
}
