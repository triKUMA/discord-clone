import { ChannelCategoryType, ChannelType } from "./ChannelType";
import { UserIdentifierType } from "./UserType";

export interface ServerType {
  id: number;
  name: string;
  iconSrc: string | null;
  channels: (ChannelType | ChannelCategoryType)[];
  members: UserIdentifierType[];
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
  creator: UserIdentifierType;
}
