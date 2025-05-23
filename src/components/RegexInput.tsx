import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RegexInputProps {
  onSubmit: (regex: string) => void;
  error?: string;
}

const RegexInput = ({ onSubmit, error }: RegexInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a regular expression (e.g., a(b|c)*)"
            className="w-full h-10"
            aria-label="Regular expression input"
          />
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          Visualize NFA
        </Button>
      </form>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="bg-blue-50 rounded-md p-4">
        <h3 className="font-medium text-blue-800 mb-2">Input Format Guide</h3>
        <ul className="list-disc pl-5 text-sm text-blue-700">
          <li>Concatenation: <code className="bg-blue-100 px-1 rounded">ab</code> means a followed by b</li>
          <li>Union (OR): <code className="bg-blue-100 px-1 rounded">a|b</code> means a or b</li>
          <li>Kleene Star: <code className="bg-blue-100 px-1 rounded">a*</code> means zero or more of a</li>
          <li>Grouping: <code className="bg-blue-100 px-1 rounded">(ab)</code> groups expressions</li>
        </ul>
      </div>
    </div>
  );
};

export default RegexInput;
