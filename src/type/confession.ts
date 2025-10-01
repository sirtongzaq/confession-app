import { Comment } from './comment';

export interface Confession {
  id: string;
  username: string;
  avatar: string;
  text: string;
  tags: string[];
  likes: number;
  dislikes: number;
  comments: number;
  commentList?: Comment[];
  imageUrl?: string[];
}
