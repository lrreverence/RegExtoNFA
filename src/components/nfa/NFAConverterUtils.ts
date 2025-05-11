
import { MarkerType } from "@xyflow/react";
import { format } from "node:path/win32";
import '@xyflow/react/dist/style.css';

interface NFA {
  states: number[];
  alphabet: string[];
  transitions: Record<number, Record<string, number[]>>;
  initialState: number;
  acceptingStates: number[];
}

export interface FlowNode {
  id: string;
  type: string;
  data: any;
  position: { x: number; y: number };
  style?: Record<string, any>;
  sourcePosition?: string;
  targetPosition?: string;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: string;
  animated?: boolean;
  labelStyle?: Record<string, any>;
  style?: Record<string, any>;
  markerEnd?: any;
  labelBgStyle?: Record<string, any>;
  labelBgPadding?: number[];
}

// Helper function to create a more symmetrical layout for NFA visualization
export const calculateOptimizedNodePositions = (nfa: NFA) => {
  const positions = {};
  const horizontalSpacing = 150; // Distance between nodes horizontally
  const verticalSpacing = 100;   // Distance between branches vertically
  const startX = 150;
  const startY = 150;
  
  // Special case for a+b pattern which needs specific positioning
  if (nfa.states.length === 6 && nfa.alphabet.includes('a') && nfa.alphabet.includes('b')) {
    // Check if this looks like the Thompson construction for a+b
    const hasEpsilonTransitions = Object.values(nfa.transitions).some(
      transit => transit['ε'] !== undefined
    );
    
    if (hasEpsilonTransitions) {
      // This is likely a standard a+b NFA with Thompson's construction
      // Layout:
      //   q0 -> q1 -> q3 -> q4 -> q5
      //          |              ↗
      //          v     
      //          q2 -------------
      
      // Assuming states are numbered sequentially
      positions[0] = { x: startX, y: startY }; // q0
      positions[1] = { x: startX + horizontalSpacing, y: startY }; // q1
      positions[2] = { x: startX + horizontalSpacing, y: startY + verticalSpacing }; // q2
      positions[3] = { x: startX + 2 * horizontalSpacing, y: startY }; // q3
      positions[4] = { x: startX + 3 * horizontalSpacing, y: startY }; // q4
      positions[5] = { x: startX + 4 * horizontalSpacing, y: startY }; // q5
      
      return positions;
    }
  }
  
  // Default layout algorithm for other cases
  // First, identify any "branches" in the NFA
  const branches = [];
  let currentStates = [nfa.initialState];
  let visited = new Set(currentStates);
  let depth = 0;
  
  // Breadth-first traversal to find branches
  while (currentStates.length > 0) {
    const nextLevel = [];
    const branchLevel = [];
    
    for (const state of currentStates) {
      branchLevel.push(state);
      
      // Find all next states from this state
      const transitions = nfa.transitions[state] || {};
      for (const symbol in transitions) {
        for (const nextState of transitions[symbol]) {
          if (!visited.has(nextState)) {
            nextLevel.push(nextState);
            visited.add(nextState);
          }
        }
      }
    }
    
    branches.push(branchLevel);
    currentStates = nextLevel;
    depth++;
    
    // Break if we have a cycle or are too deep
    if (depth > 10 || nextLevel.length === 0) break;
  }
  
  // Place the initial state
  positions[nfa.initialState] = { x: startX, y: startY };
  
  // Place branches in a symmetrical way
  for (let level = 1; level < branches.length; level++) {
    const branchStates = branches[level];
    
    // For a+b type pattern, arrange in parallel branches
    if (level === 1 && branchStates.length >= 2) {
      // Upper branch
      positions[branchStates[0]] = { x: startX + horizontalSpacing, y: startY };
      
      // Lower branch (if exists)
      if (branchStates.length > 1) {
        positions[branchStates[1]] = { x: startX + horizontalSpacing, y: startY + verticalSpacing };
      }
    } 
    // Continue laying out branches
    else {
      branchStates.forEach((state, i) => {
        const parentX = startX + level * horizontalSpacing;
        let parentY = startY;
        
        // Check if this state has a predecessor we can align with
        for (const prevState of branches[level-1]) {
          const transitions = nfa.transitions[prevState] || {};
          for (const symbol in transitions) {
            if (transitions[symbol].includes(state)) {
              parentY = positions[prevState].y;
              break;
            }
          }
        }
        
        positions[state] = { x: parentX, y: parentY };
      });
    }
  }
  
  // If there's an end state that multiple paths converge to, place it at the end
  if (nfa.acceptingStates.length === 1) {
    const acceptingState = nfa.acceptingStates[0];
    
    // Check if multiple paths lead to the accepting state
    let incomingCount = 0;
    for (const fromState in nfa.transitions) {
      for (const symbol in nfa.transitions[fromState]) {
        if (nfa.transitions[fromState][symbol].includes(acceptingState)) {
          incomingCount++;
        }
      }
    }
    
    if (incomingCount > 1 || !positions[acceptingState]) {
      // Place accepting state at the rightmost position
      const maxLevel = branches.length;
      positions[acceptingState] = { 
        x: startX + maxLevel * horizontalSpacing, 
        y: startY 
      };
    }
  }
  
  return positions;
};

// Convert NFA to ReactFlow nodes and edges
export const convertNFAToReactFlow = (nfa: NFA | null) => {
  if (!nfa) return { nodes: [], edges: [] };
  
  // Create an optimized layout for the NFA
  const nodePositions = calculateOptimizedNodePositions(nfa);
  
  // Create nodes
  const nodes: FlowNode[] = nfa.states.map((state) => {
    const isInitial = nfa.initialState === state;
    const isAccepting = nfa.acceptingStates.includes(state);
    const position = nodePositions[state] || { x: 0, y: 0 };
    
    return {
      id: state.toString(),
      type: "nfaState",
      data: { 
        label: `q${state}`,
        isInitial,
        isAccepting
      },
      position: position,
      sourcePosition: 'right',
      targetPosition: 'left',
    };
  });

  // Add initial state indicator (arrow pointing to the initial state)
  if (nfa.states.length > 0) {
    const initialPos = nodePositions[nfa.initialState] || { x: 100, y: 150 };
    nodes.push({
      id: "initial-indicator",
      type: "input",
      data: { label: "" },
      position: { 
        x: initialPos.x - 80, 
        y: initialPos.y 
      },
      style: {
        width: 1,
        height: 1,
        border: "none",
        background: "transparent",
      },
      sourcePosition: 'right',
    });
  }

  // Create edges from transitions
  const edges: FlowEdge[] = [];
  
  // Add initial edge
  if (nfa.states.length > 0) {
    edges.push({
      id: 'initial-edge',
      source: 'initial-indicator',
      target: nfa.initialState.toString(),
      label: 'start',
      type: 'default',
      style: { stroke: '#3b82f6', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.Arrow,
        color: '#3b82f6',
        width: 20,
        height: 20,
      },
    });
  }
  
  // Process transitions
  Object.entries(nfa.transitions).forEach(([fromState, transitions]) => {
    Object.entries(transitions).forEach(([symbol, toStates]) => {
      toStates.forEach((toState) => {
        const id = `e${fromState}-${symbol}-${toState}`;
        const symbolLabel = symbol === "ε" ? "ε" : symbol;
        const isEpsilon = symbol === "ε";
        
        edges.push({
          id,
          source: fromState.toString(),
          target: toState.toString(),
          label: symbolLabel,
          type: "default",
          animated: isEpsilon,
          labelStyle: {
            fontSize: '16px',
            fontWeight: 'bold',
            fill: '#000000', // Black text for better visibility
          },
          style: {
            stroke: isEpsilon ? '#6b7280' : '#3b82f6',
            strokeWidth: 3, // Much thicker lines for better visibility
            strokeDasharray: isEpsilon ? '5,5' : 'none',
          },
          markerEnd: {
            type: MarkerType.Arrow,
            color: isEpsilon ? '#6b7280' : '#3b82f6',
            width: 20,
            height: 20,
          },
          labelBgStyle: {
            fill: 'white',
            fillOpacity: 1, // Full opacity for label background
            rx: 4,
            ry: 4,
          },
          labelBgPadding: [12, 8], // Significantly increased padding for better visibility
        });
      });
    });
  });
  
  return { nodes, edges };
};
