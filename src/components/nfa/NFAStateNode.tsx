
import React from "react";
import { Handle, Position } from '@xyflow/react'
interface NFAStateNodeProps {
  data: {
    label: string;
    isInitial: boolean;
    isAccepting: boolean;
  };
}

const NFAStateNode = ({ data }: NFAStateNodeProps) => {
  const { label, isInitial, isAccepting } = data;
  
  return (
    <div className={`
      flex items-center justify-center text-center
      rounded-full w-16 h-16 bg-white
      border-2 border-green-600
      ${isAccepting ? "ring-4 ring-green-600 ring-offset-2" : ""}
    `}>
      {/* Target Handle - left side */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        style={{ background: '#555'}}
      />
      <div className="text-lg font-bold text-black">{label}</div>

      {/* Source Handle - right side */}
      <Handle 
        type="source"
        position={Position.Right}
        id="source"
        style={{ background: '#555'}}
      />
    </div>
  );
};

export default NFAStateNode;
