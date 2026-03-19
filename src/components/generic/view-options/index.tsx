import React from "react";
import { Button } from "@/components/ui/button";
import { Table, Grid3X3, List } from "lucide-react";

type ViewMode = "table" | "cards" | "list";

interface ViewOptionsProps {
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  children?: React.ReactNode;
}

function ViewOptions({ viewMode, setViewMode, children }: ViewOptionsProps) {
  return (
    <div className="flex items-center space-x-2">
      {children}
      <Button
        variant={viewMode === "table" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("table")}
      >
        <Table className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "cards" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("cards")}
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("list")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default ViewOptions;
