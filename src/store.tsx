/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { flowControlsReducer } from "./features/flow-controls/flow-controls.slice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    flowControls: flowControlsReducer,
  },
  devTools: true, // enable Redux DevTools
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(logger),
});

const rootReducer = combineReducers({
  flowControls: flowControlsReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
