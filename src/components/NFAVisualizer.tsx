import { useEffect, useRef, useState } from "react";
import { 
  ReactFlow, 
  Controls, 
  Background,
  useReactFlow,
  MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NFAStateNode from "./nfa/NFAStateNode";
import EmptyStateDisplay from "./nfa/EmptyStateDisplay";
import NFAInfoPanel from "./nfa/NFAInfoPanel";
import { convertNFAToReactFlow } from "./nfa/NFAConverterUtils";

const NFAVisualizer = ({ nfa }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const reactFlowWrapper = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);

  useEffect(() => {
    if (!nfa) return;

    // Convert NFA to ReactFlow nodes and edges
    const { nodes: nfaNodes, edges: nfaEdges } = convertNFAToReactFlow(nfa);
    console.log("Nodes:", nfaNodes);
    console.log("Edges:", nfaEdges);
    
    setNodes(nfaNodes);
    setEdges(nfaEdges);

    // Reset the viewport when the NFA changes
    if (rfInstance) {
      setTimeout(() => {
        rfInstance.fitView({ padding: 0.2 });
      }, 0);
    }
  }, [nfa, rfInstance]);

  if (!nfa) {
    return <EmptyStateDisplay />;
  }



  const nodeTypes = {
    nfaState: NFAStateNode,
  };

  return (
    <div ref={reactFlowWrapper} style={{ height: "500px" }} className="border border-gray-200 rounded-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={setRfInstance}
        fitView
        attributionPosition="bottom-right"
        defaultEdgeOptions={{
          type: 'default',
          markerEnd: {
            type: MarkerType.Arrow,
            color: '#3b82f6',
            width: 10,
            height: 10,
          },
          style: { 
            stroke: '#3b82f6', 
            strokeWidth: 5
          },
          labelBgStyle: { 
            fill: '#ffffff', 
            fillOpacity: 1,
            borderRadius: 4
          },
          labelBgPadding: [12, 8],
          labelStyle: { 
            fill: '#000000', 
            fontWeight: 'bold',
            fontSize: 16
          },
        }}
      >
        <Background color="#ffffff" gap={16} />
        <Controls />
        <NFAInfoPanel />
      </ReactFlow>
    </div>
  );
};

export default NFAVisualizer;
