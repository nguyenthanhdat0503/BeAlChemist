/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  EdgeChange,
  MarkerType,
  MiniMap,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import { NODE_TYPES } from "../../constants/node.types";
import {
  endAddingNode,
  endSavingFlow,
} from "../../features/flow-controls/flow-controls.slice";
import { RootState } from "../../store";
import GeneralNode from "../Nodes/GeneralNode/GeneralNode";
import OCRDetectionNode from "../Nodes/OCRDetectionNode/OCRDetectionNode";
import "./index.css";
import AbsolutePointNode from "../Nodes/AbsolutePointNode/AbsolutePointNode";
import FeatureDetectionNode from "../Nodes/FeatureDetectionNode/FeatureDetectionNode";
import DynamicObjectDetectionNode from "../Nodes/DynamicObjectDetectionNode/DynamicObjectDetectionNode";
import LoopNode from "../Nodes/LoopNode/LoopNode";
import CompleteSequenceNode from "../Nodes/CompleteSequenceNode/CompleteSequenceNode";
import StopProductionNode from "../Nodes/StopProductionNode/StopProductionNode";

const initialNodes: Node[] = JSON.parse(localStorage.getItem("nodes") || "[]");
const initialEdges: Edge[] = JSON.parse(localStorage.getItem("edges") || "[]");

const nodeTypes = {
  GENERAL: GeneralNode,
  OCR_DETECTION: OCRDetectionNode,
  FEATURE_DETECTION: FeatureDetectionNode,
  DYNAMIC_OBJECT_DETECTION: DynamicObjectDetectionNode,
  LOOP: LoopNode,
  ABSOLUTE_POINT: AbsolutePointNode,
  COMPLETE_SEQUENCE: CompleteSequenceNode,
  STOP_PRODUCTION: StopProductionNode,
};

const FlowWorkspace2 = () => {
  const { addingNode, isSavingFlow } = useSelector(
    (state: RootState) => state.flowControls
  );

  const dispatch = useDispatch();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [newNodePosition, setNewNodePosition] = useState({ x: 0, y: 0 });
  const { screenToFlowPosition } = useReactFlow();
  const newNodeRef = useRef(null);
  const flowWrapper = useRef(null);
  const [isMouseInFlow, setIsMouseInFlow] = useState(false);
  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            // animated: true,
            style: {
              strokeWidth: 3,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 16,
              height: 16,
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  useEffect(() => {
    if (isSavingFlow) {
      localStorage.setItem("nodes", JSON.stringify(nodes));
      localStorage.setItem("edges", JSON.stringify(edges));
      dispatch(endSavingFlow());
    }
  }, [isSavingFlow, dispatch]);

  const handleMouseEnter = () => {
    setIsMouseInFlow(true);
  };

  const handleMouseLeave = () => {
    setIsMouseInFlow(false);
  };

  const handleMouseMove = (event: any) => {
    if (addingNode.isAdding) {
      const { clientX, clientY } = event;
      const nodeWidth = newNodeRef.current
        ? (newNodeRef.current as any).offsetWidth
        : 0;
      const nodeHeight = newNodeRef.current
        ? (newNodeRef.current as any).offsetHeight
        : 0;
      const newX = clientX - nodeWidth / 2;
      const newY = clientY - nodeHeight / 2;
      setNewNodePosition({
        x: newX,
        y: newY,
      });
    }
  };

  const handleMouseDown = (event: any) => {
    if (addingNode.isAdding && addingNode.nodeType !== "IDLE") {
      const { clientX, clientY } = event;
      const nodeWidth = newNodeRef.current
        ? (newNodeRef.current as any).offsetWidth
        : 0;
      const nodeHeight = newNodeRef.current
        ? (newNodeRef.current as any).offsetHeight
        : 0;
      const newX = clientX - nodeWidth / 2;
      const newY = clientY - nodeHeight / 2;
      const newNode = {
        id: uuidv4(),
        type: addingNode.nodeType,
        data: { label: `${addingNode.nodeType}`, imgURL: "" },
        position: screenToFlowPosition({ x: newX, y: newY }),
      };
      setNodes((els) => [...els, newNode]);
      dispatch(endAddingNode());
    }
  };

  useEffect(() => {
    if (!flowWrapper.current) return;
    if (addingNode.isAdding) {
      (flowWrapper.current as any).addEventListener(
        "mousemove",
        handleMouseMove
      );
      (flowWrapper.current as any).addEventListener(
        "mousedown",
        handleMouseDown
      );
      if (flowWrapper.current) {
        (flowWrapper.current as any).addEventListener(
          "mouseenter",
          handleMouseEnter
        );
        (flowWrapper.current as any).addEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }
    } else {
      (flowWrapper.current as any)?.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      (flowWrapper.current as any)?.removeEventListener(
        "mousedown",
        handleMouseDown
      );
      (flowWrapper.current as any)?.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
      (flowWrapper.current as any)?.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    }

    return () => {
      (flowWrapper.current as any)?.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      (flowWrapper.current as any)?.removeEventListener(
        "mousedown",
        handleMouseDown
      );
      (flowWrapper.current as any)?.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      (flowWrapper.current as any)?.removeEventListener(
        "mousedown",
        handleMouseDown
      );
    };
  }, [addingNode]);

  const handleContextMenu = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    const flowElement = document.querySelector(".react-flow");

    if (flowElement) {
      flowElement.addEventListener("contextmenu", handleContextMenu);
    }

    return () => {
      if (flowElement) {
        flowElement.removeEventListener("contextmenu", handleContextMenu);
      }
    };
  }, []);

  return (
    <div className="w-full h-full border" ref={flowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={(edges: EdgeChange[]) => {
          console.log({ edges });
          onEdgesChange(edges);
        }}
        onMouseDown={handleMouseDown}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={(event: React.MouseEvent, node: Node) => {
          console.log("onNodeClick", event, node);
        }}
      >
        <Controls />
        <MiniMap
          zoomable
          pannable
          nodeColor={(node: Node) => {
            const DEFAULT_BACKGROUND = "#fff";
            return node.type
              ? getNodeBackground(node.type)
              : DEFAULT_BACKGROUND;
          }}
        />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      {addingNode.isAdding && (
        <div
          ref={newNodeRef}
          style={{
            position: "absolute",
            top: newNodePosition.y,
            left: newNodePosition.x,
            backgroundColor: "transparent",
            width: "150px",
            height: "40px",
            borderRadius: "6px",
            border: "1px solid #000",
            pointerEvents: "none",
          }}
          className={classNames({
            "flex items-center justify-center": isMouseInFlow,
            hidden: !isMouseInFlow,
          })}
        >
          <p className="text-[14px] text-black">New Node</p>
        </div>
      )}
    </div>
  );
};

const FlowWorkspaceWrapper2 = () => (
  <ReactFlowProvider>
    <FlowWorkspace2 />
  </ReactFlowProvider>
);

export { FlowWorkspaceWrapper2 };

export const getNodeBackground = (nodeType: string): string => {
  const nodeTypeEntry = Object.values(NODE_TYPES).find(
    (node) => node.TYPE === nodeType
  );
  const DEFAULT_BACKGROUND = "#fff";
  return nodeTypeEntry ? nodeTypeEntry.BACKGROUND : DEFAULT_BACKGROUND;
};
