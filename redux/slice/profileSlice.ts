import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  avatar_id: number;
  border_id: number;
  first_name: string;
  last_name: string;
  job: string;
  total_coin: number;
  active_borders: number[];
  active_avatar: number[];
}

const initialState: ProfileState = {
  avatar_id: 1,
  border_id: 1,
  first_name: "تاج محمد",
  last_name: "سالمی",
  job: "محصل",
  total_coin: 200000,
  active_borders: [1],
  active_avatar: [1],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile: (state, action) => {
      Object.assign(state, action.payload);
    },
    addBorderId: (state, action: PayloadAction<number>) => {
      state.border_id = action.payload;
    },
    addAvatarId: (state, action: PayloadAction<number>) => {
      state.avatar_id = action.payload;
    },
    addTotalCoin: (state, action) => {
      state.total_coin += action.payload;
    },
    subtractTotalCoin: (state, action) => {
      state.total_coin -= action.payload;
    },
    addActiveBorder: (state, action) => {
      state.active_borders.push(action.payload);
    },
    addActiveAvatar: (state, action) => {
      state.active_avatar.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProfile,
  addBorderId,
  addAvatarId,
  addTotalCoin,
  subtractTotalCoin,
  addActiveBorder,
  addActiveAvatar,
} = profileSlice.actions;

export default profileSlice.reducer;
