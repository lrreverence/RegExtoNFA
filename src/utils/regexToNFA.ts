
/**
 * Thompson's Construction Algorithm for converting regular expressions to NFAs
 */

// Interface for NFA
interface NFA {
  states: number[];
  alphabet: string[];
  transitions: Record<number, Record<string, number[]>>;
  initialState: number;
  acceptingStates: number[];
}

// Counter for generating unique state IDs
let stateCounter = 0;

/**
 * Create a new state with a unique ID
 */
function createState(): number {
  return stateCounter++;
}

/**
 * Reset the state counter (useful for testing)
 */
function resetStateCounter(): void {
  stateCounter = 0;
}

/**
 * Build an NFA from a regular expression
 * @param regex The regular expression string
 * @returns An NFA that recognizes the language defined by the regex
 */
export function buildNFA(regex: string): NFA {
  resetStateCounter();
  
  // Parse and build the NFA
  const nfa = parseExpression(regex);
  
  // Collect all symbols used in the NFA
  const alphabet = collectAlphabet(nfa);
  
  return {
    ...nfa,
    alphabet
  };
}

/**
 * Parse a regular expression and build an NFA
 */
function parseExpression(regex: string): NFA {
  if (regex.length === 0) {
    return createEmptyNFA();
  }

  let pos = 0;
  let nfa = parseAlternation();

  // Check if we've consumed the entire expression
  if (pos < regex.length) {
    throw new Error(`Unexpected character at position ${pos}: ${regex[pos]}`);
  }

  return nfa;

  /**
   * Parse alternation (e.g., a|b)
   */
  function parseAlternation(): NFA {
    let nfa = parseConcatenation();

    while (pos < regex.length && regex[pos] === '|') {
      pos++; // Consume '|'
      const rightNfa = parseConcatenation();
      nfa = createUnionNFA(nfa, rightNfa);
    }

    return nfa;
  }

  /**
   * Parse concatenation (e.g., ab)
   */
  function parseConcatenation(): NFA {
    let nfa = parseRepetition();

    while (pos < regex.length && 
           regex[pos] !== ')' && 
           regex[pos] !== '|') {
      const rightNfa = parseRepetition();
      nfa = createConcatNFA(nfa, rightNfa);
    }

    return nfa;
  }

  /**
   * Parse repetition operators (*, +, ?)
   */
  function parseRepetition(): NFA {
    let nfa = parseTerm();

    while (pos < regex.length) {
      if (regex[pos] === '*') {
        pos++; // Consume '*'
        nfa = createKleeneStarNFA(nfa);
      } else if (regex[pos] === '+') {
        pos++; // Consume '+'
        nfa = createPlusNFA(nfa);
      } else if (regex[pos] === '?') {
        pos++; // Consume '?'
        nfa = createOptionalNFA(nfa);
      } else {
        break;
      }
    }

    return nfa;
  }

  /**
   * Parse a basic term (character or group)
   */
  function parseTerm(): NFA {
    if (pos >= regex.length) {
      throw new Error("Unexpected end of regular expression");
    }

    const char = regex[pos];

    if (char === '(') {
      pos++; // Consume '('
      const nfa = parseAlternation();
      
      if (pos >= regex.length || regex[pos] !== ')') {
        throw new Error("Missing closing parenthesis");
      }
      
      pos++; // Consume ')'
      return nfa;
    } else if (char === '|' || char === ')' || char === '*' || char === '+' || char === '?') {
      throw new Error(`Unexpected operator at position ${pos}: ${char}`);
    } else {
      pos++; // Consume the character
      return createBasicNFA(char);
    }
  }
}

/**
 * Create a basic NFA for a single character
 */
function createBasicNFA(symbol: string): NFA {
  const startState = createState();
  const acceptState = createState();
  
  const transitions: Record<number, Record<string, number[]>> = {};
  transitions[startState] = { [symbol]: [acceptState] };
  
  return {
    states: [startState, acceptState],
    alphabet: [symbol],
    transitions,
    initialState: startState,
    acceptingStates: [acceptState]
  };
}

/**
 * Create an empty NFA (accepts empty string)
 */
function createEmptyNFA(): NFA {
  const state = createState();
  
  return {
    states: [state],
    alphabet: [],
    transitions: {},
    initialState: state,
    acceptingStates: [state]
  };
}

/**
 * Create a union NFA (a|b)
 */
function createUnionNFA(nfa1: NFA, nfa2: NFA): NFA {
  const startState = createState();
  const acceptState = createState();
  
  // Copy transitions from both NFAs
  const transitions: Record<number, Record<string, number[]>> = {};
  
  // Copy transitions from nfa1
  Object.keys(nfa1.transitions).forEach(state => {
    transitions[parseInt(state)] = { ...nfa1.transitions[parseInt(state)] };
  });
  
  // Copy transitions from nfa2
  Object.keys(nfa2.transitions).forEach(state => {
    transitions[parseInt(state)] = { ...nfa2.transitions[parseInt(state)] };
  });
  
  // Add epsilon transitions from new start state
  transitions[startState] = { 'ε': [nfa1.initialState, nfa2.initialState] };
  
  // Add epsilon transitions to new accept state
  nfa1.acceptingStates.forEach(state => {
    if (!transitions[state]) transitions[state] = {};
    if (!transitions[state]['ε']) transitions[state]['ε'] = [];
    transitions[state]['ε'].push(acceptState);
  });
  
  nfa2.acceptingStates.forEach(state => {
    if (!transitions[state]) transitions[state] = {};
    if (!transitions[state]['ε']) transitions[state]['ε'] = [];
    transitions[state]['ε'].push(acceptState);
  });
  
  return {
    states: [...nfa1.states, ...nfa2.states, startState, acceptState],
    alphabet: [...new Set([...nfa1.alphabet, ...nfa2.alphabet])],
    transitions,
    initialState: startState,
    acceptingStates: [acceptState]
  };
}

/**
 * Create a concatenation NFA (ab)
 */
function createConcatNFA(nfa1: NFA, nfa2: NFA): NFA {
  // Copy transitions from both NFAs
  const transitions: Record<number, Record<string, number[]>> = {};
  
  // Copy transitions from nfa1
  Object.keys(nfa1.transitions).forEach(state => {
    transitions[parseInt(state)] = { ...nfa1.transitions[parseInt(state)] };
  });
  
  // Copy transitions from nfa2
  Object.keys(nfa2.transitions).forEach(state => {
    transitions[parseInt(state)] = { ...nfa2.transitions[parseInt(state)] };
  });
  
  // Add epsilon transitions from nfa1's accepting states to nfa2's start state
  nfa1.acceptingStates.forEach(state => {
    if (!transitions[state]) transitions[state] = {};
    if (!transitions[state]['ε']) transitions[state]['ε'] = [];
    transitions[state]['ε'].push(nfa2.initialState);
  });
  
  return {
    states: [...nfa1.states, ...nfa2.states],
    alphabet: [...new Set([...nfa1.alphabet, ...nfa2.alphabet])],
    transitions,
    initialState: nfa1.initialState,
    acceptingStates: nfa2.acceptingStates
  };
}

/**
 * Create a Kleene Star NFA (a*)
 */
function createKleeneStarNFA(nfa: NFA): NFA {
  const startState = createState();
  const acceptState = createState();
  
  // Copy existing transitions
  const transitions: Record<number, Record<string, number[]>> = {};
  Object.keys(nfa.transitions).forEach(state => {
    transitions[parseInt(state)] = { ...nfa.transitions[parseInt(state)] };
  });
  
  // Add new transitions
  transitions[startState] = { 'ε': [nfa.initialState, acceptState] };
  
  // Add epsilon transitions from nfa's accepting states to nfa's start state (for *)
  // and to the new accept state
  nfa.acceptingStates.forEach(state => {
    if (!transitions[state]) transitions[state] = {};
    if (!transitions[state]['ε']) transitions[state]['ε'] = [];
    transitions[state]['ε'].push(nfa.initialState);
    transitions[state]['ε'].push(acceptState);
  });
  
  return {
    states: [...nfa.states, startState, acceptState],
    alphabet: nfa.alphabet,
    transitions,
    initialState: startState,
    acceptingStates: [acceptState]
  };
}

/**
 * Create a Plus NFA (a+)
 */
function createPlusNFA(nfa: NFA): NFA {
  // a+ is equivalent to a·a*
  const starNfa = createKleeneStarNFA(nfa);
  
  // Create a copy of the original NFA for concatenation
  const nfaCopy = {
    states: [...nfa.states],
    alphabet: [...nfa.alphabet],
    transitions: JSON.parse(JSON.stringify(nfa.transitions)),
    initialState: nfa.initialState,
    acceptingStates: [...nfa.acceptingStates]
  };
  
  return createConcatNFA(nfaCopy, starNfa);
}

/**
 * Create an Optional NFA (a?)
 */
function createOptionalNFA(nfa: NFA): NFA {
  const emptyNFA = createEmptyNFA();
  return createUnionNFA(nfa, emptyNFA);
}

/**
 * Collect all symbols used in the NFA
 */
function collectAlphabet(nfa: NFA): string[] {
  const alphabet = new Set<string>();
  
  Object.values(nfa.transitions).forEach(transition => {
    Object.keys(transition).forEach(symbol => {
      if (symbol !== 'ε') alphabet.add(symbol);
    });
  });
  
  return [...alphabet];
}
