import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const miniProfileSlice = createSlice({
  name: "miniProfile",
  initialState,

  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = miniProfileSlice.actions;
export default miniProfileSlice.reducer;
