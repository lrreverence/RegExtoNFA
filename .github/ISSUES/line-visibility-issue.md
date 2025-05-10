---
name: Line Visibility Issue in NFA Visualization
about: Report an issue with line visibility in the NFA visualization
title: "Fix: Lines not showing properly in NFA visualization"
labels: bug, visualization
assignees: ''
---

## Description
The lines (edges) in the NFA visualization are not displaying properly. This affects the visual representation of state transitions in the NFA graph.

## Current Behavior
- Lines connecting NFA states are not visible or not rendering correctly
- This impacts the ability to understand state transitions in the visualization

## Expected Behavior
- All transition lines should be clearly visible
- Lines should be properly styled with the defined properties (stroke width, color, etc.)
- Arrow markers should be visible at the end of each line

## Technical Details
The issue appears to be related to the edge styling in `NFAConverterUtils.ts`. The current implementation includes:
- Stroke width of 5
- Green color (#22c55e) for regular transitions
- Gray color (#6b7280) for epsilon transitions
- Arrow markers with width and height of 20

## Steps to Reproduce
1. Convert a regular expression to NFA
2. View the NFA visualization
3. Observe that the connecting lines between states are not visible

## Environment
- Browser: [Please specify]
- Operating System: [Please specify]
- Version: [Please specify]

## Additional Context
This issue affects the core functionality of visualizing NFAs and understanding state transitions. A fix is needed to ensure proper visualization of the NFA structure.

## Possible Solutions
1. Verify the edge styling properties are being properly applied
2. Check if there are any CSS conflicts affecting the line visibility
3. Ensure the ReactFlow edge rendering is working as expected
4. Consider adjusting the stroke width or color for better visibility

## Screenshots
[Please attach screenshots if available] 