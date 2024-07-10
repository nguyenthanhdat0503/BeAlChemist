import { Tooltip } from "antd";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { NODE_TYPES } from "../../constants/node.types";
import {
  endAddingNode,
  startAddingNode,
} from "../../features/flow-controls/flow-controls.slice";
import { RootState } from "../../store";
import { getNodeBackground } from "../FlowWorkspace/FlowWorkspace2";

export default function NodeSidebar() {
  const addingNode = useSelector(
    (state: RootState) => state.flowControls.addingNode
  );
  const dispatch = useDispatch();

  const handleAddingNodeClick = (nodeType: string) => () => {
    if (addingNode.isAdding) {
      if (addingNode.nodeType === nodeType) {
        dispatch(endAddingNode());
      } else {
        dispatch(endAddingNode());
        dispatch(startAddingNode(nodeType));
      }
    } else {
      dispatch(startAddingNode(nodeType));
    }
  };

  const renderAddingNodeButton = (
    nodeType: string,
    label: string,
    tooltip: string
  ) => {
    return (
      <Tooltip title={tooltip} placement="right">
        <button
          className="w-full flex items-center justify-center"
          onClick={handleAddingNodeClick(nodeType)}
        >
          <span
            style={{
              backgroundColor: getNodeBackground(nodeType),
            }}
            className={classNames(
              "text-2xl cursor-pointer text-white block border-2 w-9 rounded-md",
              {
                "border-white":
                  addingNode.isAdding && addingNode.nodeType === nodeType,
                "border-transparent":
                  !addingNode.isAdding || addingNode.nodeType !== nodeType,
              }
            )}
          >
            {label}
          </span>
        </button>
      </Tooltip>
    );
  };

  return (
    <div className="h-full w-full bg-slate-500 pt-3">
      {renderAddingNodeButton(NODE_TYPES.GENERAL.TYPE, "G", "General")}
      <Divider />
      {renderAddingNodeButton(
        NODE_TYPES.ABSOLUTE_POINT.TYPE,
        "A",
        "Absolute Point"
      )}
      <Divider />
      {renderAddingNodeButton(
        NODE_TYPES.OCR_DETECTION.TYPE,
        "O",
        "OCR Detection"
      )}
      <Divider />
      {renderAddingNodeButton(
        NODE_TYPES.FEATURE_DETECTION.TYPE,
        "F",
        "Feature Detection"
      )}
      <Divider />
      {renderAddingNodeButton(
        NODE_TYPES.DYNAMIC_OBJECT_DETECTION.TYPE,
        "D",
        "Dynamic Object Detection"
      )}
      <Divider />
      {renderAddingNodeButton(NODE_TYPES.LOOP.TYPE, "L", "Loop")}
      <Divider />
      {renderAddingNodeButton(
        NODE_TYPES.COMPLETE_SEQUENCE.TYPE,
        "C",
        "Complete Sequence"
      )}
      <Divider />
      {renderAddingNodeButton(
        NODE_TYPES.STOP_PRODUCTION.TYPE,
        "S",
        "Stop Production"
      )}
      <Divider />
    </div>
  );
}

function Divider() {
  return <div className="h-[1px] w-4/5 mx-auto bg-white my-3"></div>;
}
