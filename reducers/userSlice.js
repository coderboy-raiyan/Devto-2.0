import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: true,
};

export const userSlice = createSlice({
  name: "User",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
