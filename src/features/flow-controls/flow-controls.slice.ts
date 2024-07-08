import { createSlice } from "@reduxjs/toolkit";

export const flowControlsSlice = createSlice({
  name: "flowControls",
  initialState: {
    isAddingNode: false,
    isSavingFlow: false,
  },
  reducers: {
    startAddingNode: (state) => {
      state.isAddingNode = true;
    },
    endAddingNode: (state) => {
      state.isAddingNode = false;
    },
    startSavingFlow: (state) => {
      state.isSavingFlow = true;
    },
    endSavingFlow: (state) => {
      state.isSavingFlow = false;
    },
  },
});

export const {
  startAddingNode,
  endAddingNode,
  startSavingFlow,
  endSavingFlow,
} = flowControlsSlice.actions;

export const flowControlsReducer = flowControlsSlice.reducer;
