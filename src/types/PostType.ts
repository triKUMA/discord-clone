export interface PostType {
  id: string;
  text: string;
  date: Date;
  edited: boolean;
  reacts: string[];
  replyTo: null | PostType;
  group: PostGroupType;
}

export interface PostGroupType {
  user: string;
  posts: PostType[];
}
