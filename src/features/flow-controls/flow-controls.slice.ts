import { createSlice } from "@reduxjs/toolkit";

export const flowControlsSlice = createSlice({
  name: "flowControls",
  initialState: {
    addingNode: {
      isAdding: false,
      nodeType: "IDLE",
    },
    isSavingFlow: false,
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
  },
});

export const {
  startAddingNode,
  endAddingNode,
  startSavingFlow,
  endSavingFlow,
} = flowControlsSlice.actions;

export const flowControlsReducer = flowControlsSlice.reducer;
