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

## Project info

**URL**: https://lovable.dev/projects/324c9046-11c0-4e2f-88cb-3b82f02e3ca6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/324c9046-11c0-4e2f-88cb-3b82f02e3ca6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/324c9046-11c0-4e2f-88cb-3b82f02e3ca6) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
