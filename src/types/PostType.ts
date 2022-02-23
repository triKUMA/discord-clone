import { UserIdentifierType } from "./UserType";

export interface PostType {
  id: number;
  text: string;
  date: Date;
  edited: boolean;
  reacts: string[];
  replyTo: null | PostType;
  group: PostGroupType;
}

export interface PostGroupType {
  user: UserIdentifierType;
  posts: PostType[];
}
