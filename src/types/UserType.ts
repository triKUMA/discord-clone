export interface UserType {
  id: string;
  username: string;
  discriminator: number;
  displayName: string;
  iconSrc: string | null;
  status: "online" | "idle" | "do not disturb" | "invisible" | "offline";
  customStatusMessage: string | null;
}
