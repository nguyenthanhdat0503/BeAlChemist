import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const flowControlsSlice = createSlice({
  name: "flowControls",
  initialState: {
    addingNode: {
      isAdding: false,
      nodeType: "IDLE",
    },
    isSavingFlow: false,
    isSavingErrors: false,
    screenSize: {
      width: 0,
      height: 0,
    },
  },
  reducers: {
    startAddingNode: (state, data) => {
      state.addingNode.isAdding = true;
      state.addingNode.nodeType = data.payload;
    },
    endAddingNode: (state) => {
      state.addingNode.isAdding = false;
      state.addingNode.nodeType = "IDLE";
    },
    startSavingFlow: (state) => {
      state.isSavingFlow = true;
    },
    endSavingFlow: (state) => {
      state.isSavingFlow = false;
    },
    startSavingErrors: (state) => {
      state.isSavingErrors = true;
    },
    endSavingErrors: (state) => {
      state.isSavingErrors = false;
    },
    setScreenSize: (
      state,
      data: PayloadAction<{ width: number; height: number }>
    ) => {
      state.screenSize = {
        width: data.payload.width,
        height: data.payload.height,
      };
    },
  },
});

export const {
  startAddingNode,
  endAddingNode,
  startSavingFlow,
  endSavingFlow,
  startSavingErrors,
  endSavingErrors,
  setScreenSize,
} = flowControlsSlice.actions;

export const flowControlsReducer = flowControlsSlice.reducer;
