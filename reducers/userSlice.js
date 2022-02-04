import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: true,
  error: "",
};

export const userSlice = createSlice({
  name: "User",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setError, setLoading } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
