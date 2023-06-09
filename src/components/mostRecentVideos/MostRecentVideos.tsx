import { useState, useEffect } from 'react';
import type { Video } from '../../../types/Video';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

export default function MostRecentVideos() {
  const baseURL =
    'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUC_-eGxVEysFCJcDarR2R6hQ';

  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      const data = await fetch(baseURL).then((res) => res.json());

      setVideos(data.items);
    }

    fetchVideos();
  }, []);

  return (
    <section className='py-4' id='videos'>
      <h2 className='text-xl font-semibold md:mb-2'>Latest YouTube Videos</h2>
      <div
        className={`${
          videos.length === 0 ? 'flex w-full items-center justify-center' : 'md:grid-cols-2 md:grid md:gap-3'
        }`}
      >
        {videos.length === 0 ? (
          <LoadingSpinner additionalClasses='mt-40' />
        ) : (
          videos.map((video, index) => (
            <a target={'_blank'} href={video.link} key={index}>
              <div className='border-2 border-backgroundLightButtons rounded-xl p-3 my-4 md:my-0 dark:border-teal-600 hover:rotate-2 transition-all duration-200 ease-in-out flex flex-col items-centers'>
                <p className='text-lg mb-2 text-zinc-900 dark:text-zinc-300 hover:text-zinc-900 hover:dark:text-zinc-300'>
                  {video.title}
                </p>
                <div>
                  <img src={video.thumbnail} alt={`${video.title} thumbnail`} />
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </section>
  );
}
