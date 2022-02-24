import { PostGroupType } from "./PostType";

export interface ChannelType {
  type: "text" | "voice";
  name: string;
  feed: PostGroupType[];
}

export interface ChannelCategoryType {
  name: string;
  channels: ChannelType[];
}
