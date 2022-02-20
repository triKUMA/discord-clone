import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserType {
  id: number;
  username: string;
  discriminator: number;
  displayName: string;
  profileURL: string;
}

const userSliceInitState: UserType | null = null;

const userSlice = createSlice({
  name: "user",
  initialState: userSliceInitState,
  reducers: {
    setUser: (state: UserType | null, action: PayloadAction<UserType>) => {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
