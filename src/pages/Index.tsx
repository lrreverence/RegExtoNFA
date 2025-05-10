
import { useState } from "react";
import RegexInput from "../components/RegexInput";
import NFAVisualizer from "../components/NFAVisualizer";
import { buildNFA } from "../utils/regexToNFA";
import { toast } from "../components/ui/use-toast";

const Index = () => {
  const [regex, setRegex] = useState("");
  const [nfa, setNFA] = useState(null);
  const [error, setError] = useState("");

  const handleRegexSubmit = (inputRegex) => {
    try {
      setError("");
      const newNFA = buildNFA(inputRegex);
      setNFA(newNFA);
      setRegex(inputRegex);
      toast({
        title: "NFA Generated",
        description: `Successfully converted regex: ${inputRegex}`,
      });
    } catch (err) {
      console.error("Error converting regex to NFA:", err);
      setError(err.message || "Invalid regular expression");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to convert regex. Please check your input.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Regex to NFA Visualizer</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter a regular expression to see its Non-deterministic Finite Automaton representation with epsilon transitions
          </p>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <RegexInput onSubmit={handleRegexSubmit} error={error} />
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            NFA Visualization
            {regex && <span className="text-sm font-normal text-gray-600 ml-2">for: {regex}</span>}
          </h2>
          <NFAVisualizer nfa={nfa} />
        </div>
        
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h2>
          <div className="prose max-w-none">
            <p>
              This tool converts regular expressions into Non-deterministic Finite Automata with epsilon transitions (NFA) using Thompson's construction algorithm.
            </p>
            <h3>Supported Regex Operations:</h3>
            <ul>
              <li><strong>Concatenation:</strong> <code className="bg-blue-100 px-1 rounded">ab</code> means a followed by b</li>
              <li><strong>Union (OR):</strong> <code className="bg-blue-100 px-1 rounded">a|b</code> means a or b</li>
              <li><strong>Kleene Star:</strong> <code className="bg-blue-100 px-1 rounded">a*</code> means zero or more of a</li>
              <li><strong>Grouping:</strong> <code className="bg-blue-100 px-1 rounded">(ab)</code> groups expressions</li>
            </ul>
            <p>
              Enter a regex above to see it visualized as an NFA graph.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-white mt-12 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          Regex to NFA Visualizer &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
