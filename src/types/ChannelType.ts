import { PostGroupType } from "./PostType";

export interface ChannelType {
  type: "text" | "voice";
  name: string;
  feed: PostGroupType[];
  id: string;
}

export interface ChannelCategoryType {
  name: string;
  channels: ChannelType[];
}
