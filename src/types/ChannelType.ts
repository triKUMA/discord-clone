import { PostGroupType } from "./PostType";

export interface ChannelType {
  type: "text" | "voice";
  name: string;
  feed: PostGroupType[];
  parent: null | ChannelCategoryType;
}

export interface ChannelCategoryType {
  channels: ChannelType[];
}
