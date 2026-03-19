"use client";
import Container from "@/components/generic/container";
import Title from "@/components/generic/title";
import ActionBar from "@/components/generic/action-bar";
import Table from "@/components/generic/table";
import Search from "@/components/generic/search";
import { useState } from "react";
import ViewOptions from "@/components/generic/view-options";
import DialogForm from "@/components/module/contract/dialog-form";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SaveDraftSection from "@/components/module/procurement/requests/save-draft-section";

export default function Page() {
  type ViewMode = "table" | "cards" | "list";

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editEntity, setEditEntity] = useState({});
  const [detailsEntity, setDetailsEntity] = useState({});

  const [formOpen, setFormOpen] = useState(false);

  const tableHeads = [
    "RF",
    "Request",
    "Description",
    "Supplier",
    "Total Amount",
    "Requested",
  ];

  return (
    <Container>
      <Title
        title="Requests Approval"
        description="Manage and view requests approval in the MBS system."
      />

      <ActionBar>
        <Search
          searchBarPlaceholder="Search requests approvals..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <ViewOptions viewMode={viewMode} setViewMode={setViewMode}>
          <Button type="button">
            CSV Export <Download />
          </Button>
        </ViewOptions>
      </ActionBar>

      <Table tableHeads={tableHeads}></Table>

      <DialogForm open={formOpen} setOpen={setFormOpen} />
      <SaveDraftSection status="Pending" count={0} />
    </Container>
  );
}
