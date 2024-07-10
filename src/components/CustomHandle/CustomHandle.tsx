/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { getConnectedEdges, Handle, useNodeId, useStore } from "reactflow";

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const CustomHandle = (props) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();
  const handleId = props.id;

  const isHandleConnectable = useMemo(() => {
    const node = nodeInternals.get(nodeId);
    const connectedEdges = getConnectedEdges([node], edges);
    switch (handleId) {
      case "INPUT": {
        // Handle INPUT có thể nhận nhiều connection
        return true;
        // const handleConnections = connectedEdges.filter(
        //   (edge) => edge.target === nodeId
        // ).length;
        // return handleConnections < 2; 
      }
      case "PASSED":
      case "FAILED": {
        const handleConnections = connectedEdges.filter(
          (edge) => edge.source === nodeId && edge.sourceHandle === handleId
        ).length;
        return handleConnections === 0; // Handle PASSED || FAILED chỉ được nối 1 connection
      }
      default: {
        break;
      }
    }
    // console.log({
    //   node,
    //   connectedEdges,
    //   nodeId,
    //   handleId,
    // });
  }, [nodeInternals, edges, nodeId, handleId]);

  return <Handle {...props} isConnectable={isHandleConnectable}></Handle>;
};

export default CustomHandle;
