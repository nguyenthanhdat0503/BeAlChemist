import React from "react";
import { PlusSquareOutlined, SaveOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  endAddingNode,
  startAddingNode,
  startSavingFlow,
} from "../../features/flow-controls/flow-controls.slice";

export default function ControlsSidebar() {
  const isAdding = useSelector(
    (state: RootState) => state.flowControls.isAddingNode
  );
  const dispatch = useDispatch();
  return (
    <div className="h-full w-full bg-slate-500">
      <button
        className="w-full flex items-center justify-center"
        onClick={() => {
          if (isAdding) {
            dispatch(endAddingNode());
          } else {
            dispatch(startAddingNode());
          }
        }}
      >
        <PlusSquareOutlined
          className={classNames("w-full h-10 text-2xl  cursor-pointer block", {
            "text-green-300": isAdding,
            "text-white": !isAdding,
          })}
        />
      </button>

      <button
        className="w-full flex items-center justify-center"
        onClick={() => {
          dispatch(startSavingFlow());
        }}
      >
        <SaveOutlined className="w-full h-10 text-2xl cursor-pointer block text-white hover:text-green-300" />
      </button>
    </div>
  );
}
