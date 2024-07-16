import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setIsAuthenticated: (
      state,
      data: PayloadAction<{ isAuthenticated: boolean }>
    ) => {
      state.isAuthenticated = data.payload.isAuthenticated;
    },
  },
});

export const { setIsAuthenticated } = authSlice.actions;
export const authReducer = authSlice.reducer;
