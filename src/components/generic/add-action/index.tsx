import React from "react";
import { Button } from "@/components/ui/button";
import { List, Grid3X3, Table, Plus } from "lucide-react";

type ViewMode = "table" | "cards" | "list";

interface AddActionProps {
  addActionName: string;
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  setAddFormOpen: (open: boolean) => void;
  setSelectedEntity: (entity: any) => void;
  children?: React.ReactNode;
}

function AddAction({
  addActionName,
  viewMode,
  setViewMode,
  setAddFormOpen,
  setSelectedEntity,
  children,
}: AddActionProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={() => {
          setSelectedEntity(null);
          setAddFormOpen(true);
        }}
      >
        <Plus className="mr-2 h-4 w-4" />
        {addActionName}
      </Button>

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

export default AddAction;
