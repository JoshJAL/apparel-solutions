export type Post = {
  id: number;
  created_at: string;
  title: string;
  short_description: string;
  description: string;
  tag: string;
  contains_youtube_video: boolean;
  youtube_link: string | null;
  pictures: string[] | null;
  thumbnail: string;
};
