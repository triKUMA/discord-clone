export interface UserIdentifierType {
  id: number;
  discriminator: number;
}

export interface UserType {
  identity: UserIdentifierType;
  username: string;
  displayName: string;
  iconSrc: string | null;
  status: "online" | "idle" | "do not disturb" | "invisible" | "offline";
  customStatusMessage: string | null;
}
