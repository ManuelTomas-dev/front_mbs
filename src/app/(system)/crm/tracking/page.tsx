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

export default function Page() {
  type ViewMode = "table" | "cards" | "list";

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [editEntity, setEditEntity] = useState({});
  const [detailsEntity, setDetailsEntity] = useState({});

  const [formOpen, setFormOpen] = useState(false);

  const tableHeads = [
    "Customer Name",
    "Contact Date",
    "Purchase If Any",
    "Customer Type",
    "Date To Complete Future Actions",
    "Actions Completed",
  ];

  return (
    <Container>
      <Title
        title="Tracking"
        description="Manage and view Tracking information in the MBS system."
      />

      <CardContainer>
        <Card title="Registered Tracking" content="1234" />
        <Card title="Archived Tracking" content="10" />
        <Card title="Customers" content="12" />
        <Card title="Customers Types" content="28" />
      </CardContainer>

      <ActionBar>
        <Search
          searchBarPlaceholder="Search trackings..."
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AddAction
          addActionName="New Tracking"
          viewMode={viewMode}
          setViewMode={setViewMode}
          setAddFormOpen={setFormOpen}
          setSelectedEntity={setEditEntity}
        />
      </ActionBar>

      <Table tableHeads={tableHeads}></Table>
    </Container>
  );
}
