import { useState, useEffect } from 'react';

type Video = {
  author: string;
  categories: string[];
  content: string;
  description: string;
  enclosure: {
    link: string;
    type: string;
    thumbnail: string;
  };
  guid: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  title: string;
};

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
      <div>
        <h2 className='text-xl font-semibold'>Latest YouTube Videos</h2>
        {videos.map((video, index) => (
          <a target={'_blank'} href={video.link} key={index}>
            <div className='border-2 border-backgroundLightButtons rounded-xl p-3 my-4 dark:border-teal-600 hover:rotate-2 transition-all duration-200 ease-in-out flex flex-col items-center'>
              <p className='text-lg mb-2'>{video.title}</p>
              <div>
                <img src={video.thumbnail} alt={`${video.title} thumbnail`} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
