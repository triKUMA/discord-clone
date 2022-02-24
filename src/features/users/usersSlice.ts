import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/UserType";

interface UsersSliceType {
  users: UserType[];
  activeUser: string | null;
}

const usersSliceInitState: UsersSliceType = {
  users: [
    {
      id: "1",
      username: "triKUMA",
      discriminator: 1,
      displayName: "tri/KUMA",
      iconSrc: null,
      status: "online",
      customStatusMessage: null,
    },
  ],
  activeUser: "1",
};

const usersSlice = createSlice({
  name: "users",
  initialState: usersSliceInitState,
  reducers: {
    addUser: (state: UsersSliceType, action: PayloadAction<UserType>) => {
      state.users = state.users.concat(action.payload);
    },
    setActiveUser: (state: UsersSliceType, action: PayloadAction<string>) => {
      state.activeUser = action.payload;
    },
  },
});

export const { addUser, setActiveUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
