import { ChannelCategoryType, ChannelType } from "./ChannelType";

export interface ServerType {
  id: string;
  name: string;
  iconSrc: string | null;
  channels: (ChannelType | ChannelCategoryType)[];
  members: string[];
}

export interface ServerPrototypeType {
  template:
    | null
    | "gaming"
    | "school"
    | "study"
    | "friends"
    | "creators"
    | "local community";
  targetAudience: null | "small" | "large";
  name: string;
  iconSrc: null | string;
  creator: string;
}
