
import React from "react";
import { Panel } from "@xyflow/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const NFAInfoPanel = () => {
  return (
    <Panel position="top-left">
      <Alert className="max-w-md shadow-sm">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription className="text-sm text-gray-700">
          Initial states have arrows pointing to them, accepting states 
          have double circles (green ring). Empty (ε) transitions are 
          shown with dashed lines.
        </AlertDescription>
      </Alert>
    </Panel>
  );
};

export default NFAInfoPanel;
