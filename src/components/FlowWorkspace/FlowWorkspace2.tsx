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
  MiniMap,
  Node,
  NodeMouseHandler,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import { RootState } from "../../store";
import {
  endAddingNode,
  endSavingFlow,
} from "../../features/flow-controls/flow-controls.slice";
import "./index.css";

const initialNodes: Node[] = JSON.parse(localStorage.getItem("nodes") || "[]");

// const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];
const initialEdges: Edge[] = JSON.parse(localStorage.getItem("edges") || "[]");

const getMaxId = (nodes: Node[]) => {
  return nodes.reduce((maxId, node) => {
    const id = parseInt(node.id, 0);
    return id > maxId ? id : maxId;
  }, 0);
};

const FlowWorkspace2 = () => {
  const { isAddingNode, isSavingFlow } = useSelector(
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
    (params: any) => setEdges((eds) => addEdge(params, eds)),
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
    if (isAddingNode) {
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
    if (isAddingNode) {
      const { clientX, clientY } = event;
      const nodeWidth = newNodeRef.current
        ? (newNodeRef.current as any).offsetWidth
        : 0;
      const nodeHeight = newNodeRef.current
        ? (newNodeRef.current as any).offsetHeight
        : 0;
      const newX = clientX - nodeWidth / 2;
      const newY = clientY - nodeHeight / 2;

      const newId = getMaxId(nodes) + 1;
      const newNode = {
        id: `${newId}`,
        data: { label: `Node ${newId}` },
        position: screenToFlowPosition({ x: newX, y: newY }),
      };
      setNodes((els) => [...els, newNode]);
      dispatch(endAddingNode());
    }
  };

  useEffect(() => {
    if (!flowWrapper.current) return;
    if (isAddingNode) {
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
    };
  }, [isAddingNode]);

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

  const nodeColor = (node: any) => {
    switch (node.type) {
      case "input":
        return "#6ede87";
      case "output":
        return "#6865A5";
      default:
        return "#ff0072";
    }
  };

  const onNodeDoubleClick: NodeMouseHandler = (event, node) => {
    console.log("onNodeDoubleClick", node);
  };

  return (
    <div className="w-full h-full border" ref={flowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onMouseDown={handleMouseDown}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
      >
        <Controls />
        <MiniMap zoomable pannable nodeColor={nodeColor} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      {isAddingNode && (
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
