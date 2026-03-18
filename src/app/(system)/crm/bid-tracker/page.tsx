"use client";
import Container from "@/components/generic/container";
import Title from "@/components/generic/title";
import CardContainer from "@/components/generic/card-container";
import Card from "@/components/generic/card";
import ActionBar from "@/components/generic/action-bar";
import Table from "@/components/generic/table";
import Search from "@/components/generic/search";
import { useState } from "react";
import AddAction from "@/components/generic/add-action";
import DialogForm from "@/components/module/crm/bid-tracker/dialog-form";
import DeleteDialog from "@/components/generic/delete-dialog";

export default function Page() {
  type ViewMode = "table" | "cards" | "list";

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedEntity, setSelectedEntity] = useState({});
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [formOpen, setFormOpen] = useState(false);

  const tableHeads = [
    "Customer Name",
    "BID Reference",
    "Date Received",
    "Product Line",
    "Due Date",
    "Days Left",
  ];

  return (
    <Container>
      <Title
        title="BID Tracker"
        description="Manage and view BID tracker information in the MBS system."
      />

      <CardContainer>
        <Card title="Registered BID trackers" content="1234" />
        <Card title="Archived BID Trackers" content="10" />
        <Card title="Expired BID Trackers" content="12" />
        <Card title="Product Lines" content="28" />
      </CardContainer>

      <ActionBar>
        <Search
          searchBarPlaceholder="Search BID trackers..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AddAction
          addActionName="New BID Tracker"
          viewMode={viewMode}
          setViewMode={setViewMode}
          setAddFormOpen={setFormOpen}
          setSelectedEntity={setSelectedEntity}
        />
      </ActionBar>

      <Table
        tableHeads={tableHeads}
        // data = pass data coming from the database here
        setSelectedItem={setSelectedEntity}
        setDeleteDialog={setDeleteDialog}
      ></Table>

      <DialogForm
        open={formOpen}
        setOpen={setFormOpen}
        selectedEntity={selectedEntity}
      />

      <DeleteDialog
        selectedEntity={selectedEntity}
        open={deleteDialog}
        setOpen={setDeleteDialog}
        prompt="Are you sure that you want to delete this BID Tracker?"
        // operationDefinition={} Passar funcao que efectua o delete
        // isLoading={} Passar boolean que carrega o loading da funcao
      />
    </Container>
  );
}
