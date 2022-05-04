export interface PostType {
  id: string;
  text: string;
  date: Date;
  edited: boolean;
  reacts: { emote: string; count: number } | null;
  replyTo: null | PostType;
}

export interface PostGroupType {
  user: string;
  posts: PostType[];
}
