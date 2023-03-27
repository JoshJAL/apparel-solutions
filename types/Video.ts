export type Video = {
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
