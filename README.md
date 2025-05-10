# Regex to NFA/DFA Visualizer

## Team Members
- Caesar Isidro Va-ay
- Andre Milan Arañas
- John Lester Escarlan
- Francis Rey Betonio

## Introduction/Rationale

Deterministic and Nondeterministic Finite Automata (DFA/NFA) are foundational concepts in automata theory and formal language processing. However, visualizing their states, transitions, and behavior can be challenging for learners. Regular expressions (regex) are widely used in text processing, yet their direct relationship with automata is often abstract. This project aims to bridge this gap by developing a web-based DFA/NFA simulator that:
- Converts user-provided regex into a corresponding NFA/DFA
- Allows users to input test strings to check acceptance
- Visualizes the automaton's structure and simulation process

This tool will serve as an educational resource to help students and developers intuitively understand automata-regex equivalence and string acceptance mechanics.

## Description

The web app provides the following features:

### Core Functionality
- **Regex to Automaton Conversion**: Accepts a regex input (e.g., (a|b)*c), generates an equivalent NFA, and optionally converts it to a DFA via subset construction
- **String Acceptance Simulation**: Lets users input a string (e.g., "aaabc") and simulates its traversal through the automaton
- **Visualization**: Renders the automaton's states and transitions graphically

### Interactive Features
- Step-by-step simulation with transition highlighting
- Toggle between NFA and DFA representations
- Display regex parse trees and automaton metadata (e.g., number of states)

## Implementation

### Frontend
- Built with React/Tailwind CSS/JavaScript for accessibility and interactivity
- Leverages vis.js or D3.js for automaton visualization (nodes, edges, labels)

### Core Algorithms
- **Regex-to-Automaton Conversion**: Implements Thompson's algorithm for regex-to-NFA conversion
- **NFA-to-DFA Conversion**: Applies subset construction for NFA-to-DFA conversion

## How to Use

### Input Regex
1. Enter a regex (e.g., a(b|c)*) in the text box
2. Click "Build Automaton"

### Visualize Automaton
- The generated NFA/DFA will display as an interactive graph
- Use dropdowns to switch between NFA/DFA views

### Test a String
1. Type a string (e.g., "abbb") into the "Test String" field
2. Click "Simulate"

### Simulation Results
- The app will highlight the path taken by the string (if accepted) or show rejection
- Use the "Step" button to animate the traversal process

### Reset/Clear
- Click "Reset" to modify the regex or test a new string

## Technologies Used

This project is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- vis.js/D3.js (for visualization)

