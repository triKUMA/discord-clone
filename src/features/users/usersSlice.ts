import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserIdentifierType, UserType } from "../../types/UserType";

interface UsersSliceType {
  users: UserType[];
  activeUser: UserIdentifierType | null;
}

const usersSliceInitState: UsersSliceType = {
  users: [
    {
      identity: { id: 1, discriminator: 1 },
      username: "triKUMA",
      displayName: "tri/KUMA",
      iconSrc: null,
      status: "online",
      customStatusMessage: null,
    },
  ],
  activeUser: { id: 1, discriminator: 1 },
};

const usersSlice = createSlice({
  name: "users",
  initialState: usersSliceInitState,
  reducers: {
    addUser: (state: UsersSliceType, action: PayloadAction<UserType>) => {
      state.users = state.users.concat(action.payload);
    },
    setActiveUser: (
      state: UsersSliceType,
      action: PayloadAction<UserIdentifierType>
    ) => {
      state.activeUser = action.payload;
    },
  },
});

export const { addUser, setActiveUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
