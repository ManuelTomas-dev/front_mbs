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

export default function Page() {
  type ViewMode = "table" | "cards" | "list";

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editEntity, setEditEntity] = useState({});
  const [detailsEntity, setDetailsEntity] = useState({});

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
          setSelectedEntity={setEditEntity}
        />
      </ActionBar>

      <Table tableHeads={tableHeads}></Table>

      <DialogForm open={formOpen} setOpen={setFormOpen} />
    </Container>
  );
}
